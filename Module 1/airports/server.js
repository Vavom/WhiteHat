const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const airports = require('./airports.json')
const YAML = require('js-yaml')
const fs = require('fs')
const docs = YAML.load(fs.readFileSync('./airports.yaml').toString())
const swaggerDocs = require('swagger-jsdoc')({
    swaggerDefinition: docs,
    apis: ['./server.js', './Airport.js'] // <- reference the file your schema is in here
})
const {binarySearch} = require('./utils.js')
app.use(express.json())


/**
 * @swagger
 * /airports:
 *   get:
 *     summary: returns an array of airports
 *     responses:
 *       200:
 *         description: all the airports
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Airport'                 
 */
app.get('/airports', (req, res) => {
    let num = req.query.page + 99
    let filtervalue = req.query.filter
    if(filtervalue && num) {
        res.send(airports.slice(num - 99, num).map(airport => airport[filtervalue]))
    } else if(num && !filtervalue){
        res.send(airports.slice(num - 100, num))
    } else if(!num && filtervalue){
        res.send(airports.map(airport => airport[filtervalue]))
    } else {
        res.send(airports)
    }
})

/**
 * @swagger
 * /airports:
 *   post:
 *    summary: Adds a list of airports
 *    description: Ability to add multiple airports at once
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Airport'                 
 */
app.post('/airports', (req, res) => {
    let icao = "icao"
    let index = binarySearch(airports.map(airport => airport[icao]), req.body[icao])
    console.log(index)
    airports.splice(index, 0, req.body)
    res.send(airports[index])
})

/**
 * @swagger
 * /airports/{id}:
 *   get:
 *     summary: returns an array of airports
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: all the airports
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Airport'                 
 */
app.get('/airports/:id', (req, res) => {
    const id = req.params.id  
    const index = airports.findIndex(x => x.icao == id)
    res.send(airports[index])
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}))




module.exports = app