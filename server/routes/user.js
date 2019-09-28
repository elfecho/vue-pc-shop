const router = require('koa-router')();
const user = require('../controllers/user');

//注册
router.post('/api/user/signup', user.signup);

//登录
router.post('/api/user/login', user.login);

//获得用户基本信息
router.get('/api/user/data', user.getData);

//更改用户资料
router.post('/api/user/updateUserData', user.updateUserData);

//更改用户密码
router.post('/api/user/updatePwd', user.updatePwd);

// 获取用户的收货地址
router.get('/api/user/getAddress', user.getAddress)

// 新增收货地址
router.post('/api/user/featAddress', user.featAddress)

// 修改收货地址deleteAddress
router.post('/api/user/fixAddress', user.fixAddress)

// 删除收货地址
router.post('/api/user/deleteAddress', user.deleteAddress)
/*
//修改昵称
router.post('/privateApi/user/setNickname',user.setNickname);

//修改性别
router.post('/privateApi/user/setSex',user.setSex);

//修改城市
router.post('/privateApi/user/setCity',user.setCity);

//修改头像
router.post('/privateApi/user/setHeadimg',user.setHeadimg);

//修改密码
router.post('/privateApi/user/setPwd',user.setPwd);

//搜索用户
router.get('/api/user/search', user.searchUser);*/

module.exports = router
