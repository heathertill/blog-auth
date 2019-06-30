import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { Blog } from './AllBlogs';
// import { json } from '../../utils/api';

export interface OneBlogProps extends RouteComponentProps<{ id: string }> { }

export interface Tag {
    id: number, name: string
}

const OneBlog: React.FC<OneBlogProps> = ({ history, match: { params: { id } } }) => {

    const [blog, setBlog] = useState<Blog>({
        id: null,
        firstname: null,
        title: null,
        content: null,
        _created: null,
        userid: null,
    });

    const [tag, setTag] = useState<Tag>({
        id: null,
        name: ''
    });



    const getBlog = async () => {
        try {
            let r = await fetch(`/api/blogs/${id}`);
            let blog = await r.json();
            // let blog = await json(`/api/blogs/${id}`);  // use with knex/json
            setBlog(blog);
            console.log('public/oneb/blog', blog)

            let r2 = await fetch(`/api/tags/${id}`)
            let tag = await r2.json();
            // let tag = await json(`/api/tags/${id}`);  // use with knex/json
            setTag(tag);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => { getBlog() }, [id]);

    return (
        <div className="row justify-content-center">
            <div className="col-md-10 mx-5">
                <div className="card border border-dark rounded">
                    <div className="card-body" key={blog.id}>
                        <h3 className="card-title mb-0">{blog.title}</h3>
                        <p className="card-text ml-2">by {blog.firstname}</p>
                        <p className="card-text ml-2">{blog.content}</p>
                        <p className="card-text ml-2">{moment(blog._created).format('MMMM Do, YYYY')}</p>
                        <h4><span className="badge badge-info">{tag.name}</span></h4>
                        <div>
                            <Link className="btn btn-warning shadow btn-block mx-auto" to={`/${id}/admin`}>Options</Link>
                            <button onClick={() => history.goBack()} className="btn btn-warning shadow btn-block mx-auto">Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OneBlog;