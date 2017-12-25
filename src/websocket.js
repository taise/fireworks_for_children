import { consoleLog } from './console'

export function createWebSocket (path) {
  let protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  let ws = new WebSocket(protocol + '://' + window.location.host + path)
  ws.onopen = () => consoleLog('connection opened')
  ws.onclose = () => consoleLog('connection closed')
  return ws
};
