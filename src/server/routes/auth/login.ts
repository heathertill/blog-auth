import * as express from 'express';
import * as passport from 'passport';

import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();


// passport.authenticate('local') will authenticate the user for us
router.post('/', passport.authenticate('local'), async (req, res, next) => {
    console.log('auth/login/ding')
      ///*** 
    try {
        let token = await CreateToken({ userid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            userid: req.user.id
        });
        console.log('auth/login/token', token);
        console.log('auth/login/role', req.user.role);
        console.log('auth/login/user.id', req.user.id);
    } catch (err) {
        console.log('auth/login/dong')
        console.log(err);
        res.sendStatus(500)
    }
})


export default router;

///*** */