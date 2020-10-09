const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {Restaurant, Menu, Item, sequelize} = require('./models')
const { response } = require('express')


const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    res.render('start', {layout: 'welcome.handlebars'})
})

app.get('/home', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
    })
    res.render('home', {restaurants})
})

app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await restaurant.getMenus({
        include: ['items']
    })
    res.render('restaurant', {restaurant, menus})
})

app.get('/about', (request, response) => {
    response.render('about')
})

app.get('/restaurants/:id/addMenu', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.render('addMenu', {restaurant})

})

app.post('/restaurants/:id/newMenu', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menu = await Menu.create(req.body)
    for(let i = 0; i < req.body.name.length; i++) {
        let item = Item.create({name:req.body.name[i], price:req.body.price[i], MenuId: menu.id})
        await menu.addItem(item)
        console.log(item)
    }
    await restaurant.addMenu(menu)
    res.redirect(`/restaurants/${req.params.id}`)
})

app.get('/form', (request, response) => {
    response.render('form')
})

app.post('/restaurants', async (req,res) =>{
    await Restaurant.create(req.body) // {name: "Pandas Lunchbox Garden", image: "https://pandas.org/pack-shot.jpg"}
    res.redirect('/home')
})

// app.put('/restaurants/:id/edit', async (req, res) => {
//     const restaurant = await Restaurant.findByPk(req.params.id)
//     await restaurant.update(req.body)
//     res.redirect(`/restaurants/${restaurant.id}`)
// })

app.get('/restaurants/:id/delete', async(req,res) =>{
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await Menu.findAll({where: {RestaurantId: restaurant.id}})
    
    
    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i]
        const items = await Item.findAll({where: {MenuId: menu.id}})
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            await item.destroy()
        }
        await menu.destroy()
    }
    await restaurant.destroy()
    res.redirect('/home')
})

app.get(`/restaurants/:id/:menu_id/delete`, async(req,res) =>{
    // const restaurant = await Restaurant.findByPk(req.params.id)
    const menu = await Menu.findByPk(req.params.menu_id)
    const items = await Item.findAll({where: {MenuId: menu.id}})
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            await item.destroy()
        }
    await menu.destroy()
    res.redirect(`/restaurants/${req.params.id}`)
})



app.post('/restaurants/:id/edit', async (req,res)=>{
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update({name:req.body.name,image:req.body.image})
    res.redirect(`/restaurants/${req.params.id}`)
})

app.get('/restaurants/:id/edit', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.render('edit', {restaurant})
})

app.get(`/restaurants/:id/:menu_id/editMenu`, async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await Menu.findByPk(req.params.menu_id)
    const items = await Item.findAll({where: {MenuId: menus.id}})
    res.render('editMenus', {restaurant, menus, items})
})

app.post(`/restaurants/:id/edit/:menu_id`, async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await Menu.findByPk(req.params.menu_id)
    // const menu_id = req.params.menu_id
    const items = await Item.findAll({where: {MenuId: menus.id}})
    console.log(items)
    console.log(req.body)
    const body = req.body
    for(let i = 0; i < items.length; i++) {
        const item = items[i]
        await item.update({name:body.name[i], price:body.price[i]})
    }
    menus.update({title: body.title})
    res.redirect(`/restaurants/${req.params.id}`)
})



app.listen(3000, async() => {
    await sequelize.sync()
    console.log("Web server is running")
})
