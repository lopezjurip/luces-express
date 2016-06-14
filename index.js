'use strict'

const server = require('./app')
const port = 3000;

server.listen(port, () => {
  console.log('Server app listening on port:', port);
})
