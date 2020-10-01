const {Database} = require('sqlite3')
const db = new Database(':memory:')

const loader = (tableName, data, callback) => {
    if (data.length === 0) return callback(db)
    
    const datum = data.pop()
    const fields = Object.keys(datum)
    const values = Object.values(datum)
    
    db.run(`INSERT INTO ${tableName} (${fields.join(',')}) VALUES(${values.map(v => '?').join(',')});`, values, function (err) {
        if (err) throw new Error(err)
        loader(tableName, data, callback)
    })
}

module.exports = {loader, db}