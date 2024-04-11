const express = require('express');
const router = express.Router();
const conn = require('../mysql');

router.use(express.json());

// 로그인
/*
{ email, pwd }
*/
router.post('/login', (req, res) => {
  const {email, pwd} = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`
  conn.query(
    sql, email,
    (err, results) => {
      let loginUser = results[0];
      if(loginUser && loginUser.pwd == pwd) {
          res.status(200).json({
            message : `${loginUser.name}님 로그인 되었습니다.`
          })
      }else if((loginUser && loginUser.pwd != pwd)){
          res.status(400).json({
            message: `${loginUser.name}의 패스워드가 일치하지 않습니다.`
          })
      }else{
        res.status(404).json({
          message : `회원 정보가 없습니다.`
        })
      }
    }
  )
})
// 회원가입
// {email, name, pwd, contact}
router.post('/join', (req, res) => {
  if(isExist(req.body)){
    const {email, name, pwd, contact} = req.body;
    const sql = `INSERT INTO users(email, name, pwd, contact) VALUES(?,?,?,?)`;
    const values = [email, name, pwd, contact];
    conn.query(
      sql, values,
      (err, results, fields) => {
        if(results.length) res.status(201).json(results); // results 없음
        else{
          res.status(404).json({
            message : `회원 정보가 없습니다.`
          })
        }
      }
    )
  }else{
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요`
    })
  }
})

router
.route('/users')
  // 회원 조회
  .get((req, res) => {
    // let {userId} = req.body;
    let {email} = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(
      sql, email,
      (err, results) => {
        if(results.length) res.status(200).json(results);
        else{
          res.status(404).json({
            message : `회원 정보가 없습니다.`
          })
        }
      }
    )
  })
  // 회원 삭제
  .delete((req, res) => {
    let {email} = req.body;
    const sql = `DELETE FROM users WHERE email = ?`;
    conn.query(
      sql, email,
      (err, results, fields) => {
        if(results.length) res.status(200).json(results);
        else{
          res.status(404).json({
            message : `회원 정보가 없습니다.`
          })
        }
      }
    ) 
  })

  // -------------
  const isExist = (obj) => {
    if(Object.keys(obj).length !== 0) return true;
    return false;
  }

  // -------------
module.exports = router;