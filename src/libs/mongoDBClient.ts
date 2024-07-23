//@ts-ignore
import xk6_mongo from 'k6/x/mongo';

// MongoDB client class
export class MongoClient {
  private mongoDBHost: string;
  private mongoDBPort: number;
  private mongoDBName: string;
  private client: xk6_mongo.Client | null;

  // Constructor to initialize MongoDB connection settings
  constructor(mongoDBHost: string, mongoDBPort: number = 27017, mongoDBName: string = 'leapXpert') {
    this.mongoDBHost = mongoDBHost;
    this.mongoDBPort = mongoDBPort;
    this.mongoDBName = mongoDBName;
    this.client = null; // MongoDB client instance
  }

  // Private method to establish MongoDB connection
  private connect() {
    if (!this.client) {
      // Construct MongoDB connection string
      const connectionString = `mongodb://${this.mongoDBHost}:${this.mongoDBPort}/${this.mongoDBName}`;
      // Create a new MongoDB client instance
      this.client = xk6_mongo.newClient(connectionString);
    }
    // Return MongoDB client instance
    return this.client;
  }


  // Private method to disconnect from MongoDB
  private disconnect() {
    if (this.client) {
      this.client.close(); // Close MongoDB client connection
      // this.client = null;
    }
  }

  // Find all documents in a collection
  findAll(dbName: string, collectionName: string) {
    try {
      const client = this.connect();
      const results = client.findAll(dbName, collectionName); // Fetch all documents
      return results; // Return query results
    } catch (error) {
      console.error("Error finding documents:", error); // Log error if query fails
      throw error; // Propagate error
    }
    // finally {
    //   this.disconnect();
    // }
  }

  // Find a single document in a collection
  findOne(dbName: string, collectionName: string, filter: object) {
    try {
      const client = this.connect();
      const result = client.findOne(dbName, collectionName, filter); // Find one document
      return result; // Return query result
    } catch (error) {
      console.error("Error finding document:", error); // Log error if query fails
      throw error; // Propagate error
    }
  }

  // Delete a single document from a collection
  deleteOne(dbName: string, collectionName: string, filter: object) {
    try {
      const client = this.connect();
      const result = client.deleteOne(dbName, collectionName, filter); // Delete one document
      return result; // Return deletion result
    } catch (error) {
      console.error("Error deleting document:", error); // Log error if deletion fails
      throw error; // Propagate error
    }
  }

  // Delete multiple documents from a collection
  deleteMany(dbName: string, collectionName: string, filter: object) {
    try {
      const client = this.connect();
      const result = client.deleteMany(dbName, collectionName, filter); // Delete multiple documents
      return result; // Return deletion result
    } catch (error) {
      console.error("Error deleting documents:", error); // Log error if deletion fails
      throw error; // Propagate error
    }
  }

  // Count documents in a collection
  countDocuments(dbName: string, collectionName: string, filter: object) {
    try {
      const client = this.connect();
      const count = client.countDocuments(dbName, collectionName, filter); // Count documents
      return count; // Return count result
    } catch (error) {
      console.error("Error counting documents:", error); // Log error if counting fails
      throw error; // Propagate error
    }
  }

  // Find distinct values in a collection
  distinct(dbName: string, collectionName: string, key: string, filter: object) {
    try {
      const client = this.connect();
      const results = client.distinct(dbName, collectionName, key, filter); // Find distinct values
      return results; // Return distinct values
    } catch (error) {
      console.error("Error distincting documents:", error); // Log error if distinct operation fails
      throw error; // Propagate error
    }  
  }

  // Drop a collection from the database
  dropCollection(dbName: string, collectionName: string) {
    try {
      const client = this.connect();
      const error = client.dropCollection(dbName, collectionName); // Drop collection
      return error; // Return error (if any)
    } catch (error) {
      console.error("Error dropping collection:", error); // Log error if dropping collection fails
      throw error; // Propagate error
    }
  }

  // Find a document and update it in a collection
  findOneAndUpdate(dbName: string, collectionName: string, filter: object, update: object) {
    try {
      const client = this.connect();
      const result = client.findOneAndUpdate(dbName, collectionName, filter, update); // Find and update document
      return result; // Return update result
    } catch (error) {
      console.error("Error updating document:", error); // Log error if update fails
      throw error; // Propagate error
    }
  }

  // Insert a single document into a collection
  insertOne(dbName: string, collectionName: string, doc: object) {
    try {
      const client = this.connect();
      const error = client.insertOne(dbName, collectionName, doc); // Insert one document
      return error; // Return error (if any)
    } catch (error) {
      console.error("Error inserting document:", error); // Log error if insertion fails
      throw error; // Propagate error
    }
  }

  // Insert multiple documents into a collection
  insertMany(dbName: string, collectionName: string, docs: object[]) {
    try {
      const client = this.connect();
      const error = client.insertMany(dbName, collectionName, docs); // Insert multiple documents
      return error; // Return error (if any)
    } catch (error) {
      console.error("Error inserting documents:", error); // Log error if insertion fails
      throw error; // Propagate error
    }
  }

  // Update a single document in a collection
  updateOne(dbName: string, collectionName: string, filter: object, update: object) {
    try {
      const client = this.connect();
      const error = client.updateOne(dbName, collectionName, filter, update); // Update one document
      return error; // Return error (if any)
    } catch (error) {
      console.error("Error updating document:", error); // Log error if update fails
      throw error; // Propagate error
    }
  }

  // Update multiple documents in a collection
  updateMany(dbName: string, collectionName: string, filter: object, update: object) {
    try {
      const client = this.connect();
      const error = client.updateMany(dbName, collectionName, filter, update); // Update multiple documents
      return error; // Return error (if any)
    } catch (error) {
      console.error("Error updating documents:", error); // Log error if update fails
      throw error; // Propagate error
    }
  }
}
