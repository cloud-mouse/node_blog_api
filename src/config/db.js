const ENV = process.env.NODE_ENV

let mysql_config

if (ENV === 'dev') {
  mysql_config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'myblog'
  }
}
if (ENV === 'producttion') {
  mysql_config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'myblog'
  }
}
module.exports = { mysql_config }