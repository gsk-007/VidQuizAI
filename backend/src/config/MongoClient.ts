import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase(): Promise<void> {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log('✅ MongoDB connected');
  }
}

export function getDb(): Db {
  if (!db) {
    throw new Error('❌ Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export function getClient(): MongoClient {
  return client;
}
