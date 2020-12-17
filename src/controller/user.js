const { exec } = require('../db/mysql')

const userLogin = (username, password)=>{
  const sql = `select username, name from user where username='${username}' and password='${password}'`
  return exec(sql).then(result=>{
    return result[0] || ''
  })
}
module.exports = {
  userLogin
}