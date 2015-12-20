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
                cdn: process.env.CDN_URL
            }, params))
        );
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
