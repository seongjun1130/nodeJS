const express = require('express');
const sequelize = require('./db');
const userRouter = require('./routers/user');

const app = express();
const port = 8080;

// JSON 형태 요청 바디 파싱
app.use(express.json());
// users URL 요청 라우팅
app.use('/users',userRouter);

// DB 모델 동기화, 테이블이 없을시 테이블생성 있을시 유지
sequelize.sync();

// 서버 실행 로그
app.listen(port,()=>{
    console.log(`서버가 http://localhost:${port} 에서 실행 중`);
});