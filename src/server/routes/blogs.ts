import { Router } from 'express';
import db from '../db';

const router = Router();


router.get('/:id?', async (req, res) => {
    let id = req.params.id
    if (id) {
        try {
            // the [0] gets the blog object from the array
            res.json(((await db.Blogs.one(id))[0])[0]);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    } else {
        try {
            res.json(await db.Blogs.all());
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
});

router.post('/', async (req, res) => {
    try {
        let newBlog = await db.Blogs.createBlog(req.body.title, req.body.content, req.body.authorid);
        res.json(newBlog);
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.json(await db.Blogs.updateBlog(req.body.title,req.body.content, req.params.id))
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        res.json(await db.Blogs.deleteBlog(req.params.id))
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});



export default router;

