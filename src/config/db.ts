import { MongoClient } from 'mongodb'

const uri = 'mongodb://localhost:27017/'
export const mongoClient = new MongoClient(uri)
