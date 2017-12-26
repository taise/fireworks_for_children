import { random } from './utils/random'
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

var ctx = canvas.getContext('2d')
export var fireworks = []
export var particles = []

// set canvas dimensions
canvas.width = cw
canvas.height = ch

// now we are going to setup our function placeholders for the entire demo

// calculate the distance between two points
const calculateDistance = function (p1x, p1y, p2x, p2y) {
  const xDistance = p1x - p2x
  const yDistance = p1y - p2y
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

// create firework
export function Firework (sx, sy, tx, ty, hue) {
  // actual coordinates
  this.x = sx
  this.y = sy
  // starting coordinates
  this.sx = sx
  this.sy = sy
  // target coordinates
  this.tx = tx
  this.ty = ty
  // distance from starting point to target
  this.distanceToTarget = calculateDistance(sx, sy, tx, ty)
  this.distanceTraveled = 0
  // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
  this.coordinates = []
  this.coordinateCount = 3
  this.hue = hue
  // populate initial coordinate collection with the current coordinates
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y])
  }
  this.angle = Math.atan2(ty - sy, tx - sx)
  this.speed = 2
  this.acceleration = 1.05
  this.brightness = random(50, 70)
  // circle target indicator radius
  this.targetRadius = 1
}

// update firework
Firework.prototype.update = function (index) {
  // remove last item in coordinates array
  this.coordinates.pop()
  // add current coordinates to the start of the array
  this.coordinates.unshift([this.x, this.y])

  // cycle the circle target indicator radius
  if (this.targetRadius < 8) {
    this.targetRadius += 0.3
  } else {
    this.targetRadius = 1
  }

  // speed up the firework
  this.speed *= this.acceleration

  // get the current velocities based on angle and speed
  var vx = Math.cos(this.angle) * this.speed
  var vy = Math.sin(this.angle) * this.speed
  // how far will the firework have traveled with velocities applied?
  this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy)

  // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
  if (this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.tx, this.ty, this.hue)
    // document.getElementById('bang').play()
    // remove the firework, use the index passed into the update function to determine which to remove
    fireworks.splice(index, 1)
  } else {
    // target not reached, keep traveling
    this.x += vx
    this.y += vy
  }
}

// draw firework
Firework.prototype.draw = function () {
  ctx.beginPath()
  // move to the last tracked coordinate in the set, then draw a line to the current x and y
  ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1])
  ctx.lineTo(this.x, this.y)
  ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`
  ctx.stroke()

  ctx.beginPath()
  // draw the target for this firework with a pulsing circle
  ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2)
  ctx.stroke()
}

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

  // increase the hue to get different colored fireworks over time
  // hue += 0.5

  // create random color
  // hue = random(0, 360)

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

  // loop over each firework, draw it, update it
  var i = fireworks.length
  while (i--) {
    fireworks[i].draw()
    fireworks[i].update(i)
  }

  // loop over each particle, draw it, update it
  var j = particles.length
  while (j--) {
    particles[j].draw(ctx)
    particles[j].update(j)
    if (particles[j].isEnd()) {
      particles.splice(j, 1)
    }
  }
}
// once the window loads, we are ready for some fireworks!
window.onload = loop
