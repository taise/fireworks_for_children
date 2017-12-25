import { Env } from './env'
import { consoleLog } from './utils/console'
import { createWebSocket } from './websocket'
import { fireworks, Firework } from './fireworks'

function fire (canvas, hue, e) {
  e.preventDefault()

  let mx = (e.pageX - canvas.offsetLeft) / canvas.width
  let my = (e.pageY - canvas.offsetTop) / canvas.height
  let cw = window.innerWidth
  let ch = window.innerHeight
  let json = JSON.stringify({'x': mx, 'y': my, 'hue': hue})

  consoleLog('[post] /fire : ' + json)

  fireworks.push(new Firework(cw / 2, ch, mx * cw, my * ch, hue))
  window.fetch(window.location.origin + '/fire', {
    method: 'post',
    body: json
  })
}

window.addEventListener('load', () => {
  window.setTimeout(() => { window.location.reload() }, 60000)

  const env = new Env()
  let canvas = document.getElementById('night_sky')
  let ws = createWebSocket('/client')

  ws.onmessage = m => {
    let json = JSON.parse(m.data)
    consoleLog(json)

    if (json.command === 'reload') {
      window.location.reload()
    }
  }

  canvas.addEventListener('click', e => {
    if (fireworks.length < env.limiterTotal) {
      fire(canvas, env.hue, e)
    }
  })
})
