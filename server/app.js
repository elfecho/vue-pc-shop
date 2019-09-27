const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const jwt = require('koa-jwt');
const cors = require('koa2-cors');

const mall = require('./routes/mall');
const user = require('./routes/user');
const admin = require('./routes/admin');

// logger
const logsUtil = require('./utils/logs.js');

// error handler
onerror(app);

// middlewares
app.use(cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
  const start = new Date();      // 响应开始时间
  let intervals;                 // 响应间隔时间
  try {
      await next();
      intervals = new Date() - start;
      console.log(`${ctx.method} ${ctx.url} - ${intervals}ms`)
      logsUtil.logResponse(ctx, intervals);     //记录响应日志
      
  } catch (error) {
      intervals = new Date() - start;
      logsUtil.logError(ctx, error, intervals);//记录异常日志
  }
});


app.use(jwt({
	secret:'chambers'
}).unless({path:[/^\/api/]}));

// routes
app.use(mall.routes(), mall.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(admin.routes(), admin.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
