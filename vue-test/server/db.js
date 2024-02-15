// db.js
const mysql = require('mysql');
const sql = require('./db/t_boardSql.js');

const connectionPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
  connectionLimit: process.env.MYSQL_CONNECT_LIMIT, // connection 최대크키
  debug: true
});

const executeQuery = async (alias, values) => {
  return new Promise((resolve, reject) => {
    let executeSql = sql[alias];
    // query(실행할 쿼리, 속성, (에러, 결과))
    connectionPool.query(executeSql, values, (err, results) => {
      if(err) {
        console.log(err);
        reject({ err });
      } else {
        console.log(results);
        resolve(results);
      }
    })
  })
};

module.exports = {
  executeQuery
}