import { connection as knex } from '../index';

const allOneTag = (id: number) => knex('blogs').where('blogTags.tagid', id).select().join('blogTags', 'blogs.id', '=', 'blogtags.blogid')

export default {
    allOneTag
}