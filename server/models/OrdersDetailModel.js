const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');

const OrdersDetailModel = sequelize.define('ordersdetail',{
	id:{
		type:Sequelize.BIGINT,
		primaryKey:true,
		allowNull:false,
		autoIncrement:true
    },
    orderId:{
		type:Sequelize.BIGINT,
		allowNull:false
	},
	goodsDetailId:{
		type:Sequelize.BIGINT,
		allowNull:false
	},
	goodsNum:{
		type:Sequelize.INTEGER,
		allowNull:false
	},
	amount:{
		type:Sequelize.FLOAT,
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

module.exports = OrdersDetailModel;