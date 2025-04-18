// Import your Sequelize connection object (from config.js or sequelize.js)
import connection_object from "./config.js";

// Define an async function to test the database connection
const testConnection = async () => {
  try {
    // ✅ Print current DB user to confirm environment variable is working
    console.log("DB_USER:", process.env.DB_USER);

    // 🔍 Run a basic query to check if connection is live
    const result = await connection_object.query('SELECT NOW();');

    // ✅ Success message if query runs
    console.log('Connected to database');
  } catch (error) {
    // ❌ Catch and display connection errors
    console.error('Database connection error:', error);
  } finally {
    // 🔚 Cleanly close the connection (important in scripts)
    connection_object.end();
  }
};

// Invoke the connection test
testConnection();
