const userService = require('../services/userService');

exports.signUp = async (req, res) => {
    const user = await userService.signUp(req.body);
    res.json(user);
};

exports.login = async (req, res) => {
    try {
        const { token, user } = await userService.logIn(req.body);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            sameSite: 'Strict',
        });
        res.status(200).json({ message: '로그인 성공 ', token, userId: user.id })
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
};

exports.updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
};

exports.deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'deleted' });
};