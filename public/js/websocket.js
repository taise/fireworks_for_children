function createWebSocket (path) {
  let protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  let ws = new window.WebSocket(protocol + '://' + window.location.host + path)
  ws.onopen = () => consoleLog('connection opened')
  ws.onclose = () => consoleLog('connection closed')
  return ws
};
