// Import Sequelize (ORM) and dotenv to handle environment variables
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance configured for PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_DATABASE,   // Database name
  process.env.DB_USER,       // Username
  process.env.DB_PASSWORD,   // Password
  {
    host: process.env.DB_HOST,           // Hostname (e.g., AWS RDS, Azure)
    port: process.env.DB_PORT || 5432,   // Default to PostgreSQL port
    dialect: 'postgres',                 // Specify the database dialect

    // SSL configuration for secure remote DB access
    dialectOptions: {
      ssl: {
        require: true,                  // Enforce SSL
        rejectUnauthorized: false       // Allow self-signed certificates
      }
    },

    logging: false, // Disable SQL logging for cleaner console output
  }
);

// Export the Sequelize instance for use in models and app setup
export default sequelize;
