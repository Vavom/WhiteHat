const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {Restaurant, Menu, Item, sequelize} = require('./models')


const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
        
    })
    res.render('home', {restaurants, date: new Date()})
})

app.get('/home', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
    })
    res.render('home', {restaurants, date: new Date()})
})

app.get('/about', (request, response) => {
    response.render('about', {date: new Date()})
})
app.get('/Bayroot', async (request, response) => {
    const menu = await Menu.findAll({
        include: [{model: Item, as: 'items'}],
        nest: true
    })
    const menus = menu.find(m => m.RestaurantId === 1)
    console.log(menus)
    response.render('Bayroot', {menus, date: new Date()})
})

app.listen(3000, async() => {
    await sequelize.sync()
    console.log("Web server is running")
})
