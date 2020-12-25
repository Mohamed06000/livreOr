let connection = require('../config/db')
let moment = require('moment')
class Message {

    constructor(row) {
        this.row = row
    }

    get content() {
        return this.row.content
    }

    get created_at () {
        return moment(this.row.created_at)
    }

    get id() {
        return this.row.id
    }

    static create (content, callback) {
        connection.query('INSERT INTO message SET content = ?, created_at = ?',
            [content, new Date()], (err,result) => {
                if (err) throw err
                callback(result)
            })
    }

    static all(callback) {
        connection.query('SELECT * FROM message', (err, rows) => {
            if (err) throw err
            callback(rows.map((row) => new Message(row)))
        })
    }
}

module.exports = Message