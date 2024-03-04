import EventEmitter from "events"

const emitter = new EventEmitter()

export function emit () {
  emitter.emit(...arguments)
}
export function on () {
  emitter.on(...arguments)
}
export function off () {
  emitter.removeListener(...arguments)
}
