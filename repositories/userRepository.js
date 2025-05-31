const User = require('../model/User');

exports.create = (data) => User.create(data);

exports.findAll = () => User.findAll();

exports.findByPk = (id) => User.findByPk(id);