import * as express from 'express';

import DB from '../../db';

const router = express.Router();

router.get('/:name', async (req, res, next) => {
    try {
        res.json((await DB.Users.getUserId(req.params.name))[0])
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;