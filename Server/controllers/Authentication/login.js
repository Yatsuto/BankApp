// This Controller is used to handle the login process for users by looking up the credentials against the USERS table
// and providing the appropriate json response
// ===================================================================================================================

// Passwords should be compared via bcrypt since the passwords are hashed before being stored in the database
// This is done by using the bcrypt.compare method

// This Controller needs to interact with the User model to look up the user by email

import User from "../../models/users.js"
import bcrypt from "bcrypt"

const login = async (req, res) => {
  // Destructure the email and password from the request body
  const { email, password } = req.body

  // Check if the email and password are provided in the request body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and Password are required",
    })
  }

  // Check if the user exists in the database by looking up the email
  const existingUser = await User.findOne({ where: { email } })
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      error: "User not found",
    })
  }

  // Compare the provided password with the hashed password in the database
  const isValid = await bcrypt.compare(password, existingUser.password)

  if (!isValid) {
    return res.status(400).json({
      success: false,
      error: "Invalid Password",
    })
  }

  // If the password match return a success response
  return res.status(200).json({
    success: true,
    message: "Login Successful"
  })
}

export default login
