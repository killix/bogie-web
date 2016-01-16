import React from 'react';
import zxcvbn from 'zxcvbn';

const styles = {
    segment: {
        padding: 0
    },
    progress: {
        transform: 'translateY(-100%)'
    }
};

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.onPassword = this.onPassword.bind(this);
        this.state = {
            score: 0,
            warning: '',
            suggestions: []
        };
    }

    onPassword({target: {value}}) {
        const {score, feedback: {warning, suggestions}} = zxcvbn(value);
        this.setState({score, warning, suggestions});
    }

    render() {
        return (
            <form className="ui form">
                <div className="field">
                    <label>Password</label>
                    <div className="two fields">
                        <div className="field">
                            <div className="ui basic segment" style={styles.segment}>
                                <input type="password" onChange={this.onPassword} placeholder="Password" />
                                <div className="ui bottom attached progress" style={styles.progress}>
                                    <div className="bar" style={{
                                        width: `${this.state.score * 25}%`
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui message">
                                <div className="header">{this.state.warning}</div>
                                <ul className="list">
                                    {this.state.suggestions.map(text => <li>{text}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
