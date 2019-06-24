let config = require('../../../config');
let Connection = config.Connection;
import { Query } from './index';
import { rejects } from 'assert';


// const createBlogTag = async (blogid: number, tagid: number) => Query('INSERT INTO blogTags (blogid, tagid) VALUES (?, ?)', [blogid, tagid]);
// const getTag = async (blogid: number) => Query('CALL spGetTagName(?)', [blogid]);
// const getAllTags = async () => Query('SELECT name, id FROM tags');

export const getAllTags = async () => {
    let query = 'SELECT name, id FROM tags';
    return new Promise((resolve, reject) => {
        Connection.query(query, (err: any, results: any) => {
            if (err) {
                return reject(err)
            } resolve(results)
        })
    })
}

export const getTag = async (blogid: number) => {
    let query = 'CALL spGetTagName(?)';
    return new Promise((resolve, reject) => {
        Connection.query(query, [blogid], (err: any, results: any) => {
            if (err) {
                return reject(err);
            } resolve(results);
        })
    })
}

export const createBlogTag = async (blogid: number, tagid: number) => {
    let query = 'INSERT INTO blogTags (blogid, tagid) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        Connection.query(query, [blogid, tagid], (err: any, results: any) => {
            if (err) {
                return reject(err)
            } resolve(results)
        })
    })
}

export const deleteBlogTag = async (blogid: number) => {
    let query = 'DELETE FROM blogTags WHERE blogid = ?';
    return new Promise((resolve, reject) => {
        Connection.query(query, [blogid], (err: any, results: any) => {
            if (err) {
                return reject(err)
            } resolve (results)
        })
    })
}



export default {
    createBlogTag,
    getTag,
    getAllTags,
    deleteBlogTag
}