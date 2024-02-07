// t_boardSql.js

// 1.전체조회
let boardList =
`select	no
      , title
      , writer
      , content
      , created_date
      , updated_date
from t_board_board`;

// 2.단건조회
let boardInfo =
`select	no
      , title
      , writer
      , content
      , created_date
      , updated_date
from t_board_board
where no=?`;

// 3.등록
let boardInsert =
`insert into t_board_board
set ?`; // 배열X, 객체

// 4.수정
let boardUpdateAll =
`update t_board_board
set ?
where no=?`; // 배열O [객체, 단일값]

module.exports = {
  boardList,
  boardInfo,
  boardInsert,
  boardUpdateAll
}