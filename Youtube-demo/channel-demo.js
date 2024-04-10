// express 모듈 세팅
const express = require('express');
const { message } = require('statuses');
const app = express();
app.listen(8080);
app.use(express.json()); // http 외 모듈 'json' 사용 선언

let db = new Map();
let id = 1; // 객체 유니크하게 구별하기 위함

app.route('/channels')
  // 채널 전체 조회
  .get((req, res) => {
    if(db.size) {
      res.status(200).json([...db.values()])
    }else{
      res.status(404).json({
        message : `조회할 채널이 존재하지 않습니다.`
      })
    }
  })
  // 채널 개별 생성
  .post((req, res) => {
    if(req.body.channelTitle) {
      db.set(id++, req.body);
      res.status(201).json({
        message : `${db.get(id-1).channelTitle} 채널을 응원합니다.`
      })
    }else{
      res.status(400).json({
        message : `올바른 요청 값이 아닙니다.`
      })
    }
  })

app.route('/channels/:id')
// 채널 개별 조회
  .get((req, res) => {
    let {id} = req.params
    id = parseInt(id);
    if(db.get(id)){
      res.status(200).json({...db.get(id)})
    }else{
      res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
      })
    }

  })
// 채널 개별 수정
  .put((req, res) => {
    let {id} = req.params
    id = parseInt(id);

    let channel = db.get(id);
    let oldTitle = channel.channelTitle;

    if(channel) {
      let newTitle = req.body.channelTitle;
      channel.channelTitle = newTitle;
      db.set(id, channel);

      res.status(200).json({
        message : `${oldTitle} 채널명이 ${newTitle} 채널명으로 정상 수정되었습니다.`
      })
    }else{
      res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
      })
    }
  })
// 채널 개별 삭제
  .delete((req, res) => {
    let {id} = req.params
    id = parseInt(id);

    let channel = db.get(id);
    if(channel) {
      db.delete(id)
      res.status(200).json({
        message : `${channelTitle}이 정상적으로 삭제되었습니다.`
      })
    }else{
      res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
      })
    }
    res.status().json({
      
    })
  })