import { Query } from '../index';

const getUserId = async (name: string) => Query('CALL spGetAuthId(?)', [name]);
const findOneByEmail = async (email: string) => Query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
const findOneById = async (id: number) => Query('SELECT * FROM users WHERE id = ?', [id]);
const insert = async (user: any) => Query('INSERT INTO users (firstname, email, password) VALUES (?, ?, ?)', [user]);


export default {
    getUserId,
    findOneByEmail,
    findOneById,
    insert
}
