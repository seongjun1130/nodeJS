const { where } = require('sequelize');
const { User } = require('../models');

exports.create = (data) => User.create(data);

exports.findAll = async () => { return await User.findAll() };;

exports.findByPk = (id) => User.findByPk(id);

exports.findByEmail = (email) => User.findOne({ where: { email } });