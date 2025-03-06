// Model to interact with potential users durig the signup process
// ===============================================================

// Potential users are stored in the registration_log table before they have gone through the signup and verification process
// This table is used to store the user's email and password, a verification code, and an expiration time before they have been verified
// Once the user is verified their personal information is stored in the Users table and the log is removed from this table

// Registration logs may stay in this table indifinitely if the user never verifies their account
// so a cleanup process should be implemented to remove old logs

import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const RegistrationLog = sequelize.define('registration_log', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verification_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiration_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},{
    timestamps: false,
    tableName: 'registration_log',

});

export default RegistrationLog;