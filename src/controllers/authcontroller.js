const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/user.js");
const cfg = require("../config/auth.js");


function signAccessToken(payload){
    return jwt.sign(payload,cfg.ACCESS_TOKEN_SECRET,{expiresIn:cfg.ACCESS_TOKEN_EXPIRES_IN})
}

class AuthController{
    static async login(req,res){try{
        const {email,EmployeeId,password}=req.body;
        if((!email&&!EmployeeId)||!password){return res.status(400).json({ message: "Email & password required" });}
        const userRow=await User.findByEmailOrEmployeeId(email,EmployeeId)
        if (!userRow)return res.status(401).json({ message: "Invalid credentials" });
        const ok =await bcrypt.compare(password,userRow.password_hash)
        if (!ok)return res.status(401).json({ message: "Invalid credentials" });
        const payload={sub:userRow.user_id,role:userRow.role};
        const accessToken = signAccessToken(payload);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
          });
    }catch(error){
        console.error("Login error:", error);
      return res.status(500).json({ message: "Server error" });
    }}
}
module.exports = AuthController;
