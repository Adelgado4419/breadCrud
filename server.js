const express = require('express')

require('dotenv').config()
const PORT = process.env.PORT
const app = express()


//middleware
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set ('view engine', 'jsx')
app.engine ('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))



app.get('/', (req, res) =>{
    res.send('Welcome to an awesome app about breads!')
})


//landing page
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

//404 catch all has to be after landing page
app.get('*', (req, res) => {
    res.send('<a href="/breads">404: Return to main page</a>')
})

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})

