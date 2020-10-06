const {Restaurant, Menu, sequelize} = require('./models')

describe('Restaurant', () => {
    beforeAll(async () => {
        await sequelize.sync()
    })
    test('can create a restaurant', async () => {
        const restautant = await Restaurant.create({name: 'Ronalds', image: 'http://some.image.url'})
        expect(restautant.id).toBe(1)
    })
    test('can add a menu to a restaurant', async () => {
        const restaurant = await Restaurant.create({name: "Boho Social", image: "image.url"})
        const Weekend = await Menu.create({title: "Weekend Brunch"})
        const Dinner = await Menu.create({title: "Dinner"})
        await restaurant.addMenu(Weekend, Dinner)
        const menus = await restaurant.getMenus()
        console.log(menus)
        expect(menus.length).toBe(1)
    })
})

// describe('Menu', () => {
//     test('can create a menu', async () => {
//         const menu = await Menu.create({name: 'Main'})
//         expect(menu.id).toBe(1)
//         console.log(menu)
//     })
// })