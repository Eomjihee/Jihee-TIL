// express 모듈 세팅
const express = require('express');
const app = express();

app.listen(8080);

const userRouter = require('./routes/users');
const channelRouter = require('./routes/channels');

app.use('/', userRouter);
app.use('/channels', channelRouter);


let db = new Map();
let id = 1; // 객체 유니크하게 구별하기 위함