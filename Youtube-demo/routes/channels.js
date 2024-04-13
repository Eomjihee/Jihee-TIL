// express 모듈 세팅
const express = require('express');
const router = express.Router();
const conn = require('../mysql');
const {body, param, validationResult} = require('express-validator');

router.use(express.json()); // http 외 모듈 'json' 사용 선언

const validate = (req, res) => {
  const err = validationResult(req);
  if(!err.isEmpty()){
    return res.status(400).json(err.array())
  }
}

router.route('/')
  // 채널 전체 조회
  .get(
    [
      body('userId').notEmpty().isInt().withMessage(`숫자를 입력해주세요.`),
      validate // 콜백함수 호출 전 validate 미들웨어를 동작해 성공 시에만 콜백함수 호출
    ]
    ,(req, res) => {
      let {userId} = req.body;
      let sql = `SELECT * FROM channels WHERE user_id = ?`;
      conn.query(
        sql, userId,
        (err, results, fields) => {
          if(err) return res.status(400).end()

          if(results.length) res.status(200).json(results);
          else notFoundChannel(res);
        }
      )
  })
  // 채널 개별 생성
  .post(
    [
      body('userId').notEmpty().isInt().withMessage(`숫자를 입력해주세요.`),
      body('ch_name').notEmpty().isString().withMessage(`올바른 문자로 입력해주세요.`)
    ],
    (req, res) => {
      const err = validationResult(req);
      if(!err.isEmpty()){
        // 종료
        // console.error(`[code error] ${err.array()}`);
        return res.status(400).json(err.array())
      }

      const {chName, userId} = req.body;
      const sql = `INSERT INTO channels(ch_name, user_id) VALUES(?,?)`;
      const values = [chName, userId];
      conn.query(
        sql, values,
        (err, results, fields) => {

          // if(err) throw err
          if(err) {
            return res.status(400).end()
          }
          res.status(201).json(results);
        }
      )
      
  })

router.route('/:id')
// 채널 개별 조회
  .get(param('chId').notEmpty().withMessage('chId 값이 필요'),(req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
      return res.status(400).json(err.array())
    }
    
    let {chId} = req.params
    chId = parseInt(chId);
    
    let sql = `SELECT * FROM channels WHERE ch_id = ?`;
    conn.query(
      sql, chId,
      (err, results, fields) => {
        if(err) return res.status(400).end()

        if(results.length) res.status(200).json(results);
        else notFoundChannel(res);
      }
    )
  })
// 채널 개별 수정
  .put([
    param('chId').notEmpty().withMessage('chId 값이 필요'),
    body('chName').notEmpty().isString().withMessage('채널명 오류')
  ]
  ,(req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
      return res.status(400).json(err.array())
    }
    let {id} = req.params
    id = parseInt(id);
    let chName = req.body;

    let sql = `UPDATE channels SET name = ? WHERE ch_id = ?`;
    let values = [chName, chId];
    conn.query(
      sql, values,
      (err, results, fields) => {
        if(err) return res.status(400).end()
        if(results.affectedRows == 0) {
          return res.status(400).end()
        }else{
          res.status(200).json(results)
        }
      }
    )

  })
// 채널 개별 삭제
  .delete(param('chId').notEmpty().withMessage('chId 값이 필요'),(req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
      return res.status(400).json(err.array())
    }
    let {chId} = req.params
    chId = parseInt(chId);

    const sql = `DELETE FROM channels WHERE ch_id = ?`;
    conn.query(
      sql, id,
      (err, results, fields) => {
        if(err) return res.status(400).end()
        if(results.affectedRows == 0) {
          return res.status(400).end()
        }else{
          res.status(200).json(results)
        }
      }
    )
  })


// --------------------
let notFoundChannel = (res) => {
  res.status(404).json({
    message : `채널 정보를 찾을 수 없습니다.`
  })
}

module.exports = router;