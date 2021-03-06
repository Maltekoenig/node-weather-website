const express = require('express')
const path = require('path')
const hbs = require ('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000


// Define Paths
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Malte'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Malte'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hallo Hallo',
        title: 'Help',
        name: 'Malte'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
       return res.send({
            error: 'You must provide an addres'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({error})
        }
    
      forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({error})
    
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Malte',
        errorMessage: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Malte',
        errorMessage: 'Page not found'
    })

})

app.listen(port, () => {
    console.log('server starting on port ' + port)
})
