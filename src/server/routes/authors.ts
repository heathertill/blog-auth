import { Router } from 'express';
import db from '../db';

const router = Router();






router.get('/:name', async (req, res) => {
    try {
        res.json((await db.Authors.getAuthId(req.params.name))[0])
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})


export default router;