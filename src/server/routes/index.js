const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    title: 'grades'
  };
  
})

module.exports = router;