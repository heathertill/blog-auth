import { connection as knex } from '../index';

const getUserId = (name: string) => knex('blogs').where('authors.name', name).select('authorid').join('authors', 'blogs.authorid', '=', 'authors.id').orderBy('authorid').limit(1);

const findOneByEmail = (email: string) => knex('users').where('email', email).select().limit(1);

const findOneById = (id: number) => knex('users').where('id', id).select();

const insert = (userObject: any) => knex('users').insert(userObject)

export default {
    getUserId,
    findOneByEmail,
    findOneById,
    insert
}
