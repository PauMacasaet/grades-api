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

            console.log('Getting all grades by id')
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

router.post(`${BASE_URL}`, async (ctx) => {
    try {
        const grade = await queries.addSubject(ctx.request.body);

        if (grade.length) {
            ctx.status = 201;

            ctx.body = {
                status: 'success',
                data: grade
            };

            console.log('Added subject')
        } else {
            ctx.status = 400;

            ctx.body = {
                status: 'error',
                message: 'something went wrong'
            };
        }
    } catch (err) {
        ctx.status = 400;

        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred'
        };
    }
})

router.put(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const grade = await queries.updateSubject(ctx.params.id, ctx.request.body);

        if (grade.length) {
            ctx.status = 200;

            ctx.body = {
                status: 'success',
                data: grade
            };

            console.log('Updated subject')
        } else {
            ctx.status = 404;

            ctx.body = {
                status: 'error',
                message: 'That subject doesnt exist'
            };
        }
    } catch (err) {
        ctx.status = 400;

        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry , an error has occurred'
        };
    }
})

router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const grade = await queries.deleteSubject(ctx.params.id);

        if (grade.length) {
            ctx.status = 200;

            ctx.body = {
                status: 'DELETED',
                deleted: true
            };

            console.log('Deleted subject')
        } else {
            ctx.status = 404;

            ctx.body = {
                status: 'error',
                message: 'That subject doesnt exist',
                deleted: false
            };
        }
    } catch (err) {
        ctx.status = 400;

        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred',
            deleted: false
        };
    }
})

module.exports = router;