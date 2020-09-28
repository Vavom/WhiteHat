class Restaurant {
    bookings = []
    constructor(name) {
        if (!name) throw new Error('you must give a name')
        this.name = name
        this.menu = []
    }
    addMenu(menu) {
        this.menu.push(menu)
    }
    addBooking(bookingName){
        this.bookings.push(bookingName)

    }
    seated(bookingName) {
        const index = this.bookings.indexOf(bookingName)
        this.bookings.splice(index, 1)
    }
}

class Item {
    static items = []
    constructor({name, price}) {
        if(!{price}) throw new Error('Must have a price')
        this.name = name
        this.price = price
        this.constructor.items.push(this)

    }
}

class Menu {
    static menu = []
    
    constructor(name) {
        this.name = name
        this.available = true
        this.items = []
        this.constructor.menu.push(this)
    }
    addItem(item) {
            this.items.push(item)

    }
    removeUnavailableItems() {
        for(let i = 0;i < this.items.length; i++){
            const item = this.items[i]
            if(item.available == false) this.items.splice(i, 1)
            console.log(Lunch)
        }
    }
}

class Booking {
    constructor(name, noPeople, time) {
        this.name = name
        this.noPeople = noPeople
        this.time = time
    }
}



module.exports = {Restaurant, Booking, Menu, Item}