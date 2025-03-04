import sequelize from "../config/config.js";

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection to PostgreSQL has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1); 
    }
};

export const closeDB = async () => {
    try {
        await sequelize.close();
        console.log('✅ Connection to the database closed.');
    } catch (error) {
        console.error('❌ Error closing the database connection:', error);
    }
};




