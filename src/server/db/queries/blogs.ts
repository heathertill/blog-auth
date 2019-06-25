import { Query } from '../index';

// const all = async () => Query("SELECT b.id, a.name, b.title, b.content, DATE_FORMAT(b._created, '%M %d, %Y') AS _created FROM blogs b JOIN users a ON a.id= b.userid ORDER BY b._created DESC");

const all = async () => Query('SELECT * FROM blogs')

const one = async (id: number) => Query('SELECT * FROM blogs WHERE id = ?', [id])

// const one = async (id: number) => Query('CALL spGetBlog(?)', [id]);

// const createBlog = async (title: string, content: string, userid: number) => Query('INSERT INTO blogs (title, content, userid) VALUES (?, ?, ?)', [title, content, userid]);

// const updateBlog = async (title: string, content: string, id: number) => Query('UPDATE blogs SET title = ? WHERE id = ?', [title, content, id]);

// const deleteBlog = async (id: number) => Query('DELETE FROM blogs WHERE id = ?', [id]);


export default {
    all,
    one,
    // createBlog,
    // updateBlog,
    // deleteBlog
}