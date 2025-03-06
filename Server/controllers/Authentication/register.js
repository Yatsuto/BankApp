// This Controller is used to create a registration log when the user first attempts to create an accpount.
// It is also used to create the user account in the database once the user has verified their account
// ========================================================================================================

import RegistrationLog from "../../models/registraion_log.js";
export const register_log = async (req, res) => {
    
    // Destructure the email and password from the request body

    // Check if the email and password are provided in the request body
    // If not, return an error response

    // Check if the user already exists in the database by looking up the email
    // If the user exists, return an error response

    // Create a verification code for the user

    // Create an expiration time for the verification code

    // Create a new registration log in the database

    // Return a success response    

}


import User from "../../models/users.js";
export const register_post_verification = async (req, res) => {

    // Destructure the email, password, first name, and last name from the request body

    // Check if the email, password, first name, and last name are provided in the request body
    // If not, return an error response

    // Check if the user already exists in the database by looking up the email
    // If the user exists, return an error response

    // Create a new user in the database

    // Return a success response

}
