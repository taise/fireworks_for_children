import { consoleLog } from './utils/console'
import { createWebSocket } from './websocket'
import { Firework } from './firework'
import { env } from './fireworks'

window.addEventListener('load', () => {
  let ws = createWebSocket('/websocket')
  let canvas = document.getElementById('night_sky')

  ws.onmessage = m => {
    let json = JSON.parse(m.data)
    consoleLog(JSON.stringify(json))

    if (json.command === 'reload') {
      window.location.reload()
    }

    env.fireworks.push(new Firework(env.cw / 2, env.ch, env.cw * json.x, env.ch * json.y, json.hue))
  }

  canvas.addEventListener('click', e => {
    e.preventDefault()
    let mx = e.pageX - canvas.offsetLeft
    let my = e.pageY - canvas.offsetTop

    if (env.fireworks.length < env.limiterTotal) {
      env.fireworks.push(new Firework(env.cw / 2, env.ch, mx, my, env.hue))
    }
  })
})
