// app.js
require('dotenv').config({ path: './db/dbSetting.env' })

const express = require('express');
const app = express();
const mysql = require('./db.js');

/** Middleware */
app.use(express.json());
app.use(express.urlencoded({extended : false}));

/** Listen */
app.listen(3000, () => {
  console.log('Server start!, http://localhost:3000');
});

/** Routing */
app.get('/', (res, req) => {
  req.send('기본경로 페이지');
});

// 1. 전체조회
app.get('/board', async (res, req) => {
  let list = await mysql.executeQuery('boardList');
  req.json(list);
});

// 2. 단건조회
app.get('/board/:no', async (res, req) => {
  let boardNo = res.params.no;
  let info = (await mysql.executeQuery('boardInfo', boardNo))[0];
  req.json(info);
});

// 3. 등록
app.post('/board', async (res, req) => {
  let data = res.body.param;
  let board = await mysql.executeQuery('boardInsert', data);
  req.json(board)
});

// 4. 수정
app.put('/board/:no', async (req, res) => {
  let result = await updateAll(req);
  res.json(result);
});

async function updateAll(req) { // 수정_ver.1
  let data = [req.body.param, req.params.no]; // [객체, 단일값u_id]
  let result = await mysql.executeQuery('boardUpdateAll', data);
  return result;
};