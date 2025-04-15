import User from "../../models/users.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({
      success: false,
      error: "Email, password, first name, and last name are required",
    });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User with this email already exists",
      });
    }

    const isPasswordStrong = (pw) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return regex.test(pw);
    };
    
    if (!isPasswordStrong(password)) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters long and include uppercase, lowercase, and a number"
      });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name
    });

    // ✅ Return user details including ID
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error during registration"
    });
  }
};
