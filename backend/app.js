// PORT info
const dotenv = require('dotenv');
dotenv.config();
const HTTP_PORT = process.env.HTTP_PORT;
const HOST = process.env.HOST||'0.0.0.0';

const express = require('express');
const cors = require('cors');
const path = require("path")
const corsOptions = {
  origin: '*', // 모든 origin 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


const app = express();
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(express.json());
app.use(cors(corsOptions));
const { sequelize } = require('./models');



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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

sequelize.sync({force: false})
  .then(() => {
    console.log("✅ DB synced");
    app.listen(HTTP_PORT, () => {
      console.log(`✅ server is on http://${HOST}:${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB sync error:", err);
  });