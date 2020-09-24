
const Airport = require('./Airport')

describe('Passenger', function () {
    test('has a name', function () {
        const person = new Airport.Passenger({name: "Bernard"})
        expect(person.name).toEqual("Bernard")
    })

    test('has bags', function (){
        const person = new Airport.Passenger({name: "Yuki"})
        const handluggage = new Airport.Bag(8)
        const hullluggage = new Airport.Bag(25)
        person.addBag(handluggage)
        person.addBag(hullluggage)
        expect(person.bags.length).toBe(2)

    })

    test('we can read the weight of the bag', () =>{
        const poppy = new Airport.Passenger({name: 'Poppy'})
        const rucksac = new Airport.Bag(6)
        poppy.addBag(rucksac)
        expect(poppy.bags[0].weight).toBe(6)
    })
    describe('Bag', function () {
        test('has a weight', function () {
            const bag = new Airport.Bag(13)
            expect(bag.weight).toBeLessThan(24)
        })
    })
})

describe('Airport', () => {
    const security = new Airport.Security(2, 4, 2);
    const airport = new Airport.Airport(security, 230)
    test('enough employes available', () => {
        const enoughStaff = security.noStaff < airport.noStaff;
        expect(enoughStaff).toBeTruthy()
    })
    describe('Security', () => {
        test('has at least 2 x-ray machines', () => {
            expect(security.xray).toBeGreaterThan(1)
        })
        test('has at least 4 metal detectors', () => {
            expect(security.metalDetector).toBeGreaterThan(3)
        })
        test('has at least 15 staff', () => {
            security.addStaff(20)
            expect(security.noStaff).toBeGreaterThan(14) 
        })
    })
    describe('aeroplane', () => {
        const aeroplane = new Airport.Aeroplane()
        test('has fuel loaded', () => {
            aeroplane.fueling(160000)
            expect(aeroplane.fuelAmount).toBeGreaterThan(100000)
        })
        test('is cabin ready', () => {
            aeroplane.cabinReady(true)
            expect(aeroplane.isCabinReady).toBeTruthy()
        })
        test('has the aircraft been check by maintance crew', () => {
            aeroplane.maintenanceCheckComplete(true)
            expect(aeroplane.isMaintenanceCheckComplete).toBeTruthy()
        })
    })
})

