const load = require('./load')

jest.setTimeout(30000);

describe('SQLite3', () => {
    test('airports are loaded into the database', (done) => {
        load(db => {
            db.all('SELECT * FROM airports LIMIT 3;', (err, row) => {
                expect(row.length).toBe(3)
                expect(row[0].name).toBe('Shenyang Dongta Airport')
                db.get('SELECT COUNT(id) AS total FROM airports;', (err, count) => {
                    expect(count.total).toBe(28868)
                    done()
                })
            })
        })
    })
})