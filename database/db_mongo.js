const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
// Invocamos a dotenv
require("dotenv/config");
const url = process.env.API_URL;
const dbName = process.env.DBNAME;

class Mongo {

  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    //creando propiedades de la clase para que sean dinamicas
  }

  async connect() {
    console.log('connecting to database ' + this.dbName + ' with URL ' + this.url);
    this.client = await MongoClient.connect(this.url);
    this.db = this.client.db(this.dbName);
    console.log('connected')
  }

  async getCollection(name) {
    this.results = await this.db.collection(name).find({}).toArray();//me devuelve datos de una tabla 
    return this.results
  }

  async getById(id,name) {

    try {

      const collection = this.db.collection(name);//aca le digo como se llama la tabla
      const filter = { _id: new ObjectID(id) }

      const result = await collection.findOne(filter);
      console.log(result)


      return result
    } catch (err) {
      console.log(err)
    }
    finally {
      await this.client.close();
    }
  }

  async delete(id,name) {

    try {
      console.log(id)
      const collection = this.db.collection(name);
      const filter = { _id: new ObjectID(id) };
      const result = await collection.deleteOne(filter);
    } finally {
      await this.client.close();
    }
  }


  async updateOne(doc,id,name){

    try {
     
      const collection = this.db.collection(name);
      const filter= { _id: new ObjectID(id) };
      console.log(doc)
      
      const result = await collection.updateOne(filter, { $set: doc });

    } finally {
      await this.client.close();
    }
  } 

  async insert(doc,name) {
    try {
      console.log(doc)
      const persona = this.db.collection(name);
      const result = await persona.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await this.client.close();
    }
  } //para enviar datos a la base

  disconnect() {
    this.client.close();
  }
}

module.exports = { Mongo };
// module.exports = {ObjectID};

