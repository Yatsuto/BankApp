import connection_object from "./config.js";
const testConnection = async () => {
    try {
        console.log("DB_USER:", process.env.DB_USER);  
        const result = await connection_object.query('SELECT NOW();');
        console.log('Connected to database')
    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        connection_object.end();
    }
};

testConnection();
