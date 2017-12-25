import { consoleLog } from './console'
import { createWebSocket } from './websocket'

window.addEventListener('load', () => {
  let ws = createWebSocket('/websocket')
  let canvas = document.getElementById('night_sky')
  let cw = window.innerWidth
  let ch = window.innerHeight

  ws.onmessage = m => {
    let json = JSON.parse(m.data)
    consoleLog(JSON.stringify(json))

    if (json.command === 'reload') {
      window.location.reload()
    }

    fireworks.push(new Firework(cw / 2, ch, cw * json.x, ch * json.y, json.hue))
  }

  canvas.addEventListener('click', e => {
    e.preventDefault()
    let mx = e.pageX - canvas.offsetLeft
    let my = e.pageY - canvas.offsetTop

    if (fireworks.length < limiterTotal) {
      fireworks.push(new Firework(cw / 2, ch, mx, my, hue))
    }
  })
})
