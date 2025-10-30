const jwt = require('jsonwebtoken');

const generateToken = async(userId)=>{
    try {
        let token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'});
        return token 
    } catch (error) {
        console.log("Token error")
    }
}


const generateToken1 = async(email)=>{
    try {
        let token = await jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'});
        return token 
    } catch (error) {
        console.log("Token error")
    }
}

module.exports = { generateToken, generateToken1 } 





































































