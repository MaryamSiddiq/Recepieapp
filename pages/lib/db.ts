// lib/mongodb.ts
import { MongoClient } from 'mongodb';

// Ensure that the URI is provided
const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

// Create MongoClient instance without options
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In development mode, use a global variable to avoid multiple connections
if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect().then(() => {
      console.log('MongoDB connection established in development mode.');
      return client;  // Return client to satisfy Promise<MongoClient>
    }).catch((error) => {
      console.error('Error connecting to MongoDB in development mode:', error);
      throw error; // Ensure the promise is rejected
    });
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient instance
  client = new MongoClient(uri);
  clientPromise = client.connect().then(() => {
    console.log('MongoDB connection established in production mode.');
    return client;  // Return client to satisfy Promise<MongoClient>
  }).catch((error) => {
    console.error('Error connecting to MongoDB in production mode:', error);
    throw error; // Ensure the promise is rejected
  });
}

export default clientPromise;
