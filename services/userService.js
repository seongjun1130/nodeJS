const userRepository = require('../repositories/userRepository');

exports.createUser=(data)=>{
    return userRepository.create(data);
};

exports.getAllUsers=()=>{
    return userRepository.findAll();
};

exports.getUserById=(id)=> {
    return userRepository.findByPk(id);
};

exports.updateUser= async(id,data) =>{
    const user = await userRepository.findByPk(id);

    if(!user) throw new Error('User not found');

    return user.update(data);
};

exports.deleteUser = async(id)=>{
    const user = await userRepository.findByPk(id);

    if(!user) throw new Error('User not found');

    return user.destroy();
}