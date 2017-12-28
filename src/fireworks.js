import { Particle } from './particle'
import { Env } from './env'

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

function createParticles (firework, particles) {
  let count = 30
  while (count--) {
    particles.push(new Particle(firework))
  }
  return particles
}

function clearRect (env) {
  env.ctx.globalCompositeOperation = 'destination-out'
  env.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  env.ctx.fillRect(0, 0, env.cw, env.ch)
  env.ctx.globalCompositeOperation = 'lighter'
}

function loop () {
  window.requestAnimFrame(loop)
  clearRect(env)

  for (const [i, firework] of env.fireworks.entries()) {
    firework.draw(env.ctx)
    firework.update()
    if (firework.isSparkly()) {
      env.particles = createParticles(firework, env.particles)
      // document.getElementById('bang').play()
      env.fireworks.splice(i, 1)
    }
  }

  for (const [j, particle] of env.particles.entries()) {
    particle.draw(env.ctx)
    particle.update()
    if (particle.isEnd()) {
      env.particles.splice(j, 1)
    }
  }
}

export const env = new Env()
window.onload = loop
