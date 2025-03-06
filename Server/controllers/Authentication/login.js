// This Controller is used to handle the login process for users by looking up the credentials against the USERS table
// and providing the appropriate json response
// ===================================================================================================================

// Passwords should be compared via bcrypt since the passwords are hashed before being stored in the database
// This is done by using the bcrypt.compare method

// This Controller needs to interact with the User model to look up the user by email


import User from "../../models/users.js";
const login = async (req, res) => {

    // Destructure the email and password from the request body

    // Check if the email and password are provided in the request body
    // If not, return an error response

    // Check if the user exists in the database by looking up the email
    // If the user does not exist, return an error response

    // Compare the provided password with the hashed password in the database
    // If the passwords do not match, return an error response

    // If the password match return a success response


}

export default login;