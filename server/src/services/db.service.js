
const { MongoClient, ServerApiVersion } = require('mongodb')
class DatabaseService {
  client
  db
  constructor() {
    this.client = new MongoClient('mongodb://0.0.0.0:27017', {
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