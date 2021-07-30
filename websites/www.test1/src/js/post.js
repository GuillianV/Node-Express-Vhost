import http from 'http'
import https from 'https'

let _hostname = "localhost"
let _port = "8888"


function PostHttp(_path = "/", _json = { data: "none" }) {

  const data = JSON.stringify(_json)

  const options = {
    hostname: _hostname,
    port: _port,
    path: _path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      console.log(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()


}

export { PostHttp }


function PostHttps(_path = "/", _json = { data: "none" }) {

  debugger
  const data = JSON.stringify(_json)

  const options = {
    hostname: _hostname,
    port: _port,
    path: _path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()


}

export { PostHttps }