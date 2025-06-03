require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/AuthMiddleware');
const userRouter = require('./routers/user');

const db = require("./models");

const app = express();
const port = 8080;

// JSON 형태 요청 바디 파싱
app.use(express.json());
app.use(cookieParser());

app.use(authMiddleware);
// users URL 요청 라우팅
app.use('/users', userRouter);

// DB 모델 동기화, 테이블이 없을시 테이블생성 있을시 유지
db.sequelize.sync().then(() => {
    console.log("db connecting...");
})
    .catch(console.error);

// 서버 실행 로그
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중`);
});