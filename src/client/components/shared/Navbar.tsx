import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { __RouterContext } from 'react-router';
import { Link } from 'react-router-dom';
import { Tag } from '../public/OneBlog';
import { User } from '../../utils/api';

export interface NavbarProps { }

const Navbar: React.SFC<NavbarProps> = () => {

    const { history } = useContext(__RouterContext);
    const [tags, setTags] = useState<Tag[]>([]);

    const getTags = async () => {
        try {
            let r = await fetch('/api/tags')
            let tags = await r.json()
            setTags(tags)
        } catch (err) {
            console.log(err)
        }
    };

    const renderAddBlog = () => {
    if (User && User.role === 'admin') {
        return <Link className="text-white mr-3" to="/add">Add Blog</Link>
    }
}

    useEffect(() => { getTags(); renderAddBlog() }, []);

    const [id, setid] = useState(undefined);

    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setid(e.target.value)
        if (e.target.value === "0") {
            return;
        } else {
            history.push(`/showTags/${e.target.value}`)
        }
    };

    return (
        <div className="card  blog-head sticky-top border-dark rounded my-5 bg-info shadow-lg">
            <nav className="navbar navbar-expand-md ">
                <div className="navbar">
                    <ul className="navbar-nav  justify-content-right">
                        <li className="nav-item">
                            <Link className="text-white mr-3" to="/login">Admin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-white mr-3" to="/">All Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-white mr-3" to="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown mr-3">
                            <select
                                onChange={handleSelect} value={id}
                                className="dropdown-item bg-info text-white">
                                <option className="dropdown-item text-white bg-dark">Select Tag</option>
                                {tags.map(tag => {
                                    return (
                                        <option className="bg-dark" key={tag.id} value={tag.id}>{tag.name}</option>
                                    )
                                })}
                            </select>
                        </li>
                        <li className="nav-item">
                            {renderAddBlog()}
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="row justify-content-md-center">
                <div className="header col-md-12 p-2">
                    <p className="text-center  mb-4">Our Crazy Life!</p>
                </div>
            </div>
        </div>
    );
}

export default Navbar;