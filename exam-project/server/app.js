require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();

app.use( // json parser
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

const db = require("./db.js"); // db값을 받아오기 위함
// REST API 기준

/** 라우팅 -> 자원명으로 이름을 지음 */
//전체조회
app.get("/boards", async (request, response) => {
  let result = await db.connection('boardList'); // DB처리는 비동기, 동기적으로 처리되어야해서 await 필요
  response.send(result); // 포괄적인 처리
  // response.json(result);
});

//단건조회
app.get("/boards/:bno", async (request, response) => {
  let data = request.params.bno;
  let result = (await db.connection('boardInfo', data))[0]; // 배열로 넘어오기 떄문에 값 임의로 빼기
  response.json(result);
});


//등록 : post => body를 요구
app.post("/boards", async (request, response)=>{
  let data = request.body.param; // body안에 { param : { 컬럼명 : 값 } } 의 형태
  let result = await db.connection('boardInsert', data);
  response.json(result);
});

//수정 : put => body를 요구
app.put("/boards/:bno", async (request, response) => {
  let data = [request.body.param, request.params.bno]; // [객체, 단일값]
  let result = await db.connection('boardUpdate', data);
  response.json(result);
});

