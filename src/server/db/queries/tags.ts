import { Query } from '../index';

const createBlogTag = async (blogid: number, tagid: number) => Query('INSERT INTO blogTags (blogid, tagid) VALUES (?, ?)', [blogid, tagid]);

const deleteBlogTag = async (blogid: number) => Query('DELETE FROM blogTags WHERE blogid = ?', [blogid]);

const getTag = async (blogid: number) => Query('CALL spGetTagName(?)', [blogid]);
 
const getAllTags = async () => Query('SELECT name, id FROM tags');

export default {
    createBlogTag,
    deleteBlogTag,
    getTag,
    getAllTags
}