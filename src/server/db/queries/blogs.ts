import { connection as knex } from '../index';
// import { Query } from '../index';

// const all = () => Query('SELECT b.id, u.firstname, b.title, b.content, b._created FROM blogs b JOIN users u ON b.userid = u.id ORDER BY b._created DESC')
// const one = (id: number) => Query('SELECT b.id, u.firstname, b.title, b.content, b._created FROM blogs b JOIN users u ON b.userid = u.id WHERE b.id = ? ORDER BY b._created DESC', [id]);
// const createBlog = (title: string, content: string, userid: number) => Query('INSERT INTO blogs (title, content, userid) VALUES (?, ?, ?)', [title, content, userid])
// const updateBlog = async (title: string, content: string, id: number) => Query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id]);
// const deleteBlog = async (id: number) => Query('DELETE FROM blogs WHERE id = ?', [id]);

const all = () => knex('blogs').select('blogs.id', 'users.firstname', 'blogs.title', 'blogs.content', 'blogs._created').join('users', 'blogs.userid', '=', 'users.id').orderBy('_created', 'desc');
const one = (id: number) => knex('blogs').select('blogs.id', 'users.firstname', 'blogs.title', 'blogs.content', 'blogs._created', 'blogs.userid').join('users', 'blogs.userid', '=', 'users.id').where('blogs.id', id);
const createBlog = (blogObject: any, userid: string) => knex('blogs').insert(blogObject, userid);
const updateBlog = (blogObject: any, id: number) => knex('blogs').where('id', '=', id).update(blogObject);
const deleteBlog = (id: number) => knex('blogs').where('id', id).del();

export default {
    all,
    one,
    createBlog,
    updateBlog,
    deleteBlog
}