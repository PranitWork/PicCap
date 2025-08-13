const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none",   // required for cross-site cookies
    maxAge: 24 * 60 * 60 * 1000 }); // optional: secure flags
    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    res.status(201).json({ message: "User registered successfully", user: userToReturn });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}


async function loginController(req, res) {
  const {username,password}= req.body;
  try{
    const user = await userModel.findOne({ username:username });
    if(!user){
      return res.status(400).json({ message: "Invalid username" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token,{
    httpOnly: true,
    secure: false,        // set to true in production (HTTPS)
    sameSite: 'none', 
    maxAge: 24 * 60 * 60 * 1000     
  });
    res.status(200).json({ message: "Login successful", user: user.toObject() });
  }catch(err){
    res.status(500).json({ message: "Server error" });
  }
}




module.exports = {
  registerController,
  loginController
};
