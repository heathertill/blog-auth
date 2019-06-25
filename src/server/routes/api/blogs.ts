import * as express from 'express';

import DB from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const router = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    console.log('api/blogs/test1', req.user);
    if (!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401)
    } else {
        return next();
    }
};

router.get('/', async (req, res, next) => {
    console.log('api/blogs/test2');
    try {
        let blogs = await DB.Blogs.all();
        console.log('api/blogs/blogs');
        res.json(blogs);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
});

router.get('/:id?', isAdmin, async (req, res, next) => {
    console.log('api/blogs/test3');
    let id = req.params.id
    try {
            let blog = await DB.Blogs.one(id)
            // the [0] gets the blog object from the array
            res.json(((blog)[0])[0]);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
});

// router.post('/', async (req, res, next) => {
//     try {
//         let newBlog = await DB.Blogs.createBlog(req.body.title, req.body.content, req.body.userid);
//         res.json(newBlog);
        
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

// router.put('/:id', async (req, res, next) => {
//     try {
//         let blog = await DB.Blogs.updateBlog(req.body.title,req.body.content, req.params.id)
//         res.json(blog)
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

// router.delete('/:id', async (req, res, next) => {
//     try {
//         res.json(await DB.Blogs.deleteBlog(req.params.id))
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// });


export default router;