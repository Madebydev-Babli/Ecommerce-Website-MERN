const User = require('../model/userModel');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { generateToken, generatetoken1, generateToken1 } = require('../config/token');

const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "User Already Exist!"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid Email Format!"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be atleast 8 characters1"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        let token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000
        });
        console.log("Registration Succesful")
        res.status(201).json({
            success: true,
            user: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Registeration error${error.message}`
        })
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Email!"
            })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Wrong Password!!!"
            })
        }
        let token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000
        });
        console.log("Login Successfully")
        res.status(201).json({
            user: user,
            message: "Login Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Logging error${error.message}`
        })
    }
}



const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout SuccessFully" })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Logout error${error.message}`
        })
    }
}



const googleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const user = await User.create({ name, email })
        }

        let token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000
        });
        console.log("Google Login Successfully")
        res.status(200).json({
            user: user,
            message: "User Created Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Google Logging error${error.message}`
        })
    }

}



const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await generateToken(email);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 1 * 24 * 60 * 1000
            });
            console.log("Token for admin created sucessfully")
            res.status(200).json(token)
        } return res.status(400).json({ message: "Invalid Credentials" })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Admin Logging error${error.message}`
        })
    }

}


module.exports = { registration, login, logout, googleLogin, adminLogin };