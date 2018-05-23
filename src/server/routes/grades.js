const Router = require('koa-router');
// const fs = require('fs');
// const FB = require('fb');
// const Twitter = require('twitter');

const queries = require('../db/queries/grades');
// const { FBConfig, TwitterConfig, accessToken, pageID } = require('../config');

// const fb = new FB.Facebook(FBConfig);
// const T = new Twitter(TwitterConfig);

// FB.setAccessToken(accessToken);

const router = new Router();
const BASE_URL = `/api/v1/grades`;

const uploadTweetMedia = async (err, media, ctx) => {
    try {
        console.log(media)

        const status = await {
            status: ctx.body.status,
            media_ids: media.media_id_string
        }

        await T.post('statuses/update', status)
        ctx.status = 200
    } catch (err) {
        console.error(err)
    }
}

const uploadFBMedia = async (err, ctx) => {
    try {
        console.log('post success')
        ctx.status = 200

    } catch (err) {
        console.error(err)
    }
}

router.get(BASE_URL, async (ctx) => {
    try {
        const grades = await queries.getAllGrades();

        ctx.body = {
            status: 'success',
            data: grades
        };
    } catch (err) {
        console.error(err)
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
        } else {
            ctx.status = 404;

            ctx.body = {
                status: 'error',
                message: 'That person does not exist'
            };
        }
    } catch (err) {
        console.error(err)
    }
})

router.post(`${BASE_URL}`, async (ctx) => {
    try {
        const grade = await queries.addSubject(ctx.request.body);

        if (grade.length) {
            ctx.status = 200;

            ctx.body = {
                status: 'success',
                data: grade
            };
            // await T.post('statuses/update', { status: grade })
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