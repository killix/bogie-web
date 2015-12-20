import express from 'express';
import path from 'path';
import dot from 'dot';
import renderView from './view';

const templates = dot.process({
    path: path.join(__dirname, '..', 'views')
});

const app = express();

app.get('/', (req, res) => {
    renderView().then(params => {
        res.send(
            templates.root(Object.assign({
                cdn: 'http://192.168.1.16:8080'
            }, params))
        );
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
