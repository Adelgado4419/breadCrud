const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')



require('dotenv').config()
const PORT = process.env.PORT
const app = express()


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
  )


//middleware
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set ('view engine', 'jsx')
app.engine ('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))



app.get('/', (req, res) =>{
    res.send('Welcome to an awesome app about breads!')
})


//landing page
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)


//404 catch all has to be after landing page
// app.get('*', (req, res) => {
//     res.send('<a href="/breads">404: Return to main page</a>')
// })


app.listen(PORT, () => {
    console.log('listening on port', PORT);
})










