import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        res.json(await db.Tags.getAllTags())
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/:blogid', async (req, res) => {
    let blogid = req.params.blogid
    try {
        // res.json(((await db.Tags.getTag(blogid))[0])[0])
        res.json((await db.Tags.getTag(blogid))[0][0])
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
        res.json(await db.Tags.createBlogTag(req.body.blogid, req.body.tagid))
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/:blogid', async (req, res) => {
    let blogid = req.params.blogid
    try {
        res.json(await db.Tags.deleteBlogTag(req.params.blogid))
    } catch (err) {
        console.log(err)
    }
})

export default router;