import { connection as knex } from '../index';

// const all = async () => Query("SELECT b.id, a.name, b.title, b.content, DATE_FORMAT(b._created, '%M %d, %Y') AS _created FROM blogs b JOIN users a ON a.id= b.userid ORDER BY b._created DESC");

// const all = async () => Query('SELECT * FROM blogs')

// const one = async (id: number) => Query('SELECT * FROM blogs WHERE id = ?', [id])

// const one = async (id: number) => Query('CALL spGetBlog(?)', [id]);

// const createBlog = async (title: string, content: string, userid: number) => Query('INSERT INTO blogs (title, content, userid) VALUES (?, ?, ?)', [title, content, userid]);

// const updateBlog = async (title: string, content: string, id: number) => Query('UPDATE blogs SET title = ? WHERE id = ?', [title, content, id]);

// const deleteBlog = async (id: number) => Query('DELETE FROM blogs WHERE id = ?', [id]);


const all = () => knex('blogs').select('blogs.id', 'users.firstname', 'blogs.title', 'blogs.content', 'blogs._created').join('users', 'blogs.userid', '=', 'users.id').orderBy('_created', 'desc');
const one = (id: number) => knex('blogs').select('blogs.id', 'users.firstname', 'blogs.title', 'blogs.content', 'blogs._created').join('users', 'blogs.userid', '=', 'users.id').where('blogs.id', id);
const createBlog = (blogObject: any) => knex('blogs').insert(blogObject);
const updateBlog = (blogObject: any, id: number) => knex('blogs').where('id', '=', id).update(blogObject);
const deleteBlog = (id: number) => knex('blogs').where('id', id).del();




export default {
    all,
    one,
    createBlog,
    updateBlog,
    deleteBlog
}