import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';


export interface AddBlogProps extends RouteComponentProps { }

export interface AddBlogState {
    id: number,
    name: string,
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
            name: '',
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
        let r = await fetch('/api/tags');
        let tags = await r.json();
        this.setState({ tags });
    };

    renderTags() {
        return this.state.tags.map(tag => {
            return <option value={tag.id} key={tag.id}>{tag.name}</option>
        })
    }

    async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let name = this.state.name;
        try {
            let r = await fetch(`/api/users/${name}`);
            let userid = await r.json();
            this.setState(userid);
        } catch (err) {
            console.log(err)
        } finally {
            let data = { title: this.state.title, content: this.state.content, userid: this.state.id }
            let r = await fetch('api/blogs/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let info = await r.json();
            this.setState({ blogid: info })
            this.createBlogTags();
            this.props.history.push('/');
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
                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
                                type="text" name="name" className="form-control" value={this.state.name} />
                            <label className="mt-2" htmlFor="title">Title</label>
                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}
                                type="text" name="title" className="form-control" value={this.state.title} />
                            <label className="mt-2" htmlFor="content">Content</label>
                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ content: e.target.value })}
                                type="text" name="content" className="form-control" value={this.state.content} />
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