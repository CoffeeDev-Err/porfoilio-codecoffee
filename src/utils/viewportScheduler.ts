type ViewportSubscriber = (timestamp: number) => void

const subscribers = new Set<ViewportSubscriber>()

let frameId = 0
let listening = false

function flushUpdates(timestamp: number) {
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

export function subscribeToViewportUpdates(callback: ViewportSubscriber): () => void {
  subscribers.add(callback)
  startListening()
  scheduleUpdates()

  return () => {
    subscribers.delete(callback)
    stopListening()
  }
}
