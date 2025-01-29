const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const bcrypt = require('bcrypt');
// important 
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// dbConfig
const dbConfig = {
  user: 'serveradminlogindb',          
  password: '7Q3pDU4qT@c',
  server: 'dbserverrg.database.windows.net',
  database: 'SmartInventoryDB',
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

//  get to our page and also path for it 
app.get('/logIn', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/my-react-app/build', 'index.html'));
});
//to get default build 
app.use(express.static(path.join(__dirname, '../front-end/my-react-app/build')));



//  POST /api/login route
app.post('/logIn', async (req, res) => {
  const { email, password } = req.body;

  try {
    let pool = await sql.connect(dbConfig);

    let result = await pool.request()
      .input('emailParam', sql.VarChar, email)
      .query(`
        SELECT TOP 1 *
        FROM Users
        WHERE email = @emailParam
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }


    let user = result.recordset[0];
    let hashedPassword = user.PasswordHash;

    // Compare plain-text password with the stored hash
    let passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    return res.json({ success: true, message: 'Login successful!' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

/////// timestamp Data api route
app.get('/api/timestamp-stats', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT TOP 100 eventProcessedUtcTime
      FROM [dbo].[InventoryTelemetry]
      ORDER BY eventProcessedUtcTime DESC
    `);

    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error fetching timestamp stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
});
/////// distance aapi route
app.get('/api/distance-stats', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT eventProcessedUtcTime, distance
      FROM [dbo].[InventoryTelemetry]
      ORDER BY eventProcessedUtcTime DESC
    `);

    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error fetching distance stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
});
/////// weight api route
app.get('/api/weight-stats', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT eventProcessedUtcTime, weight
      FROM [dbo].[InventoryTelemetry]
      ORDER BY eventProcessedUtcTime DESC
    `);

    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error fetching weight stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
});
/////// humidity api route
app.get('/api/humidity-stats', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT eventProcessedUtcTime, humidity
      FROM [dbo].[InventoryTelemetry]
      ORDER BY eventProcessedUtcTime DESC
    `);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error fetching humidity stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
});

/////// temp  api route
app.get('/api/temperature-stats', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT TOP 100 temperature, eventProcessedUtcTime 
      FROM InventoryTelemetry 
      ORDER BY eventProcessedUtcTime DESC
    `);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error fetching temperature stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
});



//////////////////////////////////////////////////////////////////////////////////////////////////
const plainTextPassword = 'password';

// saultrounds, better to set to basic (10)
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);// Generate a salt
   
    const hashedPassword = await bcrypt.hash(password, salt); // Hashed password with our salt (10)
    console.log('            for debug purposes               ');
    console.log('Original Password:', password);
    console.log('Salt:', salt);
    console.log('Hashed Password:', hashedPassword);

    return hashedPassword; // Return the hashed password
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
};
hashPassword(plainTextPassword); // Call the function
//////////////////////////////////////////////////////////////////////////////////////////////////

// start of the server 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
