import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import relay from './relay';

const app = express();

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(cookieParser());

app.get('*', relay);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    fetch(`${process.env.BACKEND_URL}/token`, {
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
