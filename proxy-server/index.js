const express = require('express')
const cors = require('cors')
const { Router } = require('express')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

// Routes
app.use('/api/recipes/v2', require('./routes'))

// Enable cors
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))