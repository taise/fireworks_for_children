import { random } from './utils/random'

export class Env {
  constructor () {
    this.canvas = document.getElementById('night_sky')
    this.ctx = this.canvas.getContext('2d')
    this.fireworks = []
    this.particles = []

    this.hue = random(0, 360)
    this.cw = window.innerWidth
    this.ch = window.innerHeight
    this.limiterTotal = 1

    this.canvas.width = this.cw
    this.canvas.height = this.ch
  }
}
