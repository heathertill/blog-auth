import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';

import { ValidToken } from '../utils/security/tokens';
import DB from '../db';

passport.use(new BearerStrategy.Strategy(async (token, done) => {
    console.log('mid/bearer/token', token)
    try {
        let payload = await ValidToken(token);
        console.log('mid/bearer/payload', payload)
        let [user] = await DB.Users.findOneById(payload.userid);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err);
    }
}))