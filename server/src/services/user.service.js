const { db } = require('../services/db.service')

exports.insertCustomer = async () => {
    const customer = await db.users.insertOne({
        id: 1,
        name: 'Nguyen'
    })
    return customer;
}

