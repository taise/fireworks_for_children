window.addEventListener('load', () => {
    let canvas = document.getElementById('night_sky')

    canvas.addEventListener('click',  e => {
        e.preventDefault()

        let mx = e.pageX - canvas.offsetLeft,
            my = e.pageY - canvas.offsetTop,
            json = JSON.stringify({'x': mx, 'y': my})

        console.log('[post] /fire : ' + json)

        fetch(location.origin + '/fire', {
            method: 'post',
            body: json
        })
    })
})
