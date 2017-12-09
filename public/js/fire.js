const console_log = function(msg) {
  console.log(new Date + ' : ' + msg)
}

const createWebSocketConnection = function(path) {
    let protocol = location.protocol === 'https:' ? 'wss' : 'ws'
    return new WebSocket(protocol + '://' + location.host + path)
}

const fire = function(canvas, e) {
  e.preventDefault()

  let mx = (e.pageX - canvas.offsetLeft) / canvas.width,
      my = (e.pageY - canvas.offsetTop) / canvas.height,
      json = JSON.stringify({'x': mx, 'y': my, 'hue': hue})

  console_log('[post] /fire : ' + json)

  fetch(location.origin + '/fire', {
      method: 'post',
      body: json
  })
}

window.addEventListener('load', () => {
    let canvas = document.getElementById('night_sky'),
        ws = createWebSocketConnection('/client')

    ws.onopen = () => console_log('connection opened')
    ws.onclose = () => console_log('connection closed')

    ws.onmessage = m => {
      let json = JSON.parse(m.data)
      console_log(json)

      if(json.command === 'reload') {
        location.reload()
      }
    }

    canvas.addEventListener('click',  e => {
        if(fireworks.length <= limiterTotal) {
          fire(canvas, e)
        }
    })
})
