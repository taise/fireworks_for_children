const console_log = function(msg) {
  console.log(new Date + ' : ' + msg)
}

function createWebSocketConnection(path) {
  let protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  let ws = new WebSocket(protocol + '://' + window.location.host + path)
  ws.onopen = () => console_log('connection opened')
  ws.onclose = () => console_log('connection closed')
  return ws
};
