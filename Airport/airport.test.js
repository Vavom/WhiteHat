
const { Plane } = require('./Airport')
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
    const LAX = new Airport.Airport('LAX')
    const TLV = new Airport.Airport('TLV')
    const LHR = new Airport.Airport('LHR')
    const CDG = new Airport.Airport('CDG')

    test('has a name', () => {
        expect(LHR.name).toBe('LHR')
    })

    test('each airport knows about all the others', () => {
        expect(Airport.Airport.airports).toBeTruthy()
        expect(Airport.Airport.airports.length).toBe(4)
    })

    test('an Airport has planes', () => {
        const ElAl = new Plane()
        ElAl.setLocation(TLV)

        const BritishAirways = new Plane()
        const AirFrance = new Plane()
        const USAirways = new Plane()

        LHR.addPlane(BritishAirways)
        TLV.addPlane(ElAl)
        LAX.addPlane(USAirways)
        CDG.addPlane(AirFrance)
        expect(BritishAirways.location).toBe('LHR')
        LHR.takeOff(BritishAirways, LAX)
        expect(LHR.planes.length).toBe(0)
        expect(LAX.planes.length).toBe(2)
        expect(BritishAirways.location).toBe("LAX")
        LAX.takeOff(BritishAirways, TLV)
        expect(LHR.planes.length).toBe(0)
        expect(TLV.planes.length).toBe(2)
        expect(LAX.planes.length).toBe(1)
        expect(BritishAirways.location).toBe("TLV")

        


    })
})


console.log(Airport.Airport.airports)