import * as express from 'express';

import {checkToken } from '../../utils/routerMiddleware';

import blogsRouter from './blogs';
import allTagsRouter from './allTags';
import usersRouter from './users';
import tagsRouter from './tags';

const router = express.Router();

// middleware -  this needs to be above all other routers to verify
// with this placed here it checks all api endpoints for token,
// not needed in auth/routes as they aren't authenticated yet
router.use(checkToken);

router.use('/blogs', blogsRouter);
router.use('/allTags', allTagsRouter);
router.use('/users', usersRouter);
router.use('/tags', tagsRouter);


export default router;