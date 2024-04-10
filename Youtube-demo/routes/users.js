// express 모듈 세팅
const express = require('express');
const router = express.Router();

router.use(express.json()); // http 외 모듈 'json' 사용 선언

let db = new Map();
let id = 1; // 객체 유니크하게 구별하기 위함

// 로그인
/*
{ userId, pwd, name }
*/
router.post('/login', (req, res) => {
  // 1. userId가 DB에 저장된 회원인지 확인
  const {userId, pwd} = req.body
  let loginUser;
  db.forEach(data => {
    if(data.userId === userId) loginUser = data
  });
  
  if(!isExist(loginUser)){
    // 유저 없음
    res.status(400).json({
      message: `유저가 존재하지 않습니다.`
    })
  }else if(loginUser.pwd == pwd){
    // 2. pwd 비교
    res.status(200).json({
      
    });
  }else {
    // pwd 불일치
    res.status(400).json({
      message: `${loginUser.name}의 패스워드가 일치하지 않습니다.`
    })
  }
})
// 회원가입
router.post('/join', (req, res) => {
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

router
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

  // -------------
  const isExist = (obj) => {
    if(Object.keys(obj).length !== 0) return true;
    return false;
  }

  // -------------
module.exports = router;