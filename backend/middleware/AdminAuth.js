const jwt = require("jsonwebtoken");

const AdminAuth = async (req,res,next) =>{
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(400).json({
                message:"Not Authorised Login Again"
            })
        }
        let verifytoken = jwt.verify(token,process.env.JWT_SECRET);

        if (!verifytoken) {
            return res.status(400).json({
                message:"Not Authorised Login Again, Invalid token"
            })
        }

        req.adminEmail = process.env.ADMIN_EMAIL;
        next();

    } catch (error) {
        console.log("isAdminAuth Error")
        return res.status(500).json({
            success: false,
            message: `isAdminAuth error${error.message}`
        })
    }
}

module.exports = AdminAuth;