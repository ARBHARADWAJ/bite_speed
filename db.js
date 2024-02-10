const { Pool } = require("pg");
require("dotenv").config();
const url = process.env.PORT_URL;

const pool = new Pool({
  connectionString: url,
});

// const connect = async () => {
//   try {
//     const client = await pool.connect();
//     console.log("Connection established");
//     // You can use the 'client' here for executing queries
//   } catch (error) {
//     console.error("Error establishing connection:", error.message);
//   }
// };

const connect = async () => {
  try {
    const client = await pool.connect();

    // Check if the "contacts" table exists, create it if not
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact (
        id SERIAL PRIMARY KEY,
        phoneNumber VARCHAR(255),
        email VARCHAR(255),
        linkedId INT,
        linkPrecedence VARCHAR(10) CHECK (linkPrecedence IN ('secondary', 'primary')),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP
      );
    `);

    console.log("Connection established");

    // You can use the 'client' here for executing queries
  } catch (error) {
    console.error("Error establishing connection:", error.message);
  }
};

function end() {
  pool.end((err) => {
    if (err) {
      console.error("Error ending the connection pool:", err.message);
    } else {
      console.log("Connection pool closed");
    }
  });
}

module.exports = { pool, connect, end };
