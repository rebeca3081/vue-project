require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();
const comRouter = require('./commentRouter.js'); // 댓글 라우팅

app.use( // json-parser
  express.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({extended : false})); // query

app.use('/commnets', comRouter); // commentRouter.js파일은 앞에 경로가 /commnets 붙게됨

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

const db = require("./db.js");
// REST API 기준

//전체조회
app.get("/boards", async (request, response) => {
  let result = await db.connection('board', 'boardList');
  response.send(result);
});

//단건조회
app.get("/boards/:bno", async (request, response) => {
  let data = request.params.bno;
  let result = (await db.connection('board', 'boardInfo', data))[0];
  response.send(result);
});


//등록 : post => body
app.post("/boards", async (request, response)=>{
  let data = request.body.param; // { param : { .. } }
  let result = await db.connection('board', 'boardInsert', data);
  response.send(result);
});

//수정 : put => body
app.put("/boards/:bno", async (request, response) => {
  let data = [request.body.param, request.params.bno];
  let result = await db.connection('board', 'boardUpdate', data);
  response.send(result);
});
