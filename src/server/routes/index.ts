import { Router } from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import authorsRouter from './authors';
import allTagsRouter from './allTags';

const router = Router();


router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/authors', authorsRouter);
router.use('/allTags', allTagsRouter);










export default router;

