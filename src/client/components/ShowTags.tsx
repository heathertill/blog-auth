import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Blog } from './AllBlogs'

export interface ShowTagsProps extends RouteComponentProps<{ id: string }> { }

const ShowTags: React.SFC<ShowTagsProps> = (props) => {

    const [blogs, setBlogs] = useState<Blog[]>([])

    const getBlog = async () => {
        let id = props.match.params.id
        try {
            let r = await fetch(`/api/alltags/${id}`);
            let blogs = await r.json();
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
                        <div className="card-deck m-1">
                            <div className="card show-tags m-2 border-dark rounded">
                                <div className="card-body">
                                    <h3 className="card-title pt-2 blog-title">{blog.title}</h3>
                                    <p className="card-text blog-content ml-2">{blog.content}...</p>
                                    <p className="card-text ml-2">{blog._created}</p>
                                </div>
                                <div className="card-footer">
                                    <Link to={`/blogs/${blog.id}`} className="btn btn-warning shadow btn-block mx-auto" >View Blog</Link>
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