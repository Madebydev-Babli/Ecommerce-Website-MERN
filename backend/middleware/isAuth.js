const jwt = require("jsonwebtoken");

const isAuth = async (req,res,next) =>{
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(400).json({
                message:"User does not have token"
            })
        }
        let verifytoken = jwt.verify(token,process.env.JWT_SECRET)
        if (!verifytoken) {
            return res.status(400).json({
                message:"User does not have a valid token"
            })
        }

        req.userId = verifytoken.userId;
        next();

    } catch (error) {
        console.log("isAuth Error")
        return res.status(500).json({
            success: false,
            message: `isAuth error${error.message}`
        })
    }
}

module.exports = isAuth;