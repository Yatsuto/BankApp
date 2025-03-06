// Model to interact with user table in postgres database and represent the user entity
// ====================================================================================

// Users are stored in the users table only after they have gone through the signup and verification process
import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps: false,
    tableName: 'users',

});

export default User;