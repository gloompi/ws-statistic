const WebSocket = require('ws')
const name = require('faker').internet.userName
const ws = new WebSocket('ws://localhost:9999/')

ws.on('message', (msg) => console.log(msg))

const data = {
	payoff_users: [],
	holding_users: [],
	total: 1352,
	investors: 894,
	payedoff: 9475145,
	holded: 18930609
}

for(let i=0; i<6; i++){
	let user = {name: name(), sum: Math.ceil(Math.random() * 3000) + 100 + '0', country: Math.ceil(Math.random() * 4)}
	let hold_user = {name: name(), sum: Math.ceil(Math.random() * 3000) + 100 + '0', country: Math.ceil(Math.random() * 4)}
	data.payoff_users.push(user)
	data.holding_users.push(hold_user)
}

setInterval(() => {
  data.investors = data.investors + 1
  ws.send(JSON.stringify(data))
}, 20000)
setInterval(() => {
  loopPayoff()
  ws.send(JSON.stringify(data))
}, 15000)
setInterval(() => {
  loopHolding()
  ws.send(JSON.stringify(data))
}, 5000)

function loopPayoff(){
	setTimeout(() => {
	  let sum = Math.ceil(Math.random() * 3000) + 100 + '0'
	  let user = {name: name(), sum, country: Math.ceil(Math.random() * 4)}

	  data.payoff_users.pop()
	  data.payoff_users.unshift(user)
	  data.total = data.total - 1
	  data.payedoff = data.payedoff + parseInt(sum)
	}, Math.random() * 5000)
}

function loopHolding(){
	setTimeout(() => {
	  let sum = Math.ceil(Math.random() * 3000) + 100 + '0'
	  let user = {name: name(), sum, country: Math.ceil(Math.random() * 4)}

	  data.holding_users.pop()
	  data.holding_users.unshift(user)
		data.total = data.total + 1 
		data.holded = data.holded + parseInt(sum)
	}, Math.random() * 10000)
}