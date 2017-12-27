import { random } from './utils/random'

export class Firework {
  constructor (sx, sy, tx, ty, hue) {
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
    this.distanceToTarget = this.calculateDistance(sx, sy, tx, ty)
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

  calculateDistance (p1x, p1y, p2x, p2y) {
    const xDistance = p1x - p2x
    const yDistance = p1y - p2y
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  }

  update (index) {
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
    this.distanceTraveled = this.calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy)

    if (!this.isSparkly()) {
      this.x += vx
      this.y += vy
    }
  }

  draw (ctx) {
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

  isSparkly () {
    return this.distanceTraveled >= this.distanceToTarget
  }
}
