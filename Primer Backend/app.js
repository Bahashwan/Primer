require('@babel/register');
const express = require('express');

const session = require('express-session');
const serverConfig = require('./config/serverConfig');
const sessionConfig = require('./config/sessionConfig');

const app = express();

const PORT = 3000;

serverConfig(app);
app.use(session(sessionConfig));

const indexRouter = require('./routes/index.route');

app.use('/', indexRouter);

app.listen(PORT, () => { console.log(`Наш прекрасный сервер трудиться на  ${PORT} порту`); });
