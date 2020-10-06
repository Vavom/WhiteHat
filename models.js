const {db} = require('./db')

function insertValues(className, table, name, id, parentTable){
    return new Promise(function (resolve, reject) {
        if (!id) parentTable = 'id'
        db.run(`INSERT INTO ${table}(name, ${parentTable}) VALUES(?,?);`,[name, id], function (err) {
            if(err) reject(err)
            className.id = this.lastID
            resolve(className)
        })
    })
}


class Restaurant {
    constructor(data) {
        const Restaurant = this
        this.id = data.id
        this.name = data.name
        this.image = data.image
        Restaurant.menus = []
        
        if(this.id) {
            return new Promise((resolve,reject) => {
                db.all('SELECT * FROM menus WHERE restaurants_id=?;', [Restaurant.id], async (err, rows) => {
                    const arrayOfPromisses = rows.map(row => new Menu(row))
                    Promise.all(arrayOfPromisses).then(menus => {
                        Restaurant.menus = menus
                        resolve(Restaurant)
                    }).catch(err => reject(err))
                })
            })
        } else {
            return insertValues(Restaurant, 'restaurants', this.name)  
        }
    }
    async addMenu(data) {
        const menu = await new Menu({name: data.name, restaurants_id: this.id})
        this.menus.push(menu)
    }

}

class Menu {
    constructor(data) {
        const Menu = this
        this.id = data.id
        this.restaurants_id = data.restaurants_id
        this.name = data.name
        this.image = data.image
        Menu.items = []
        if(this.id) {
            return new Promise((resolve,reject) => {
                db.all('SELECT * FROM items WHERE menus_id=?;', [Menu.id], async (err, rows) => {
                    const arrayOfPromisses = rows.map(row => new Items(row))
                    console.log(arrayOfPromisses)
                    Promise.all(arrayOfPromisses).then(items => {
                        Menu.items = items
                        resolve(Menu)
                    }).catch(err => reject(err))
                })
            })
        } else {
            return insertValues(Menu, 'menus', this.name, this.restaurants_id, 'restaurants_id')  
        }
    }
    async addItem(data) {
        const item = await new Items({name: data.name, menus_id: this.id})
        this.items.push(item)
    }
}

class Items {
    constructor(data) {
        const Items = this
        this.id = data.id
        this.menus_id = data.menus_id
        this.name = data.name
        this.image = data.image
        if(this.id) {
            return Promise.resolve(this)
        } else {
            return insertValues(Items, 'items', this.name, this.menus_id, 'menus_id')  
        }
    }
}







module.exports = {Restaurant, Menu, Items}