const { WebSocketServer , WebSocket} = require("ws");
// 0 : connecting 
// 1 : open(the only state where u can safely .send())   also instead of 1 u can use WebSocket.OPEN to check open state 

// 2 : Closing
// 3 : closed 

const wss = new WebSocketServer({port : 8080});  // just open zombie typo 

//  connection event 
wss.on('connection',(socket,request)=>{
  const ip = request.socket.remoteAddress;

  socket.on('message',(rawData)=>{
    const message = rawData.toString()
    console.log({rawData});

    wss.clients.forEach((client)=>{
      if(client.readyState === 1) client.send(`Server Broadcast : ${message}`)
    })
  })

  socket.on('error', (err)=>{
    console.log(`Error : ${err.message}: ${ip}`)
  })
  socket.on('close',()=>{
    console.log('client disconnected')
  })

})

console.log("webSocket Server ios live on ws://localhost:8080");