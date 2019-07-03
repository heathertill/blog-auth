import { connection as knex } from '../index';
// import { Query } from '../index';

// const findOne = (id: string, token: string) => Query('SELECT * FROM accesstokens WHERE id = ? AND token = ?', [id, token]);
// const insert = (userid: number) => Query('INSERT INTO accesstokens (userid) VALUES (?)', [userid]);
// const update = (id: number, token: string) => Query('UPDATE accesstokens SET token = ? WHERE id = ?', [token, id])


const findOne = (id: string, token: string) => knex('accesstokens').where('id', id).andWhere('token', token).select();
const insert = (userid: number) => knex('accesstokens').insert({userid});
const update = (id: number, token: string) => knex('accesstokens').where('id', id).update('token', token);

export default {
    findOne,
    insert,
    update
}
