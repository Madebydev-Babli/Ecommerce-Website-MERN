const User = require("../model/userModel");


const getCurrentUser = async (req,res) => {
    try {
        let user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Get current User error${error.message}`
        })
    }
}



const getAdmin = async (req,res) => {
    try {
        let adminEmail = req.adminEmail;
        if (!adminEmail) {
            return res.status(404).json({
                message: "Admin Not Found"
            })
        }
        return res.status(201).json({
            email: adminEmail,
            role: "admin"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Get Admin error${error.message}`
        })
    }
}

module.exports = { getCurrentUser, getAdmin};