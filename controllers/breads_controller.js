const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')


//index 

breads.get('/', (req, res) => {
    res.render('Index',
        {
            breads: Bread,
            title: 'Index Page'
        }
    )
    // res.send(Bread)
})


breads.get('/new', (req, res) => {
    res.render('new')
})

breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
      bread: Bread[req.params.indexArray],
      index: req.params.indexArray  })
})

//why does the /new have to be on top of the show?
breads.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]) {
        res.render('Show', {
            bread:Bread[req.params.arrayIndex],
            index: req.params.arrayIndex
        })
    }   else {
        res.send('<a href="/breads">404: Return to main page</a>')
    }
    })
    //res.send(Bread)

//EDIT


//UPDATE bread
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect('/breads/${req.params.arrayIndex}')
})

// CREATE
breads.post('/', (req, res) => {
    console.log(req.body);
    if (!req.body.image) {
      req.body.image = 'https://placekitten.com/200/200'
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.push(req.body)
    res.redirect('/breads')
  })
  
// DELETE
breads.delete('/:indexArray', (req, res) => {
    Bread.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
  })
  


module.exports = breads;

  

