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
        
        if(this.id) {
            return Promise.resolve(this)
        } else {
            return insertValues(Restaurant, 'restaurants', this.name)  
        }
    }

}

class Menu {
    constructor(data) {
        const Menu = this
        this.id = data.id
        this.restaurants_id = data.restaurants_id
        this.name = data.name
        this.image = data.image
        if(this.id) {
            return Promise.resolve(this)
        } else {
            return insertValues(Menu, 'menus', this.name, this.restaurants_id, 'restaurants_id')  
        }
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