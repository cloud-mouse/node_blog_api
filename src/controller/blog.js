const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = 'select * from blog where 1=1 '
  if (author) {
    sql += `and author=${author} `
  }
  if (keyword) {
    sql += `and title like '%${keyword}' `
  }
  sql += `order by createtime desc`
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blog where id=${id}`
  return exec(sql).then(rows => {
    return rows[0]
  })
}
const addNew = (data = {}) => {
  const { title, content, author, cover } = data
  const createtime = Date.now()
  const sql = `insert into blog (title, content, createtime, updatetime, author, cover) values ('${title}','${content}', '${createtime}','${createtime}', '${author}', '${cover}')`
  return exec(sql).then(result => {
    return { id: result.insertId }
  })
}

const updateThis = (id, data = {}) => {
  const { title, content, author, cover } = data
  const updatetime = Date.now()
  const sql = `update blog set title='${title}', content='${content}', updatetime='${updatetime}', author='${author}', cover='${cover}' where id=${id}`
  return exec(sql).then(result => {
    if(result.affectedRows > 0) {
      return true
    }else {
      return false
    }
  })
}

const deleteThis = (id, author) => {
  const sql = `delete from blog where id=${id} and author=${author}`
  return exec(sql).then(result=>{
    return result.affectedRows>0
  })
}

module.exports = {
  getList,
  getDetail,
  addNew,
  updateThis,
  deleteThis
}