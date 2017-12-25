function fire(canvas, hue, e) {
  e.preventDefault()

  let mx = (e.pageX - canvas.offsetLeft) / canvas.width
  let my = (e.pageY - canvas.offsetTop) / canvas.height
  let cw = window.innerWidth
  let ch = window.innerHeight
  let json = JSON.stringify({'x': mx, 'y': my, 'hue': hue})

  console_log('[post] /fire : ' + json)

  fireworks.push(new Firework(cw / 2, ch, mx * cw, my * ch, hue))
  fetch(window.location.origin + '/fire', {
    method: 'post',
    body: json
  })
}

window.addEventListener('load', () => {
  setTimeout( () => { window.location.reload() }, 60000)

  let canvas = document.getElementById('night_sky')
  let ws = createWebSocketConnection('/client')

  ws.onmessage = m => {
    let json = JSON.parse(m.data)
    console_log(json)

    if (json.command === 'reload') {
      window.location.reload()
    }
  }

  canvas.addEventListener('click', e => {
    if (fireworks.length < limiterTotal) {
      fire(canvas, hue, e)
    }
  })
})
