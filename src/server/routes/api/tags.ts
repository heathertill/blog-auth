import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        res.json(await queries.Tags.getAllTags())
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/:blogid', async (req, res, next) => {
    let blogid = req.params.blogid
    try {
        // res.json(((await db.Tags.getTag(blogid))[0])[0])
        res.json((await queries.Tags.getTag(blogid))[0])
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next) => {
    try {
        res.json(await queries.Tags.createBlogTag(req.body))
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/:blogid', async (req, res, next) => {
    let blogid = req.params.blogid
    try {
        res.json(await queries.Tags.deleteBlogTag(req.params.blogid))
    } catch (err) {
        console.log(err)
    }
});

export default router;