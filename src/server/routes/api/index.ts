import * as express from 'express';
import * as passport from 'passport';

import blogsRouter from './blogs';
import allTagsRouter from './allTags';
import usersRouter from './users';
import tagsRouter from './tags';

const router = express.Router();

// this needs to be above all other routers to verify
router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if (user) {
            req.user = user
            return next();
        } else {
            return next();
        }
        
    })(req, res, next);
});

router.use('/blogs', blogsRouter);
router.use('/allTags', allTagsRouter);
router.use('/users', usersRouter);
router.use('/tags', tagsRouter);


export default router;