const pool=require("../../db/database.js")
class User{
   constructor (user){
    this.user_id=user.user_id;
    this.employee_id=user.employee_id;
    this.email=user.email;
    this.created_at=user.created_at;
    this.password_hash = user.password_hash;
    this.role=user.role;
   } 
   static async createUser({email,employee_id,password_hash,role}){
    const [result]=await pool.query(
        "INSERT INTO users (employee_id, email, password_hash, role) VALUES (?, ?, ?, ?)",
        [employee_id,email,password_hash,role]
    );
    return { user_id: result.insertId, email, role };
   }    
   static async findByID({user_id}){
    const[rows]=await pool.query(
        "select * from users where user_id =?",[user_id] 

    )
    if (rows.length > 0) {
        return new User(rows[0])
    }else{
        return null
    }
   }
   static async findAll() {
    const [rows] = await pool.query(
      "SELECT * FROM users"
    );
  
    if (rows.length > 0) {
      return rows; 
    } else {
      return 0; 
    }
  }
   static async deleteUser({ user_id }) {
    const [result] = await pool.query(
      "DELETE FROM users WHERE user_id = ?",
      [user_id]
    );
  
    return result.affectedRows > 0;
  }
  static async findByEmailOrEmployeeId(email, employee_id) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? OR employee_id = ? LIMIT 1",
      [email, employee_id]
    );
    return rows[0] || null;
  }
  static async updateUser(user_id, { email, role }) {
    await pool.query(
      "UPDATE users SET email = ?, employee_id = ?, role = ? WHERE user_id = ?",
      [email, employee_id, role, user_id]
    );
    return this.getUserById(user_id);
  }

    
}
module.exports = User;
