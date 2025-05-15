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
    try {
        if (!name || !email || !password) {
            return { status: "error", message: "Empty required information" }
        }
        if (!/^[a-zA-Z]*$/.test(name)) {
            return { status: "error", message: "Invalid name entered" }
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,7}$/.test(email)) {
            return { status: "error", message: "Invalid email entered" }
        }
        if (!new Date(dateOfBirth).getTime()) {
            return { status: "error", message: "Invalid date of birth entered" }
        }
        if (password.length < 6) {
            return {
                status: "error",
                message: "Password must be at least 6 characters",
            }
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return {
                status: "error",
                message: "User with the given email already exists!",
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
        })

        const savedUser = await newUser.save()

        return {
            status: "success",
            message: "Save new user successfully",
            data: savedUser,
        }
    } catch (error) {
        console.error("Error in auth service:", error)
        return {
            status: "error",
            message: "An error occurred during signup",
        }
    }
}

const login = async ({ email, password }) => {
    try {
        if (!email || !password) {
            return {
                status: "error",
                message: "Email or password is missing",
            }
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,7}$/.test(email)) {
            return {
                status: "error",
                message: "Invalid email entered",
            }
        }

        const user = await User.findOne({ email })
        if (!user) {
            return {
                status: "error",
                message: "User not found",
            }
        }


        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return {
                status: "error",
                message: "Incorrect password",
            }
        }

        const accessToken = generateAccessToken({
            id: user._id,
            email: user.email,
        })
        const refreshToken = generateRefreshToken({
            id: user._id,
            email: user.email,
        })

        return {
            status: "success",
            message: "User logged in successfully",
            data: { user, accessToken, refreshToken },
        }
    } catch (error) {
        console.error("Error in auth service:", error)
        return {
            status: "error",
            message: "An error occurred during login",
        }
    }
}

module.exports = {
    signup,
    login,
}