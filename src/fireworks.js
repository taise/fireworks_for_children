import { Particle } from './particle'

// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim
window.requestAnimFrame = (() => {
  return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
})()

// now we will setup our basic variables for the demo
const canvas = document.getElementById('night_sky')
const cw = window.innerWidth
const ch = window.innerHeight
const particleCount = 30

const ctx = canvas.getContext('2d')
export const fireworks = []
export const particles = []

// set canvas dimensions
canvas.width = cw
canvas.height = ch

// create particle group/explosion
function createParticles (x, y, hue) {
  // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
  let count = particleCount
  while (count--) {
    particles.push(new Particle(x, y, hue))
  }
}

// main demo loop
function loop () {
  // this function will run endlessly with requestAnimationFrame
  window.requestAnimFrame(loop)

  // normally, clearRect() would be used to clear the canvas
  // we want to create a trailing effect though
  // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
  ctx.globalCompositeOperation = 'destination-out'
  // decrease the alpha property to create more prominent trails
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  ctx.fillRect(0, 0, cw, ch)
  // change the composite operation back to our main mode
  // lighter creates bright highlight points as the fireworks and particles overlap each other
  ctx.globalCompositeOperation = 'lighter'

  for (const [i, firework] of fireworks.entries()) {
    firework.draw(ctx)
    firework.update()
    if (firework.isSparkly()) {
      createParticles(firework)
      // document.getElementById('bang').play()
      fireworks.splice(i, 1)
    }
  }

  // loop over each particle, draw it, update it
  for (const [j, particle] of particles.entries()) {
    particle.draw(ctx)
    particle.update()
    if (particle.isEnd()) {
      particles.splice(j, 1)
    }
  }
}
// once the window loads, we are ready for some fireworks!
window.onload = loop
