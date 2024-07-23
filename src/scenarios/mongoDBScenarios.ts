//@ts-ignore
import { MongoClient } from "../libs/mongoDBClient";

// Environment variable configuration
// Export these variables in your environment or in a .env file before running the script
// export MONGODB_USER=your_mongodb_username
// export MONGODB_PASSWORD=your_mongodb_password
// export MONDODB_HOST=your_mongodb_host
// export VUS=1 ITERATIONS=1 MAX_DURATION=30000 EXECUTOR='per-vu-iterations' ENV=performance
// Configuration constants
const mongoDBPort = parseInt(__ENV.MONGODB_PORT) || 27017;
const mongoDBUser = __ENV.MONGODB_USER || 'lxp';
const mongoDBPassword = __ENV.MONGODB_PASSWORD || 'skLmSaMzoc3H';
const mongoDBHost = `${mongoDBUser}:${mongoDBPassword}@localhost`;
const dbName = 'leapXpert';

// Reusable MongoDB client
const client = new MongoClient(mongoDBHost, mongoDBPort);

// Function to find all documents in a collection
export function findAllDocuments() {
  const collectionName = 'DBCompany';
  try {
    const results = client.findAll(dbName, collectionName);
    console.log('Documents found:', results);
  } catch (error) {
    console.error('Error finding documents:', error);
  }
}

// Function to find a specific document in a collection
export function findDocument() {
  const collectionName = 'DBUser';
  const filter = { name: 'moana' };
  try {
    const result = client.findOne(dbName, collectionName, filter);
    console.log('Document found:', result);
  } catch (error) {
    console.error('Error finding document:', error);
  }
}

// Function to count documents in a collection
export function countDocument() {
  const collectionName = 'DBUser';
  const filter = {};
  try {
    const result = client.countDocuments(dbName, collectionName, filter);
    console.log('Document count:', result);
  } catch (error) {
    console.error('Error counting document:', error);
  }
}
