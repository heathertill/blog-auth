import { connection as knex } from '../index';

const allOneTag = (id: number) => knex('blogs').where('blogTags.tagid', id).select().join('blogTags', 'blogs.id', '=', 'blogtags.blogid')


// const allOneTag = async (id: number) => Query('SELECT * FROM blogs b JOIN blogTags bt ON b.id = bt.blogid WHERE bt.tagid = ?', [id]);

export default {
    allOneTag
}