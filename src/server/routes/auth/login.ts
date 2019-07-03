import * as express from 'express';
import * as passport from 'passport';

import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

// passport.authenticate('local') will authenticate the user for us
router.post('/', passport.authenticate('local'), async (req, res, next) => {
    // let userid = req.user.id
      ///*** 
    try {
        let token = await CreateToken({userid: req.user.id});
        res.json({
            token,
            role: req.user.role,
            userid: req.user.id
        });
        console.log('*20 auth/login/token', token);
        console.log('*21 auth/login/role', req.user.role);
        console.log('*22 auth/login/user.id', req.user.id);
    } catch (err) {
        console.log('*23 auth/login/dong')
        console.log(err);
        res.sendStatus(500)
    }
})


export default router;