require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const JWT_SECRET = process.env.JWT_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const generateAccessToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" })
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
}

const signup = async ({ name, email, password, dateOfBirth }) => {
    if (!name || !email || !password) {
        return { status: 400, message: "Empty required information" };
    }
    if (!/^[a-zA-Z]*$/.test(name)) {
        return { status: 400, message: "Invalid name entered" };
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,7}$/.test(email)) {
        return { status: 400, message: "Invalid email entered" };
    }
    if (!new Date(dateOfBirth).getTime()) {
        return { status: 400, message: "Invalid date of birth entered" };
    }
    if (password.length < 6) {
        return { status: 400, message: "Password must be at least 6 characters" };
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return { status: 409, message: "User with the given email already exists!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        dateOfBirth,
    });

    return {
        message: "Save new user successfully",
        data: newUser,
        status: 200
    };
}

const login = async ({ email, password }) => {
    if (!email || !password) {
        return { status: 400, message: "Email or password is missing" };
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,7}$/.test(email)) {
        return { status: 400, message: "Invalid email entered" };
    }

    
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return { status: 404, message: "User not found" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return { status: 401, message: "Incorrect password" };
    }

    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
    });
    const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
    });

    return {
        message: "User logged in successfully",
        data: { user, accessToken, refreshToken },
        status:200
       
    };
       
}

module.exports = {
    signup,
    login,
}