import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, SetAccessToken, User } from '../../utils/api';

export interface LoginProps extends RouteComponentProps { }

const Login: React.SFC<LoginProps> = ({ history }) => {

    const isLoggedIn = async () => {
        if (User && User.role === 'admin') {
            console.log('is logged in')
            history.push('/')
        } else {
            console.log('nope')
        }
    };

    useEffect(() => { isLoggedIn() }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(true);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let result = await json('/auth/login', 'POST', {
                email,
                password
            });
            console.log('result.role', result.role)
            if (result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role })
                if (result.role === 'admin') {
                    console.log('logstat1', loginStatus)
                    setLoginStatus(true);
                    console.log('logstat2', loginStatus)
                    console.log('admin')
                    history.push('/');
                } else if (result.role === 'guest') {
                    console.log('logstat3', loginStatus);
                    // setLoginStatus(false);
                    console.log('logstat4', loginStatus);
                    console.log('guest');
                    history.push('/');
                }
            } 
        } catch (err) {
            throw err
        }
    };

    const notAllowed = () => {
        if (!loginStatus) {
            return <div className="alert alert-danger p-1 m-3">Invalid Credentials</div>
        }
    };

    return (
        <main className="container">
            <section className="row justify-content-center">
                <div className="col-md-8">
                    <form
                        className="form-group font-open bck-gradient border border-primary rounded shadow-lg mb-0 p-3"
                        onSubmit={(e) => handleLogin(e)}>
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            type="text" name="email" className="form-control" value={email} />
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            type="text" name="password" className="form-control" value={password} />
                        <button
                            type="submit"
                            className="btn btn-primary btn-outline-light mt-3">Login</button>
                        {notAllowed()}
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Login;