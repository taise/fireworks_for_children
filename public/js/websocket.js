const console_log = function(msg) {
  console.log(new Date + ' : ' + msg)
}

const createWebSocketConnection = function(path) {
    let protocol = location.protocol === 'https:' ? 'wss' : 'ws'
    return new WebSocket(protocol + '://' + location.host + path)
}

window.addEventListener('load', () => {
    let ws = createWebSocketConnection('/websocket'),
        canvas = document.getElementById('night_sky'),
        cw = window.innerWidth,
        ch = window.innerHeight

    ws.onopen = () => console_log('connection opened')
    ws.onclose = () => console_log('connection closed')
    ws.onmessage = m => {
      let json = JSON.parse(m.data)
      console_log(json)

      if(json.command === 'reload') {
        location.reload()
      }

      fireworks.push(new Firework(cw / 2, ch, cw * json.x, ch * json.y, json.hue))
    }
});
