#!/usr/bin/env node

console.log('This is post init script')
console.log('Đang cài chờ chút nhé @@ ahihi !!')

const P = ['\\', '|', '/', '-']
let x = 0
const loader = setInterval(() => {
  process.stdout.write(`\r${P[x++]}`)
  x %= P.length
}, 250)

setTimeout(() => {
  clearInterval(loader)
}, 3000)
