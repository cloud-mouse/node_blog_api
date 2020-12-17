const { getList, getDetail, addNew, updateThis,
  deleteThis } = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  let body = req.body

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const result = getList(author, keyword)
    return result.then(listData=>{
      return new SuccessModel(listData)
    })
  }
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(resData=>{
      return new SuccessModel(resData)
    })
  }
  if (method === 'POST' && req.path === '/api/blog/new') {
    const result = addNew(body)
    return result.then(insertData=>{
      return new SuccessModel(insertData)
    })
  }
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateThis(id, body)
    return result.then(updata=>{
      if(updata) {
        return new SuccessModel('更新成功')
      }else {
        return new ErrorModel('更新失败')
      }
    })
  }
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const author = req.query.author || ''
    const result = deleteThis(id,author)
    return result.then(data=>{
      if(data) {
        return new SuccessModel('删除成功')
      }else {
        return new ErrorModel('删除失败')
      }
    })
    
  }

}

module.exports = handleBlogRouter