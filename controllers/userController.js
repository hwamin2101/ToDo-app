require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");
const userService = require('../service/userService');

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const signup = async (req, res) => {
  try{
    const {name,email,password,dateOfBirth} = req.body;
    const trimmeData={
      name:name.trim(),
      email:email.trim(),
      password:password.trim(),
      dateOfBirth:dateOfBirth.trim()
    }
    const result = await userService.signup(trimmeData);
    if(result.status=="error"){
      console.log("result error ___",result)
      return res.json({message:result.message})
    }
      console.log("result ___",result)

    res.json({
      status: "success",
      message: result.message,
      data: result.data,
    })
  }catch(error){
    console.log("error during signup",error)
    res.json({message:"an error occurred"})
  }
}
const login= async (req, res) => {
  try{
    const{email,password}= req.body;
    const trimmeData={
      email:email.trim(),
      password:password.trim()
    }
    const result = await userService.login(trimmeData);
    if(result.status=="error"){
      return res.json({message:result.message})
    }
    res.json({
      status: "success",
      message: result.message,
      data: result.data,
    })
  }catch(error){
    console.log("error during login",error)
    res.json({message:"an error occurred"})
  }
}

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
  const result = await userService.getAllUsers();
  return{
    status: "success",
    data: result,
  }
}
module.exports = {
  signup,
  login,
  refreshToken,
  getAllUsers
}