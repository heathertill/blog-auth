import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import { json, User } from '../../utils/api';
// User object from localStorage - determines if user has something in localStorage(browser)
// is it a token, is it a role, is it a userid validated from our backend authentication

export interface AddBlogProps extends RouteComponentProps { }

export interface AddBlogState {
    id: number,
    firstname: string,
    title: string,
    content: string,
    userid: string,
    tags: { id: number, name: string }[],
    tagid: string,
    blogid: number,

}

class AddBlog extends React.Component<AddBlogProps, AddBlogState> {
    constructor(props: AddBlogProps) {
        super(props);
        this.state = {
            id: null,
            firstname: '',
            title: '',
            content: '',
            userid: '',
            tags: [],
            tagid: '',
            blogid: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createBlogTags = this.createBlogTags.bind(this);
    }
    async componentWillMount() {
        // if (!User || User.userid === null || User.role !== 'admin') {
        //     // working as intended
        //     console.log('admin/addblog  ', 'user not logged in', User)
        //     this.props.history.replace('/login');
        // }
        // else {
            let r = await fetch('/api/tags')
            let tags = await r.json();
            // let tags = await json('/api/tags');  // use with knex/json
            this.setState({ tags });
        // }
    };

    renderTags() {
        return this.state.tags.map(tag => {
            return <option value={tag.id} key={tag.id}>{tag.name}</option>
        })
    }

    async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let firstname = this.state.firstname;
        console.log('comp/admin/add/name', firstname)
        try {
            let r = await fetch(`/api/users/${firstname}`);
            let [userid] = await r.json();
            // let userid = await json(`/api/users/${name}`);  // use with knex/json
            console.log('comp/add/userid', userid[0])
            this.setState(userid);
            if (userid) {
                console.log('comp/add/userid2', userid);
                console.log('comp/add/id', this.state.id);
                let data = { title: this.state.title, content: this.state.content, id: this.state.id }
                // let data: { title: string, content: string, userid: number } = {
                //     title: this.state.title,
                //     content: this.state.content,
                //     userid: 5
                // }
                console.log('comp/admin/add/data', data)
                let r = await fetch('/api/blogs', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json"
                    }
                });
                let info = await r.json();
                // let info = await json('/api/blogs', 'POST', data);  // use with knex/json
                this.setState({ blogid: info.insertId })
                this.createBlogTags();
                this.props.history.push('/');
            } else {
                console.log('no userid')
            }
        } catch (err) {
            console.log(err)
        }
    };

    async createBlogTags() {
        let data = { blogid: this.state.blogid, tagid: this.state.tagid }
        console.log('comp/addblog/data', data)
        try {
            await fetch('/api/tags', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                }
                
            });
            // await json('/api/tags', 'POST', data);  // use with knex/json
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="chirpInput card col-md-8 border p-3 mt-3">
                    <div className="card-body">
                        <div>*** Users: Lhotse, Caroline, Heather, Reid ***</div>
                        <form className="form-group mb-0 p-3">
                            <label htmlFor="name">Name</label>
                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ firstname: e.target.value })}
                                type="text" name="name" className="form-control" value={this.state.firstname} />
                            <label className="mt-2" htmlFor="title">Title</label>
                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}
                                type="text" name="title" className="form-control" value={this.state.title} />
                            <label className="mt-2" htmlFor="content">Content</label>
                            <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })}
                                name="content" className="form-control" value={this.state.content} rows={5} />
                            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ tagid: e.target.value })}
                                className="form-control my-4" value={this.state.tagid} >
                                <option>Select Tag</option>
                                {this.renderTags()}
                            </select>
                            <div>
                                <button onClick={this.handleSubmit}
                                    className="btn btn-primary btn-outline-light"
                                >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddBlog;