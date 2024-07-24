
const { MongoClient, ServerApiVersion } = require('mongodb')
const { URI } = require("../config/index");


class DatabaseService {
  client
  db
  constructor() {
    this.client = new MongoClient(URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true
      }
    })
    this.db = this.client.db('SaleManagement')
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      console.log('An error occurred', err)
      throw err
    }
  }

  get users() {
    return this.db.collection('users')
  }

}



const db = new DatabaseService()
module.exports = { db }