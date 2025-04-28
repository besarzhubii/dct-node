const User = require("../models/User");

const login = async (req,res) => {
    const { email,password } = req.body;
    const user = await User.findOne({where:{email}});
    console.log({user});
    if(user && user.password == password){
        return res.status(200).json(user);
    }else{
        return res.status(500).json({
            login:false,
            msg: 'E-mail or password is incorrect!'
        });
    }
    // if(email == 'zhubibesar@gmail.com' && password == '12345678'){
    //     return res.status(200).json({
    //         id:1,
    //         role:'superadmin'
    //     })
    // } else if (email == 'zhubibesar1@gmail.com' && password == '12345678'){
    //     return res.status(200).json({
    //         id:2,
    //         role:'user'
    //     })
    // } else {
    //     return res.status(500).json({
    //         login:false,
    //         msg: 'E-mail or password is incorrect!'
    //     });
    // }
}

const addUser = async (req,res) => {
    try{
        console.log(req.body,'aaaaaaaaa')
        const createdUser = await User.create({
            ...req.body
        })
        return res.status(200).json({
            msg:"User created succesfully",
            user:createdUser
        })
    }catch(err){
        console.log({err});
        return res.status(500).json({msg:"Error creating user"});
    }
}

const getAllUsers = async (req,res) => {
    try{
        const users = await User.findAll({where:{role:"user"}});
        
        return res.status(200).json(users)
    }catch(err){
        return res.status(500).json({msg:"Error retrieving users"});
    }
}

const getUser = async (req,res) => {
    try{
        const { userId } = req.params;
        const users = await User.findOne({where:{id:userId}});
        return res.status(200).json(users)
    }catch(err){
        return res.status(500).json({msg:"Error retrieving user"});
    }
}

const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const userData = req.body; // Assuming userData is sent directly in the request body
  
      const [updatedRows] = await User.update(userData, { where: { id: userId } });
  
      if (updatedRows === 0) {
        return res.status(404).json({ msg: "User not found or no changes made." });
      }
  
      const updatedUser = await User.findByPk(userId); // Fetch the updated user
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json({ msg: "Error updating user", err });
    }
  };

module.exports = {
    login,
    addUser,
    getAllUsers,
    getUser,
    updateUser
}