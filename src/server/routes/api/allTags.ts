import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/:selectTag', async (req, res, next) => {
    let id = req.params.selectTag;
    try {
        res.json((await queries.AllTags.allOneTag(id))[0])
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

export default router