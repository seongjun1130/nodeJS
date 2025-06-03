const userService = require('../services/userService');

exports.signUp = async(req,res) =>{
    const user = await userService.signUp(req.body);
    res.json(user);
};

exports.getAllUsers = async(req,res)=>{
    const users = await userService.getAllUsers();
    res.json(users);
};

exports.getUserById = async(req,res)=>{
    const user = await userService.getUserById(req.params.id);
    res.json(user);
};

exports.updateUser = async(req,res)=>{
    const user = await userService.updateUser(req.params.id,req.body);
    res.json(user);
};

exports.deleteUser = async(req,res)=>{
    await userService.deleteUser(req.params.id);
    res.json({message : 'deleted'});
};