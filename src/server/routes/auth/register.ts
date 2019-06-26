import * as express from 'express';

import DB from '../../db';
import { HashPassword } from '../../utils/security/password';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let user = req.body;
        user.password = HashPassword(req.body.password);
        let res: any = await DB.Users.insert(user.firstname, user.email, user.password);
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