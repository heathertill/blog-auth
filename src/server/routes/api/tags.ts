import * as express from 'express';

import DB from '../../db';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.json(await DB.Tags.getAllTags())
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/:blogid', async (req, res, next) => {
    let blogid = req.params.blogid
    try {
        // res.json(((await db.Tags.getTag(blogid))[0])[0])
        res.json((await DB.Tags.getTag(blogid))[0][0])
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next) => {
    try {
        res.json(await DB.Tags.createBlogTag(req.body.blogid, req.body.tagid))
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/:blogid', async (req, res, next) => {
    let blogid = req.params.blogid
    try {
        res.json(await DB.Tags.deleteBlogTag(req.params.blogid))
    } catch (err) {
        console.log(err)
    }
})

export default router;