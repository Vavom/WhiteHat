const { TestScheduler } = require("jest")
const {Restaurant, Menu, Items} = require('./models')
const {db} = require('./db')



describe('Restaurant', () => {
    beforeAll(function (done) {
        db.run('CREATE TABLE IF NOT EXISTS restaurants(id INTEGER PRIMARY KEY, name TEXT);')
        db.run('CREATE TABLE IF NOT EXISTS menus(id INTEGER PRIMARY KEY, name TEXT, restaurants_id INTEGER);')
        db.run('CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY, name TEXT, menus_id INTEGER);',done)
    })
    test('when a restaurant is created it is added to the database', async (done) => {
        const WOK = await new Restaurant({name: 'WOK'})
        expect(WOK.id).toBe(1)
        const McDonalds = await new Restaurant({name: 'McDonalds'})
        expect(McDonalds.id).toBe(2)
        done()

    })
    
    test('can create an instance of an restaurant from a row', (done) => {
        db.get('SELECT * FROM restaurants WHERE id=?', 1, async (err, row) => {
            const restaurant = await new Restaurant(row)
            expect(restaurant.id).toBe(1)
            expect(restaurant.name).toBe('WOK')
            db.get('SELECT COUNT(id) AS total FROM restaurants;', (err, count) => {
                expect(count.total).toBe(2)
                done()
            })
        })
        db.get('SELECT * FROM restaurants WHERE id=?', 2, async (err, row) => {
            const restaurant = await new Restaurant(row)
            expect(restaurant.id).toBe(2)
            expect(restaurant.name).toBe('McDonalds')   
        })      
    })
    test('a restaurant has menus', async (done) => {
        const restaurant = await new Restaurant ({name: "Rice-n-Pot"})
        expect(restaurant.menus.length).toBe(0)
        await restaurant.addMenu({name: 'dessert'})
        expect(restaurant.menus[0] instanceof Menu).toBeTruthy()
        expect(restaurant.menus[0].id).toBeTruthy()
        await restaurant.addMenu({name: 'Childs menu'})
        await restaurant.addMenu({name: 'main'})

        db.get('SELECT * FROM restaurants WHERE id=?;', [restaurant.id], async (err, row) => {
            const ricenpot = await new Restaurant(row)
            expect(ricenpot.id).toBe(restaurant.id)
            expect(ricenpot.menus.length).toBe(3)
            expect(ricenpot.menus[0] instanceof Menu).toBeTruthy()
            done()
        })

    })
    
})

describe('Menu', () => {
    test('when a menu is created it is added to the database', async (done) => {
        const NoodlesMenu = await new Menu({name: 'NoodlesMenu', restaurants_id: 1})
        expect(NoodlesMenu.id).toBe(4)
        const RiceMenu = await new Menu({name: 'RiceMenu', restaurants_id: 1})
        expect(RiceMenu.id).toBe(5)
        done()
    })
    test('a menu has items', async (done) => {
        db.get('SELECT * FROM menus WHERE name=?', 'dessert', async (err, row) => {
            const menu = await new Menu(row)
            await menu.addItem({name: 'Brownie'})
            expect(menu.name).toBe('dessert')  
            expect(menu.items.length).toBe(1)
            expect(menu.items[0] instanceof Items).toBeTruthy()
            expect(menu.items[0].id).toBeTruthy() 
            done()
        })
    })
})

describe('Items', () => {
    test('when a items is created it is added to the database', async (done) => {
        const NoodlesWithBeef = await new Items({name: 'Noodles with beef', menus_id: 1})
        expect(NoodlesWithBeef.id).toBe(2)
        const NoodlesWithChicken = await new Items({name: 'Noodles with chicken', menus_id: 1})
        expect(NoodlesWithChicken.id).toBe(3)
        done()

    })
    
})