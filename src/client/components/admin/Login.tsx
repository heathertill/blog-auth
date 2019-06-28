import * as React from 'react';
import { useState, useEffect } from 'react';

export interface LoginProps {

}

const Login: React.SFC<LoginProps> = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

    }


    return (
        <div className="row">
            <div className="col-md-8">
                <div className="card">
                    <form action="" className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" className="form-control" value={email} />
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" className="form-control" value={password} />

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;