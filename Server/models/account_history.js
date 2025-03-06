// This Model is used to represent the history of transactions associated with a bank account
// ==========================================================================================

// Transactions need to be verified before they take place, for example their should be some kind of validation
// step to prevent users from attempting to withdraw more money than they have available in their account.

import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const AccountHistory = sequelize.define('account_history', {
    account_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transaction_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},{
    timestamps: false,
    tableName: 'account_history',
});

export default AccountHistory;