const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../models');

exports.signUp = async (data) => {
    await isDuplicateEmailOrNickname(data.email, data.nickname);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
        ...data,
        password: hashedPassword
    };
    const user = await userRepository.create(userData);
    return {
        id: user.id,
        email: user.email,
        nickname: user.nickname
    };
};

exports.logIn = async (data) => {
    const user = await userRepository.findByEmail(data.email);
    if (!user) throw new Error('User not found');
    const isPasswordValid = await user.authenticate(data.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign(
        {
            id: user.id, email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h'
        }
    );
    return { token, user };
}

exports.getAllUsers = () => {
    return userRepository.findAll();
};

exports.getUserById = (id) => {
    return userRepository.findByPk(id);
};

exports.updateUser = async (id, data) => {
    const user = await userRepository.findByPk(id);

    if (!user) throw new Error('User not found');

    return user.update(data);
};

exports.deleteUser = async (id) => {
    const user = await userRepository.findByPk(id);

    if (!user) throw new Error('User not found');

    return user.destroy();
}

async function isDuplicateEmailOrNickname(email, nickname) {
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email },
                { nickname }
            ]
        }
    });
    if (user) {
        if (user.email === email) {
            throw new Error("중복된 이메일 입니다.");
        }
        if (user.nickname === nickname) {
            throw new Error("중복된 닉네임 입니다.");
        }
    }
};