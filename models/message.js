let connection = require('../config/db')

class Message {

    static create (content, callback) {
        connection.query('INSERT INTO message SET content = ?, created_at = ?',
            [content, new Date()], (err,result) => {
                if (err) throw err
                callback(result)
            })
    }
}

module.exports = Message