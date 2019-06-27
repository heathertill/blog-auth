import * as express from 'express';

import queries from '../../db';
import { HashPassword } from '../../utils/security/password';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let user = req.body;
        user.password = HashPassword(req.body.password);
        let res: any = await queries.Users.insert(user);
        let token = await CreateToken({ userid: res.insertId });
        res.json({
            token,
            role: 'guest',
            userid: res.insertId
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

export default router;