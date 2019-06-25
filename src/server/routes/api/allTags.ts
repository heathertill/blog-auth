import * as express from 'express';

import DB from '../../db';

const router = express.Router();

router.get('/:selectTag', async (req, res, next) => {
    let id = req.params.selectTag;
    try {
        res.json((await DB.AllTags.allOneTag(id))[0])
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})




export default router