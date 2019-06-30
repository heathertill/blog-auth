// import { connection as knex } from '../index';
import { Query } from '../index';

const getUserId = (firstname: string) => Query('SELECT id FROM users WHERE firstname = ?', [firstname]);
const findOneByEmail = (email: string) => Query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
const findOneById = (id: number) => Query('SELECT * FROM users WHERE id = ?', [id]);
const insert = (email: string, firstname: string, password: string) => Query('INSERT INTO users (email, firstname, password) VALUES (?, ?, ?)', [email, firstname, password]);


// const getUserId = (name: string) => knex('users').where('firstname', name).select('id');
// const findOneByEmail = (email: string) => knex('users').where('email', email).select().limit(1);
// const findOneById = (id: number) => knex('users').where('id', id).select();
// const insert = (userObject: any) => knex('users').insert(userObject)

export default {
    getUserId,
    findOneByEmail,
    findOneById,
    insert
}
