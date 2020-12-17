// 公共返回
class BaseModel {
  constructor(data, message) {
    if(typeof data ==='string') {
      this.message = data
      data = null
      message = null
    }
    if(data){
      this.data =data
    }
    if(message) {
      this.message = message
    }
  }
}

// 成功返回
class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.status = 0
  }
}

// 错误返回
class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.status = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}