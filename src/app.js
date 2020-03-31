const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const getweather = require('../utils/getweather')

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../','public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname, '../','public'))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Sheetal'
    })
})

app.get('/help', (req,res) => {
   res.render('help', {
       message: 'This is to help you!',
       title: 'Sheetal'
   })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'Sheetal'
    })  
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter address'
        })
    }

    geocode(req.query.address, (error, response) => {
        if(error){
            return res.send({
                error
            })
        }
            
        getweather(response.latitude, response.longitude, (error, temp) => {
            if(error){
                    return res.send({
                        error: error
                    })
            }
                    
            res.send({
                    location: response.placeName,
                    temperature: temp,
                    address: req.query.address
            })
                
            })
        
    })
 
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'Enter search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res) => {
    res.render('notFound', {
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req,res) => {
    res.render('notFound', {
        errorMessage: 'Page not found'
    })
})






app.listen(port, () => {
    console.log('Listening on '+port)
})