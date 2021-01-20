const app = require('../server')
const request = require('supertest')

describe("Server test on Airports", () => {
    test("Can all airports be found", (done) => {
        request(app)
            .get('/airports')
            .expect(200)
            .expect(res => {
                expect(res.body.length).toBeGreaterThan(28000)
            })
            .end(done)
    })
    test("Can a query (page) work with a request", (done) => {
        request(app)
        .get('/airports?page=1')
        .expect(200)
        .expect(res => {
            expect(res.body.length).toBe(100)
        })
        .end(done)
    })
    test("Can a query (filter) work with a request", (done) => {
        request(app)
        .get('/airports?filter=icao')
        .expect(200)
        .expect(res => {
            expect(res.body[0].length).toBe(4)
            expect(res.body[1].length).toBe(4)
            expect(res.body[2].length).toBe(4)
        })
        .end(done)
    })
    test('can we post the the server', (done) => {
        request(app)
          .post('/airports')
          .send({
            city: "Cordes",
            country: "US",
            elevation: 3810,
            iata: "",
            icao: "00AZ",
            lat: 34.3055992126,
            lon: -112.1650009155,
            name: "Cordes Airport",
            state: "Arizona",
            tz: "America/Phoenix",
          })
          .set('Accept', 'application/json')
          .expect(201)
          .expect(res.body)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
      });
})