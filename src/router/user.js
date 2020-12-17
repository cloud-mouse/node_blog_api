const { userLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  const body = req.body

  if (method === 'POST' && req.path === '/api/user/login') {
    const {username, password} = body
    const result = userLogin(username,password)
    return result.then(data=>{
      if(data) {
        return new SuccessModel(data)
      }else {
        return new ErrorModel('登录失败,用户名不存在或密码错误')
      }
    })
    
  }

}

module.exports = handleUserRouter