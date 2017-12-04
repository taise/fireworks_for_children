class Firework {
    constructor(tx, ty) {
       this.tx = x
       this.ty = y
       this.px = window.innerWidth / 2
       this.py = window.innerHeight
    }
}

class Particle {
    constructor(x, y) {
       this.x = x
       this.y = y
       this.coordinates = []
       this.coordinateCount = 5
       while (this.coordinateCount--) {
           this.coordinates.push([this.x, this.y])
       }
       this.angle = Math.random()
       this.speed = 5
       this.friction = 0.9
       this.gravity = 1
       this.alpha = 1
       this.decay = 0.02
    }

    update(index) {
        this.coordinates.pop()
        this.coordinates.unshift([this.x, this.y])
        this.speed *= this.friction
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed + this.gravity
        this.alpha -= this.decay
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(
            this.coordinates[this.coordinates.length - 1][0], 
            this.coordinates[this.coordinates.length - 1][1], 
        )
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = 'hsla(50, 100%, 50%, ' + this.alpha  +')'
        ctx.stroke()
        console.log(this.x, this.y)
    }


    isBurnout() {
        return this.alpha <= this.decay
    }
}

// It is best to use native animation frame
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        }
})()


let nightSky = document.getElementById('night_sky'),
    ctx = nightSky.getContext("2d"),
    mouseDown = false,
    particleCount = 10

// Initialize
nightSky.width = window.innerWidth
nightSky.height = window.innerHeight


nightSky.addEventListener('mousedown', event => {
    let mx = event.pageX - nightSky.offsetLeft,
        my = event.pageY - nightSky.offsetTop
    new Particle(mx, my).draw(ctx)
})

const loop = function() {
    requestAnimFrame(loop)
    
    let particles = []
    let i = particles.length
    while(i--) {
        let particle = particles[i]
        particle.draw()
        particle.update(i)
        if(particle.isBurnout()) {
            particles.splice(i, 1)
        }
    }
    console.info(particles)

    
    if (i <= particleCount) {
        particles.push(new Particle(100, Math.random * 100))
    }
}
//window.onload = loop