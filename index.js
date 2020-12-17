const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring') // 解析query

// 获取postdata
const getPostData = (req)=>{
  const promise = new Promise((resolve, reject)=>{
    if(req.method !== 'POST' || req.headers['content-type'] !=='application/json') {
      resolve({}) 
      return
    }
    let postData = ''
    req.on('data', chunk=>{
      postData += chunk.toString()
    })
    req.on('end', ()=>{
      if(!postData) return resolve({}) 
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res)=>{
  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])
  // 处理postdata
  getPostData(req).then(data=>{
    req.body = data

    const blogResult = handleBlogRouter(req, res)
    if(blogResult) {
      blogResult.then(blogData=>{
        return res.end(JSON.stringify(blogData))
      })
    }

    const userResult = handleUserRouter(req, res)
    if(userResult){
      userResult.then(userData=>{
        return res.end(JSON.stringify(userData))
      })
    } 

  }).catch(()=>{
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Note Found \n")
    res.end()
  })
}
module.exports = serverHandle