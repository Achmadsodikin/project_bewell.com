const express = require('express')
const cors = require('cors')
const bearerToken = require('express-bearer-token')

const PORT = 3300
const app = express()

app.use(bearerToken())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('<h4>integrated with mysql</h4>')
})

const {userRouters} = require('./routers')

app.use('/user', userRouters)

app.listen(PORT, () => console.log('API running : ', PORT))