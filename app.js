const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.send({ status: 'on' })
})

/**
 * Data store
 * @type {Object}
 */
const notes = {
  // note: true || false,
}

app.route('/notes')
  .get((req, res) => {
    res.send(notes)
  })
  .post((req, res) => {
    const content = req.body
    console.log('content', content)

    if (!content) return res.send(400);

    // Broadcast information
    io.emit('notes', content)

    // Save new information
    Object.assign(notes, content)

    // Send all the current information
    return res.send(notes)
  })

// Show message when a client connect
io.on('connection', socket => {
  console.log('Conected:', socket.id)
})

module.exports = server;
