// Simple placeholder Express server (install express to use)
// Run with: node backend/server.js (after installing dependencies)

const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.get('/api/ping', (req, res) => res.json({pong: true}))

app.listen(port, () => {
  console.log(`Backend placeholder server listening on http://localhost:${port}`)
})
