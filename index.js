// const express = require('express')
// const enableWs = require('express-ws')

// const app = express()
// enableWs(app)

// app.ws('/', (ws, req) => {
// 	ws.send('HI!')
// 	ws.on('message', (msg) => {
// 		return ws.send(msg)
// 	})
// 	ws.on('close', (err) => {
// 		console.log('WebSocket was closed---', err)
// 	})
// })

// app.listen(9999, () => console.log('app executed on port 9999'))

const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 9999
})


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on('connection', function connection(ws) {
  console.log('connected---')
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      client.send(data)
    })
  })
})