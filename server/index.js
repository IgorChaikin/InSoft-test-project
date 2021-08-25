const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const api = require('./routers/api');
const main = require('./routers/main');
const auth = require('./routers/auth');
const admin = require('./routers/admin');
const createApp = require('./app');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const port = process.env.PORT || 8080;
const dbConn = process.env.DB_CONN;
const cookieKey = process.env.COOKIE_KEY;

createApp(dbConn, cookieKey).then((app) => {
  app.use(express.json());
  app.use(cookieParser(cookieKey));

  // routing
  app.use('/api', api);
  app.use('/auth', auth);
  app.use('/admin', admin);
  app.use('/', main);

  // give static
  app.use(express.static(path.join(__dirname, '../dist')));
  app.use(express.static(path.join(__dirname, '../static')));
  app.use(express.static(path.join(__dirname, '../static/media')));
  app.use(express.static(path.join(__dirname, '../static/svg')));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
