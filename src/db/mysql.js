
const mysql = require('mysql')
const { mysql_config } = require('../config/db')
// 创建数据库链接配置
const con = mysql.createConnection(mysql_config)
con.connect();

function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}
module.exports = {
  exec
}
