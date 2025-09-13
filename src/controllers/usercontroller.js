const User = require("../Models/user.js");
const bcrypt = require("bcrypt");

class UserController {
    static async createUser(req,res){
        try{ const{ email, employee_id, password, role }=req.body;
        const existingUser = await User.findByEmailOrEmployeeId(email, employee_id);
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }
          const saltRounds = 10;
          const password_hash = await bcrypt.hash(password, saltRounds);
        
        const user=await User.createUser({
            email,
            password_hash,
            role,
            employee_id})
            return res.status(201).json({success:true,data:user})

    }catch(error){
        console.error("error Creating User",error)
        return res.status(500).json({success:false,message: "server error" })
    }}
    static async getUserById(req,res){
        try{
            const{id}=req.params;
            const user=await User.findByID ({user_id:id})
            if(!user){
                return res.status(404).json({success:false,message:" USER not found"})
            }else{
                return res.status(200).json({ success: true, data: user });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ success: false, message: "Server error" });
          }}
          static async getAllUsers(req, res) {
            try {
              const users = await User.findAll();
          
              if (!users || users.length == 0) {
                return res.status(404).json({ 
                  success: false, 
                  message: "No users found" 
                }); 
              }
          
              return res.status(200).json({ 
                success: true, 
                data: users 
              });
            } catch (error) {
              console.error("Error fetching users:", error);
              return res.status(500).json({ 
                success: false, 
                message: "Server error" 
              });
            }
          }
          static async deleteUser(req, res) {
            try {
              const { id } = req.params;
              const deleted = await User.deleteUser({ user_id: id });
        
              if (!deleted) {
                return res.status(404).json({ success: false, message: "User not found" });
              }
        
              return res.status(200).json({ success: true, message: "User deleted" });
            } catch (error) {
              console.error("Error deleting user:", error);
              return res.status(500).json({ success: false, message: "Server error" });
            }
          }
          static async updateUser(req, res) {
            try {
              const { id } = req.params;
              const { email, role, } = req.body;
              const existingUser = await User.getUserById(id);
              if (!existingUser) {
              return res.status(404).json({ success: false, message: "User not found" });
              }
              if (!email) {
                email=existingUser.email
              }
              if (!role) {
                role=existingUser.role
              }
              const updatedUser = await User.updateUser(id, { email, role });
              const newexistingUser = await User.getUserById(id);
              if(newexistingUseremail!==email||newexistingUser.role!==role){
                return res.status(401).json({
                  success: false,
                  message: "failed to update user",
              });}else{
                return res.status(200).json({
                  success: true,
                  message: "User updated",
                    data: updatedUser,
                });
              }
              }catch (error) {
              return res.status(500).json({ success: false, message: "Server error" });
            }
            }
        }

        

module.exports = UserController;




