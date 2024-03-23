// express 모듈 세팅
const express = require('express');
const app = express();
app.listen(8080);

// 데이터 세팅
const youtuber1 = {
  chTitle : '유튜버1',
  subNum : 12000,
  videoNum : 230
}
const youtuber2 = {
  chTitle : '유튜버2',
  subNum : 200,
  videoNum : 26
}
const youtuber3 = {
  chTitle : '유튜버3',
  subNum : 1200,
  videoNum : 32
}

const db = new Map();
let id = 1;

db.set(id++,youtuber1);
db.set(id++,youtuber2);
db.set(id++,youtuber3);

// REST API 설계
// 전체 조회
app.get('/youtubers', (req, res)=> {
  res.json({
    message : 'test'
  })
})
// 개별 조회
app.get('/youtubers/:id', (req, res) => {
  let {id} = req.params;
  id = parseInt(id);

  const youtuber = db.get(id);
  res.json(youtuber === undefined ? 
    {message : '유튜버 정보를 찾을 수 없습니다.'} : youtuber);
});

app.use(express.json()); // http 외 모듈인 미들웨어 JSON을 설정

// 삽입
app.post('/test',(req, res) => {
  console.log(req.body);
  db.set(id++, req.body);
  res.json({
    message: `[${db.get(id-1  ).chTitle}] 채널 유튜버 등록 완료.`
  });
})