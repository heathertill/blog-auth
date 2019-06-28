import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './scss/app';

import Navbar from './components/shared/Navbar';
import AllBlogs from './components/public/AllBlogs';
import OneBlog from './components/public/OneBlog';
import Admin from './components/admin/Admin';
import AddBlog from './components/admin/AddBlog';
import About from './components/shared/About';
import ShowTags from './components/public/ShowTags';

const App: React.SFC<AppProps> = props => {
    return (
        <BrowserRouter>
            <main className="container">
                <Navbar />
                <Switch>
                    <Route exact path='/' component={AllBlogs} />
                    <Route exact path='/blogs/:id' component={OneBlog} />
                    <Route exact path='/:id/admin' component={Admin} />
                    <Route exact path='/add' component={AddBlog} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/showTags/:id' component={ShowTags} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;

export interface AppProps { }