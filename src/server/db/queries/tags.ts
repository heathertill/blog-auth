import { connection as knex } from '../index';

const getTag = (blogid: number) => knex('tags').where('blogTags.blogid', blogid).select('tags.id', 'tags.name')
    .join('blogTags', 'blogTags.tagid', '=', 'tags.id').orderBy('tags.name').limit(1);




const createBlogTag = (blogObject: any) => knex('blogTags').insert(blogObject);
const getAllTags = () => knex('tags').select('name', 'id');
const deleteBlogTag = (blogid: number) => knex('blogTags').where('blogid', blogid).del();


// const createBlogTag = async (blogid: number, tagid: number) => Query('INSERT INTO blogTags (blogid, tagid) VALUES (?, ?)', [blogid, tagid]);

// const deleteBlogTag = async (blogid: number) => Query('DELETE FROM blogTags WHERE blogid = ?', [blogid]);

// const getTag = async (blogid: number) => Query('CALL spGetTagName(?)', [blogid]);
 
// const getAllTags = async () => Query('SELECT name, id FROM tags');

export default {
    createBlogTag,
    deleteBlogTag,
    getTag,
    getAllTags
}