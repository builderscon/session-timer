
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.listen(port, () => console.log(`App listening on port ${port}`))
