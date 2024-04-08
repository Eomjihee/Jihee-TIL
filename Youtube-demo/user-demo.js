// express 모듈 세팅
const express = require('express');
const { message } = require('statuses');
const app = express();
app.listen(8080);
app.use(express.json()); // http 외 모듈 'json' 사용 선언

let db = new Map();
let id = 1; // 객체 유니크하게 구별하기 위함

// 로그인
app.post('/login', (req, res) => {

})
// 회원가입
app.post('/join', (req, res) => {
  if(req.body && Object.keys(req.body).length){
    db.set(id++, req.body);
    res.status(201).json({
      message: `${db.get(id-1).name}님 환영합니다.`
    })

  }else{
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요`
    })
  }
})

app
  .route('/users/:id')
  .get((req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const user = db.get(id);
    if(user == undefined){
      res.status(404).json({
        message : `회원 정보가 없습니다.`
      })
    }else{
      res.status(200).json({
        userId : user.userId,
        name : user.name
      })
    }
  })
  .delete((req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const user = db.get(id);
  
    if(user == undefined){
      res.status(404).json({
        message : `회원 정보가 없습니다.`
      })
    }else{
      db.delete(id);
      res.status(200).json({
        message : `${user.name}님 다음에 만나요.`
      })
    }
  })

// 회원 개별 조회
// app.get('/users/:id', (req, res) => {
//   let {id} = req.params;
//   id = parseInt(id);
//   const user = db.get(id);
//   if(user == undefined){
//     res.status(404).json({
//       message : `회원 정보가 없습니다.`
//     })
//   }else{
//     res.status(200).json({
//       userId : user.userId,
//       name : user.name
//     })
//   }
// })

// 회원 개별 탈퇴
// app.delete('/users/:id', (req, res) => {
//   let {id} = req.params;
//   id = parseInt(id);
//   const user = db.get(id);

//   if(user == undefined){
//     res.status(404).json({
//       message : `회원 정보가 없습니다.`
//     })
//   }else{
//     db.delete(id);
//     res.status(200).json({
//       message : `${user.name}님 다음에 만나요.`
//     })
//   }
// })