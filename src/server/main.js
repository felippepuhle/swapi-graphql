/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE-examples file in the root directory of this source tree.
 */

import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import swapiSchema from '../schema';

const app = express();
app.use(cors());

// Requests to /graphql redirect to /
app.all('/graphql', (req, res) => res.redirect('/'));

app.use(
  '/',
  graphqlHTTP(() => ({
    schema: swapiSchema,
    graphiql: true,
  })),
);

// Listen for incoming HTTP requests
const port = process.env.PORT || 5000;
const listener = app.listen(port, () => {
  let host = listener.address().address;
  if (host === '::') {
    host = 'localhost';
  }
  /* eslint-disable no-console */
  console.log('Listening at http://%s%s', host, port === 80 ? '' : ':' + port);
  /* eslint-enable no-console */
});
