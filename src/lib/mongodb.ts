import { MongoClient, type Collection } from 'mongodb';

interface LinkClickDocument {
  _id: string;
  clicks: number;
}

const globalWithMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

export async function getLinkClicksCollection(): Promise<Collection<LinkClickDocument>> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  globalWithMongo.mongoClientPromise ??= new MongoClient(uri).connect();
  const client = await globalWithMongo.mongoClientPromise;

  return client.db().collection<LinkClickDocument>('link_clicks');
}
