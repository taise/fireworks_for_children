import { random } from './random'

export class Env {
  constructor () {
    this.hue = random(0, 360)
    this.cw = window.innerWidth
    this.ch = window.innerHeight
    this.limiterTotal = 1
  }
}
