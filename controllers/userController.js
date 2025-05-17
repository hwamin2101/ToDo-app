require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");
const userService = require('../service/userService');
const authService = require('../service/authService');

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const signup = async (req, res) => {
    try {
        const { name, email, password, dateOfBirth } = req.body;
        const trimmeData = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            dateOfBirth: dateOfBirth.trim()
        };
        const result = await authService.signup(trimmeData);
        
       if (result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
       }
        res.status(200).json(result);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "An error occurred during signup";
        res.status(status).json({ message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const trimmeData = {
            email: email.trim(),
            password: password.trim()
        };
        const result = await authService.login(trimmeData);
        
        if (result.status !== 200) {
          return res.status(result.status).json({ message: result.message });
        }
        res.status(200).json(result); 
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "An error occurred during login";
        res.status(status).json({ message });
    }
};

const refreshToken = async (req, res) => {
  const {token} = req.body;
  if(!token){
    return res.status(401).json({message:"token not found"})
  }
  try{
    const userPayload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const user = await User.findById(userPayload.id);
    if(!user || user.refreshToken !== token){
      return res.status(403).json({message:"invalid token"})
    }
    const newAccessToken = jwt.sign(
      {id:user.id, email:user.email},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    )
    res.json({
      status: "success",
      message: "token refreshed successfully",
      data: {
        accessToken: newAccessToken,
        refreshToken: token
      }
    })
  }catch(error){
    console.log("error during token refresh",error)
    res.json({message:"an error occurred"})
  }
}
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
module.exports = {
  signup,
  login,
  refreshToken,
  getAllUsers
}