import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import relay from './relay';

const app = express();

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Bogie</title>
            </head>
            <body>
                <form method="POST" action="/login">
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <button type="submit">Log In</button>
                </form>
            </body>
        </html>
    `);
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', relay);

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    fetch(`${process.env.BACKEND_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${new Buffer('5682d6ffd06684dc1fd22cfd:everybody').toString('base64')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: '5682d6ffd06684dc1fd22cfd',
            client_secret: 'everybody',
            grant_type: 'password',
            username, password
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }

        throw new Error(`${res.status} ${res.statusText}`);
    }).then(({access_token}) => {
        res.cookie('token', access_token);
        res.redirect('/');
    }).catch(err => {
        console.error(err.stack);
        res.status(500).send(err.message);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
