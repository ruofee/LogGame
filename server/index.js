const express = require('express')
const app = express()
const path = require('path')
const compression = require('compression')

app.use(compression())
app.use(express.static(path.join(__dirname, '../build')))
const port = 8991
app.listen(port, () => {
    console.log(`服务器启动 port: ${port}`)
})