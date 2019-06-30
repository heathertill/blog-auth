import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, User } from '../../utils/api';

export interface AdminProps extends RouteComponentProps<{ id: string }> { }

const Admin: React.SFC<AdminProps> = ({ history, match }) => {

    let id = match.params.id

    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');

    const getBlog = async () => {
        // let r = await fetch(`/api/blogs/${id}`);  // use with knex/json
        let blog = await json(`/api/blogs/${id}`);
        setBlogTitle(blog.title)
        setBlogContent(blog.content)
    }

    useEffect(() => { getBlog(); }, []);

    const handleEdit = async () => {
        let data = {
            title: blogTitle,
            content: blogContent,
        }
        try {
            await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                }
            })
            history.replace('/')
        } catch (err) {
            console.log(err)
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`/api/blogs/${id}`, {
                method: 'DELETE'
            });
            await fetch(`/api/tags/${id}`, {
                method: 'DELETE'
            });
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    };

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlogTitle(e.target.value);
    }

    const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlogContent(e.target.value);
    }

    return (
        <div className="card-deck">
            <div className="card">
                <div className="card-body">
                    <h5><input
                        onChange={handleTitle}
                        className="form-control" type="text" value={blogTitle} /></h5>
                    <input onChange={handleContent} type="text" className="form-control" value={blogContent} />
                    <div>
                        <button
                            onClick={handleEdit}
                            className="btn btn-info">Edit</button>
                        <button
                            onClick={handleDelete}
                            className="btn btn-info">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;