const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()



//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engines and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {

    res.render('index', {
        title : 'Weather App',
        name : 'Andre mead'
    })

})

app.get('/about', (req,res) => {
       res.render('about', {
           title : 'about me',
           name : 'Andrew Mead'
       })
})


app.get('/help', (req,res) => {
    res.render('help', {
        helpText : 'This is some helpfil text',
        title : 'Help',
        name : 'Venkat'
        })
})


app.get('/weather', (req, res) => {

    if(!req.query.address){
           return res.send(
               {
                   error: 'You must provide an Address'
               })
    }
     const address = req.query.address
    geoCode(address, (error, {latitude, longitude,location} = {}) => {
        
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {

                if(error)
                {
                    return res.send({error})
                }     
               console.log('forecastData',forecastData)
                res.send({
                    forecast : forecastData,
                    location,
                    address: req.query.address
                })

        })


    })

})


app.get('/product',(req, res) => {
   // console.log(req.query.search)
    if(!req.query.search){
        return res.send({
             error:'You must provie a search term'
         })
    }
    res.send({
        products : []
    })
}) 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Andrew Mead',
        errorMessage : 'Help artical not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 404,
        name : 'Andrew',
        errorMessage:'Page not found'
    })

})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

