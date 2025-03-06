// This Model is a representation of the information associated with a bank account
// and it is linked the owner via the email field since it needs to be unique per user
// ====================================================================================

import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Account = sequelize.define('account', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    account_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    max_limit:
    {
        type: DataTypes.DECIMAL(10, 2),
        allowNull
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
},{
    timestamps: false,
    tableName: 'accounts',
});

export default Account;