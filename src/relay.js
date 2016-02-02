import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
    createLocation
} from 'history';
import {
    match
} from 'react-router';

import IsomorphicRouter from 'isomorphic-relay-router';
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';

import cookieDough from 'cookie-dough';

import routes from './router';

class ServerNetworkLayer extends Relay.DefaultNetworkLayer {
    getLayer(token) {
        return new Relay.DefaultNetworkLayer(this._uri, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    sendMutation(request) {
        return this.getLayer(request._mutation.__variables__.token).sendMutation(request);
    }

    sendQueries(request) {
        return Promise.all(request.map(query =>
            this.getLayer(query._query.__variables__.token).sendQueries([query])
        ));
    }
}

Relay.injectNetworkLayer(
    new ServerNetworkLayer(`${process.env.BACKEND_URL}/graphql`)
);

RelayStoreData.getDefaultInstance().getChangeEmitter().injectBatchingStrategy(() => {
    // NOOP
});

export default (req, res) => {
    match({
        location: createLocation(req.url, {
            cookies: cookieDough(req)
        }),
        routes
    }, async (error, redirectLocation, renderProps) => {
        try {
            if (error) {
                throw error;
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                const data = await IsomorphicRouter.prepareData(renderProps);
                const reactOutput = ReactDOMServer.renderToString(
                    <IsomorphicRouter.RouterContext {...renderProps} />
                );

                res.status(200).send(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <title>Bogie</title>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.7/semantic.min.css">
                            <link rel="stylesheet" href="${process.env.CDN_URL}/bundle.css">
                        </head>
                        <body>
                            <main class="ui container">${reactOutput}</main>
                            <script id="preloadedData" type="application/json">${JSON.stringify(data)}</script>
                            <script src="${process.env.CDN_URL}/bundle.js"></script>
                        </body>
                    </html>
                `);
            } else {
                res.status(404).send('Not Found');
            }
        } catch (err) {
            console.error(err.stack);
            res.status(500).send(err.message);
        }
    });
};
