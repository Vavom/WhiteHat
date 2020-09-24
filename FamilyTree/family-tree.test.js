const familyTree = require('./family-tree')

describe('Family Tree', function (){
    test('I am in my family tree', function (){
        const me = familyTree[0]
        expect(me.name).toEqual('Noah')
    })

    test('My sister is also there', function() {
        const sister = familyTree[1]
        expect(sister.name).toEqual('Amy')
    })

    test('My mum is in the tree', function() {
        const mum = familyTree[0].parents[0]
        expect(mum.name).toEqual('Mum')
    })

    test('All people have names', function() {
        familyTree.map(a => expect(a.name).toBeDefined())
        familyTree.map(a => expect(a.name).not.toBeNull())
        familyTree.map(a => expect(a.name).not.toBe(Number))
    })

    test('All ages are above -1', function() {
        familyTree.map(a => expect(a.age).toBeGreaterThan(-1))
    })

    test('All parents are older than children', function() {
        const me = familyTree[0]
        const sister = familyTree[1]

        expect(me.age).toBeLessThan(me.parents[0].age && me.parents[1].age)
    })
})
