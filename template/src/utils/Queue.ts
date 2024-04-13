export class Queue {
    private queue: any
    constructor(queue: any) {
        this.queue = queue
    }

    enqueue(item: any) {
        return this.queue.unshift(item)
    }

    dequeue() {
        return this.queue.pop()
    }

    peek() {
        return this.queue[this.length - 1]
    }

    get length() {
        return this.queue.length
    }
    getQueues() {
        return this.queue
    }
    isEmpty() {
        return this.queue.length === 0
    }
}