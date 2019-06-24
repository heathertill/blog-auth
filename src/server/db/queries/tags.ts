import { Query } from '../index';

const createBlogTag = async (blogid: number, tagid: number) => Query('INSERT INTO blogTags (blogid, tagid) VALUES (?, ?)', [blogid, tagid]);

const deleteBlogTag = async (blogid: number) => Query('DELETE FROM blogTags WHERE blogid = ?', [blogid])

export default {
    createBlogTag,
    deleteBlogTag
}