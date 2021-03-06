class Aeroplane {
    constructor() {
        this.fuelAmount = 0
        this.isCabinReady = false
        this.isMaintenanceCheckComplete = false
        this.passengers = []
    }
    fueling(fuelAmount) {
        this.fuelAmount += fuelAmount
    }

    cabinReady(isCabinReady){
        this.isCabinReady = isCabinReady
    }

    maintenanceCheckComplete(isMaintenanceCheckComplete) {
        this.isMaintenanceCheckComplete = isMaintenanceCheckComplete
    }
    assignPassengers(passengers) {
        this.passengers.push(passengers) 
    }
}

const fs = require('fs')
const path = require('path')

class Airport {
    static airports = []
    planes = []
    constructor(name) {
        this.name = name
        this.constructor.airports.push(this)
    }
    addPlane(plane) {
    this.planes.push(plane) 
    plane.location = this.name
    }

    takeOff(plane, destination) {
        const index = this.planes.indexOf(plane)
        this.planes.splice(index, 1)
        this.landing(plane, destination)


    }
    landing(plane, arrival) {
        arrival.planes.push(plane)
        plane.location = arrival.name

    }
    getInfo(onInfo) {
        const airportName = this.name
        const locationOfFile = path.join(__dirname, 'airports.json')
        const callback = function (err, buffer) {
            const data = JSON.parse(String(buffer))
            const arrayOfAirports = Object.keys(data).map(key => {
                return data[key]
            })
            const info = arrayOfAirports.find(airport => airport.iata === airportName)
            onInfo(err, info)
        }
        fs.readFile(locationOfFile, callback)
    }

    getInfoAwait() {         
        const airportName = this.name
        return new Promise(function (resolve, reject) {
            fs.readFile(path.join(__dirname, 'airports.json'), (err, buffer) => {
                if(err) return reject(err)
            const data = JSON.parse(String(buffer))
            const arrayOfAirports = Object.keys(data).map(key => {
                return data[key]
            })
            const result = arrayOfAirports.find(airport => airport.iata === airportName)
            resolve(result)
            })
        })
    }
}

class Plane {
    static planes = []
    constructor() {
        this.passengers = []
        this.location = undefined
        this.constructor.planes.push(this)
    }
    board(passengers) {
        this.passengers = passengers
    }
    setDestination(destination) {
        this.destination = destination
    }
    setLocation(location) {
        this.location = location
    }
}

class Passenger {
    constructor({name}) {
        this.name = name
        this.bags = []
    }
    addBag(bag) {
        this.bags.push(bag)
    }
}

class Bag {
    constructor(weight) {
        this.weight = weight

    }
}


module.exports = {Plane, Passenger, Bag, Airport, Aeroplane}
