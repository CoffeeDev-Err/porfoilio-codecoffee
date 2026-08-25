const subscribers = new Set()

let frameId = 0
let listening = false

function flushUpdates(timestamp) {
  frameId = 0
  subscribers.forEach((callback) => callback(timestamp))
}

function scheduleUpdates() {
  if (frameId) return
  frameId = window.requestAnimationFrame(flushUpdates)
}

function startListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', scheduleUpdates, { passive: true })
  window.addEventListener('resize', scheduleUpdates)
}

function stopListening() {
  if (!listening || subscribers.size > 0) return
  listening = false
  window.removeEventListener('scroll', scheduleUpdates)
  window.removeEventListener('resize', scheduleUpdates)

  if (frameId) {
    window.cancelAnimationFrame(frameId)
    frameId = 0
  }
}

export function subscribeToViewportUpdates(callback) {
  subscribers.add(callback)
  startListening()
  scheduleUpdates()

  return () => {
    subscribers.delete(callback)
    stopListening()
  }
}
