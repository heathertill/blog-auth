import { Query } from './index';
let config = require('../../../config');
let Connection = config.Connection;

export const one = async (id: number) => {
    let query = 'CALL spGetBlog(?)';
    return new Promise((resolve, reject) => {
        Connection.query(query, [id], (err: any, results: any) => {
            if (err) {
                return reject(err);
            } resolve(results);
        })
    })
}

export const all = async () => {
    let query = "SELECT b.id, a.name, b.title, b.content, DATE_FORMAT(b._created, '%M %d, %Y') AS _created FROM blogs b JOIN authors a ON a.id= b.authorid ORDER BY b._created DESC";
    return new Promise((resolve, reject) => {
        Connection.query(query, (err: any, results: any) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        })
    })
}


export const createBlog = async (title: string, content: string, authorid: number) => {
    let query = 'INSERT INTO blogs (title, content, authorid) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        Connection.query(query, [title, content, authorid], (err: any, results: any) => {
            if (err) {
                return reject(err);
            } resolve(results);
        })
    })
}

export const updateBlog = async (title: string, content: string, id: number) => {
    let query = 'UPDATE blogs SET title = ?, content = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        Connection.query(query, [title, content, id], (err: any, results: any) => {
            if (err) {
                return reject(err);
            } resolve(results)
        })
    })
}

export const deleteBlog = async (id: number) => {
    let query = 'DELETE FROM blogs WHERE id = ?';
    return new Promise((resolve, reject) => {
        Connection.query(query, [id], (err: any, results: any) => {
            if (err) {
                return reject(err);
            } resolve(results)
        })
    })
}


// const all = async () => Query("SELECT b.id, a.name, b.title, b.content, DATE_FORMAT(b._created, '%M %d, %Y') AS _created FROM blogs b JOIN authors a ON a.id= b.authorid ORDER BY b._created DESC");
// const one = async (id: number) => Query('CALL spGetBlog(?)', [id]);
// const createBlog = async (title: string, content: string, authorid: number) => Query('INSERT INTO blogs (title, content, authorid) VALUES (?, ?, ?)', [title, content, authorid]);
// const updateBlog = async (title: string, id: number) => Query('UPDATE blogs SET title = ? WHERE id = ?', [title, id]);
// const deleteBlog = async (id: number) => Query('DELETE FROM blogs WHERE id = ?', [id]);








export default {
    all,
    one,
    createBlog,
    updateBlog,
    deleteBlog
}