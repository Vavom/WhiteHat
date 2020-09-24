
class Security {
    constructor(xray, metalDetector, noStaff) {
        this.xray = xray
        this.metalDetector = metalDetector
        this.noStaff = noStaff
    }
    addStaff(noEmployees) {
        this.noStaff += noEmployees
    }
}

class Aeroplane {
    constructor() {
        this.fuelAmount = 0
        this.isCabinReady = false
        this.isMaintenanceCheckComplete = false
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
}

class Airport {
    constructor({security}, noStaff) {
        this.security = security
        this.noStaff = noStaff
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

module.exports = {Passenger, Bag, Airport, Security, Aeroplane}
