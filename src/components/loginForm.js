import React from 'react';

export default class LoginForm extends React.Component {
    render() {
        return (
            <form className="ui form" method="POST" action="/login">
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password"/>
                </div>
                <button type="submit" className="ui button">Log In</button>
            </form>
        );
    }
}
