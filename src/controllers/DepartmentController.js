const Dep = require("../Models/Department.js");
class DepartmentController{
    static async createDepartment(req,res){
        try{
            const{name,description}=req.body;
            if (!name) {
                return res.status(400).json({
                  success: false,
                  message: "Department name is required",
                });
              }
          
            const existingDepartment=await Dep.findDepartmentByName(name)
            if(existingDepartment){
                return res.status(400).json({success:false,message:"department already exists"})
            }
            const department=await Dep.createDepartment(name,description)
            if(!department){
                return res.status(401).json({success:false,message:"departemnt was not created"})
            }
            return res.status(201).json({success:true,data:department,message:"department created"})
        }catch(error){
            return res.status(501).json({success:false,message:"server error"})
        }
    }
    static async getAllDepartments(req,res){
        try{
            const departments=await Dep.findAllDepartments();
            if(!departments||departments.length===0){
                return res.status(404).json({success:false,message:"no departments found"})
            }
            return res.status(200).json({success:true,data:departments})
        }catch(error){
            return res.status(500).json({success:false,message:"server error"})
        }
    
        }
        static async getDepartmentById(req,res){
            try{
                const{id}=req.params;
                const department=await Dep.findDepartmentById(id);
                if(!department){
                    return res.status(404).json({success:false,message:"no Departmnent found"})
                }
                return res.status(200).json({success:true,data:department})
            }catch(error){return res.status(500).json({success:false,message:"server error"})}
        }
        static async getDepartmentByName(req,res){
            try{
                const{name}=req.params;
                const department=await Dep.findDepartmentByName(name);
                if(!department){
                    return res.status(404).json({success:false,message:"no Departmnent found"})
                }
                return res.status(200).json({success:true,data:department})
            }catch(error){return res.status(500).json({success:false,message:"server error"})}
        }
    static async updateDepartment(req,res){
        try{
            const{id}=req.params;
            const existingDepartment=await Dep.findDepartmentById(id);
            if(!existingDepartment){
                return res.status(404).json({success:false,message:"department not found"})
            }
            let { name, description } = req.body;

            // Fallback to existing values if not provided
            name = name || existingDepartment.name;
            description = description || existingDepartment.description;
    
            const department=await Dep.updateDepartment(id,{name,description})
            if(department){
                return res.status(200).json({success:true,data:department,message:"department updated"})
            }else{
                return res.status(401).json({success:false,message:"failed to update department"})
            }

    }catch(error){return res.status(500).json({success:false,message:"server error"})}
    }
    static async deleteDepartment(req, res) {
        try {
          const { id } = req.params;
      
          const department = await Dep.findDepartmentById(id);
          if (!department) {
            return res.status(404).json({
              success: false,
              message: "Department not found",
            });
          }
      
          const deleted = await Dep.deleteDepartment(id);
      
          if (deleted) {
            return res.status(200).json({
              success: true,
              message: "Department deleted successfully",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "Failed to delete department",
            });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: "Server error",
          });
        }
      }
      
    
}
module.exports = DepartmentController;
