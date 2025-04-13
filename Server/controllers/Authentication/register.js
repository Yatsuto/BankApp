// This Controller is used to create a registration log when the user first attempts to create an accpount.
// It is also used to create the user account in the database once the user has verified their account
// ========================================================================================================
import User from "../../models/users.js"
// import RegistrationLog from "../../models/registration_log.js"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
  // Destructure the email, password, first_name, and last_name from the request body
  const { email, password, first_name, last_name } = req.body

  // Check if the required fields are provided in the request body
  // If not, return an error response
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({
      success: false,
      error: "Email, password, first name, and last name are required",
    })
  }

  // Check if the user already exists in the database by looking up the email
  // If the user exists, return an error response
  const existingUser = await User.findOne({ where: { email } })
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: "User with this email already exists",
    })
  }

  // Hash the password
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const newUser = await User.create({
    email,
    password: hashedPassword,
    first_name,
    last_name
  });

  // Return a success response
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  })
}
