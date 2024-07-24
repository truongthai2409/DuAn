const { db } = require('../services/db.service')

exports.insertUser = async () => {
    const user = await db.users.insertOne({
        id: 1,
        name: 'Nguyen'
    })
    return user
}

// module.exports = {insertUser}