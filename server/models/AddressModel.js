const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');

const AddressModel = sequelize.define('addr',{
	id:{
		type:Sequelize.BIGINT,
		primaryKey:true,
		allowNull:false,
		autoIncrement:true
	},
	userId:{
		type:Sequelize.BIGINT,
		allowNull:false
	},
	phone:{
		type:Sequelize.STRING(64),
		allowNull:false
    },
    address:{
		type:Sequelize.STRING(255),
		allowNull:false
    },
    username:{
		type:Sequelize.STRING(255),
		allowNull:false
    },
	updatetime:{
		type:Sequelize.DATE,
		allowNull:false
	},
	createtime:{
		type:Sequelize.DATE,
		allowNull:false
	},
},{
	timestamps:false,
});

module.exports = AddressModel;