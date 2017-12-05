window.addEventListener('load', () => {
    let ws = new WebSocket('ws://' + location.host + '/websocket');
    let canvas = document.getElementById('night_sky'),
        cw = window.innerWidth,
        ch = window.innerHeight

    ws.onopen = () => console.log('connection opened');
    ws.onclose = () => console.log('connection closed');
    ws.onmessage = m => {
      let json = JSON.parse(m.data)
      console.info(json)
      fireworks.push(new Firework(cw / 2, ch, json.x, json.y))
    }
});
