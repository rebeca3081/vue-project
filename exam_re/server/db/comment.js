const commentList = 
`SELECT no
        , writer
        , content
        , created_date
FROM t_comment_board
WHERE bno = ?
ORDER by no`;

module.exports = {
  commentList
}