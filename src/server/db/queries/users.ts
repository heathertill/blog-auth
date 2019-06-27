import { connection as knex } from '../index';

const getUserId = (name: string) => knex('blogs').where('authors.name', name).select('authorid').join('authors', 'blogs.authorid', '=', 'authors.id').orderBy('authorid').limit(1);

const findOneByEmail = (email: string) => knex('users').where('email', email).select().limit(1);

const findOneById = (id: number) => knex('users').where('id', id).select();

const insert = (userObject: any) => knex('users').insert(userObject)

// const getUserId = async (name: string) => Query('CALL spGetAuthId(?)', [name]);
// const findOneByEmail = async (email: string) => Query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
// const findOneById = async (id: number) => Query('SELECT * FROM users WHERE id = ?', [id]);
// const insert = async (firstname: string, email: string, password: string) => Query('INSERT INTO users (firstname, email, password) VALUES (?, ?, ?)', [firstname, email, password]);


export default {
    getUserId,
    findOneByEmail,
    findOneById,
    insert
}
