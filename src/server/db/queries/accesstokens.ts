import { connection as knex } from '../index';

const findOne = (id: string, token: string) => knex('accesstokens').where('id', id).andWhere('token', token).select();

const insert = (userid: number) => knex('accesstokens').insert(userid);

const update = (id: number, token: string) => knex('accesstokens').where('id', id).update('token', token);


// const findOne = async (id: string, token: string) => Query('SELECT * FROM accesstokens WHERE id = ? AND token = ?', [id, token]);

// const insert = async (userid: number) => Query('INSERT INTO accesstokens (userid) VALUES (?)', [userid]);

// const update = async (id: number, token: string) => Query('UPDATE accesstokens SET token = ? WHERE id = ?', [token, id]);

export default {
    findOne,
    insert,
    update
}
