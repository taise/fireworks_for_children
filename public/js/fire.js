window.addEventListener('load', () => {
    let canvas = document.getElementById('night_sky')

    canvas.addEventListener('click',  e => {
        e.preventDefault()

        let mx = (e.pageX - canvas.offsetLeft) / canvas.width,
            my = (e.pageY - canvas.offsetTop) / canvas.height,
            json = JSON.stringify({'x': mx, 'y': my})

        console.log('[post] /fire : ' + json)

        fetch(location.origin + '/fire', {
            method: 'post',
            body: json
        })
    })
})
