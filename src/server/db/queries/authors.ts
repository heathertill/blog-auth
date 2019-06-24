import { Query } from '../index';

const getAuthId = async (name: string) => Query('CALL spGetAuthId(?)', [name]);
const findOneByEmail = async (email: string) => Query('SELECT * FROM authors WHERE email = ? LIMIT 1', [email]);
const findOneById = async (id: number) => Query('SELECT * FROM authors WHERE id = ?', [id]);


export default {
    getAuthId,
    findOneByEmail,
    findOneById
}