const Restaurant = require('./Restaurant')

const McDonalds = new Restaurant.Restaurant('McDonalds')
const Breakfast = new Restaurant.Menu('Breakfast')
const Lunch = new Restaurant.Menu('Lunch')
const Dinner = new Restaurant.Menu('Dinner')
const Dessert = new Restaurant.Menu('Dessert')
const JohnBooking = new Restaurant.Booking('John', 4, '12:30')

describe('Restaurant', () => {
    test('restaurant has name', () => {
        expect(McDonalds.name).toBe('McDonalds')
    })
    test('restaurant has a menu', () => {
        McDonalds.addMenu(Breakfast)
        McDonalds.addMenu(Lunch)
        McDonalds.addMenu(Dinner)
        expect(McDonalds.menu.length).toBeGreaterThan(0)
    })
    test('resturant has a booking', () => {
        McDonalds.addBooking(JohnBooking)
        expect(McDonalds.bookings.length).toBeGreaterThan(0)
    })
})

describe('Menu', () => {
    const Rice = new Restaurant.Item({name: 'Rice', price: 3})
    const Chicken = new Restaurant.Item({name:'Chicken', price: 8})
    const Eggs = new Restaurant.Item({name:'Eggs', price: 5})
    const Steak = new Restaurant.Item({name:'Steak', price: 13})
    const Brownie = new Restaurant.Item({name:'Brownie', price: 6})
    test('has a title', () => {
        expect(Breakfast.name).toBeTruthy()
    })
    test('item exists with price and name', () => {
        expect(Rice.name).toBe('Rice')
        expect(Rice.price).toBe(3)
    })
    test('item is made and added to menu', () => {
        Lunch.addItem(Chicken)
        Lunch.addItem(Rice)
        Breakfast.addItem(Eggs)
        Dinner.addItem(Steak)
        Dessert.addItem(Brownie)
        expect(Breakfast.items.length).toBeGreaterThan(0)
        expect(Lunch.items.length).toBeGreaterThan(0)
        expect(Dinner.items.length).toBeGreaterThan(0)  
    })
    test('item can be made unavailable', () => {
        Chicken.available = false
        Lunch.removeUnavailableItems
        
    })

})