 
const express = require('express')
const reportersRouter = require('./routers/rout')
const newsRouter = require('./routers/news')
const app = express()
const port = process.env.PORT || 3000
// const jwt = require('jsonwebtoken')
 
require('./db/mongoose')
app.use(express.json())
app.use(reportersRouter)
app.use(newsRouter)

app.listen(port,()=>{console.log('Server is running on port ' + port)})
