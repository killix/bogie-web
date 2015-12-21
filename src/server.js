import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
    match,
    RoutingContext
} from 'react-router';

import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';

import router from './router';

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(`${process.env.BACKEND_URL}/graphql`)
);

RelayStoreData.getDefaultInstance().getChangeEmitter().injectBatchingStrategy(() => {
    // NOOP
});

const app = express();

app.use((req, res) => {
    match({
        location: req.url,
        routes: router
    }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302,
                redirectLocation.pathname + redirectLocation.search
            );
        } else if (renderProps) {
            const {containerProps} = renderProps.components.find(
                component => component && component.containerProps
            );

            IsomorphicRelay.prepareData(containerProps).then(data => {
                const reactOutput = ReactDOMServer.renderToString(
                    <RoutingContext {...renderProps} />
                );

                res.status(200).send(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <title>RailCommander</title>
                            <link rel="stylesheet" href="${process.env.CDN_URL}/bundle.css">
                        </head>
                        <body>
                             <main>${reactOutput}</main>
                             <script id="preloadedData" type="application/json">${JSON.stringify(data)}</script>
                             <script src="${process.env.CDN_URL}/bundle.js"></script>
                        </body>
                    </html>
                `);
            });
        } else {
            res.status(404).send('Not found');
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
