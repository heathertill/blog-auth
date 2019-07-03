import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { Blog } from './AllBlogs'
import { json } from '../../utils/api';

export interface ShowTagsProps extends RouteComponentProps<{ id: string }> { }

const ShowTags: React.SFC<ShowTagsProps> = (props) => {

    const [blogs, setBlogs] = useState<Blog[]>([])

    const getBlog = async () => {
        let id = props.match.params.id
        try {
            let blogs = await json(`/api/alltags/${id}`);
            setBlogs(blogs)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getBlog() }, [props.match.params.id]);

    return (
        <div className="row">
            {blogs.map(blog => {
                return (
                    <article className="col-md-4 p-2" key={blog.id}>
                        <div className="card-deck show-card  m-1">
                            <div className="card show-tags m-2 border-dark rounded">
                                <div className="card-body bck-gradient">
                                    <h3 className="card-title pt-2 blog-title">{blog.title}</h3>
                                    <p className="card-text blog-content ml-2">{blog.content}...</p>
                                    <p className="card-text ml-2">{moment(blog._created).format('MMMM Do, YYYY')}</p>
                                </div>
                                <div className="card-footer">
                                    <Link to={`/blogs/${blog.id}`} className="btn btn-primary text-white shadow btn-block mx-auto" >View Blog</Link>
                                </div>
                            </div>
                        </div>
                    </article>
                )
            })}
        </div>
    );
}

export default ShowTags;