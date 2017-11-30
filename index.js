var canvas = document.getElementById('night_sky'),
    ctx = canvas.getContext( '2d' ),
    cw = window.innerWidth,
    ch = window.innerHeight,
    data = [],
    value = 5000,
    colorScale

canvas.width = cw
canvas.height = ch

d3.range(value).forEach( el =>  {
    data.push({ value: el })
})

console.log(data)
