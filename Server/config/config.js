import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USER,     
    process.env.DB_PASSWORD,   
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres', 
        dialectOptions: {
            ssl: {
                require: true,  
                rejectUnauthorized: false  
            }
        },
        logging: false,  
    }
);

export default sequelize;
