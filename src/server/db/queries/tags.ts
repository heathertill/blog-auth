import { connection as knex } from '../index';
// import { Query } from '../index';

// const getTag = (blogid: number) => Query('SELECT t.id, t.name FROM tags t JOIN blogTags bt ON bt.tagid = t.id WHERE bt.blogid = ? ORDER BY t.name LIMIT 1', [blogid]);
// const createBlogTag = (blogid: number, tagid: number) => Query('INSERT INTO blogTags (blogid, tagid) VALUES (?, ?)', [blogid, tagid]);
// const getAllTags = () => Query('SELECT name, id FROM tags');
// const deleteBlogTag = (blogid: number) => Query('DELETE FROM tags WHERE blogid = ?', [blogid]);


const getTag = (blogid: number) => knex('tags').where('blogTags.blogid', blogid).select('tags.id', 'tags.name').join('blogTags', 'blogTags.tagid', '=', 'tags.id');
const createBlogTag = (blogObject: any) => knex('blogTags').insert(blogObject);
const getAllTags = () => knex('tags').select('name', 'id');
const deleteBlogTag = (blogid: number) => knex('blogTags').where('blogid', blogid).del();

export default {
    createBlogTag,
    deleteBlogTag,
    getTag,
    getAllTags
}
