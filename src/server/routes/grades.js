const Router = require('koa-router');
const queries = require('../db/queries/grades');

const router = new Router();
const BASE_URL = `/api/v1/grades`;

router.get(BASE_URL, async (ctx) => {
    try {
        const grades = await queries.getAllGrades();
        ctx.body = {
            status: 'success',
            data: grades
        };
        console.log('Getting all grades')
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const grade = await queries.getOneGrades(ctx.params.id);
        if (grade.length) {
            ctx.body = {
                status: 'success',
                data: grade
            };
            console.log('Getting all grades')
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That person does not exist'
            };
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;