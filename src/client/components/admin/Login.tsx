import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, SetAccessToken } from '../../utils/api';

export interface LoginProps extends RouteComponentProps { }

const Login: React.SFC<LoginProps> = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('email1', email);
            console.log('password1', password)
            let result = await json('/auth/login', 'POST', {
                email,
                password
            });
            console.log('admin/login/result ', result)
            if (result) {
                console.log('comp/login/result', result);
                console.log('comp/login/results...', result.token, result.userid, result.role);
                if (result.role === 'role') {
                    history.push('/admin');
                } else {
                    history.push('/');
                }
            } else {
                // checking a login status
            }
        } catch (err) {
            throw err
        }
    };
    

    return (
        <main className="container">
            <section className="row">
                <div className="col-md-8">
                    <form
                        className="form-group border border-primary rounded shadow-lg mb-0 p-3"
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
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Login;