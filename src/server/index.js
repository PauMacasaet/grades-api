const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const indexRoutes = require('./routes/index');
const gradeRoutes = require('./routes/grades');

const app = new Koa();
const PORT = process.env.PORT || 8888;

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(gradeRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;