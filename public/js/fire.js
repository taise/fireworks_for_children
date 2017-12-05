window.addEventListener('load', () => {
    let canvas = document.getElementById('night_sky')

    var mousedown = false,
        mx,
        my

    canvas.addEventListener('mousemove', function (e) {
        mx = e.pageX - canvas.offsetLeft
        my = e.pageY - canvas.offsetTop
    })

    canvas.addEventListener('mousedown', function (e) {
        e.preventDefault()
        let json = JSON.stringify({'x': mx, 'y': my})
        console.log(json)
        mousedown = true
        fetch(location.origin + '/fire', {
            method: 'post',
            body: json
        })
    })
})
