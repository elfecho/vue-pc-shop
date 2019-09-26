//sequelize基础配置文件
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mall','root','123456',{
	host:'localhost',
	dialect:'mysql',
})
module.exports = sequelize;