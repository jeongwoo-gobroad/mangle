// PORT info
const dotenv = require('dotenv');
dotenv.config();
const HTTP_PORT = process.env.HTTP_PORT;
const HOST = process.env.HOST||'0.0.0.0';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const { sequelize } = require('./models');
sequelize.sync({ alter: true });

module.exports = {app};

const postController = require('./api/post/postController');
app.use('/posts', postController);

const authRouter = require('./api/auth/authRouter');
app.use('/auth', authRouter);

const contestRouter = require('./api/contest/contestRouter');
app.use('/contests', contestRouter);

const teamPostRouter = require('./api/teamPost/teamPostRouter');
app.use('/teamposts', teamPostRouter);

const messageRouter = require('./api/message/messageRouter');
app.use('/messages', messageRouter);

app.listen(HTTP_PORT, HOST, () => {
    console.log(`server is on http://${HOST}:${HTTP_PORT}`);
});