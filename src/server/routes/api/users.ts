import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/:name', async (req, res, next) => {
    try {
        let [user] = await queries.Users.getUserId(req.params.name)
        res.json(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;