import { SqlDBClient } from '../libs/sqlDBClient';

// Environment variable configuration
// Export these variables in your environment or in a .env file before running the script
// export DB_USER=your_database_username
// export DB_PASSWORD=your_database_password
// export DB_NAME=your_database_name
// export VUS=1 ITERATIONS=1 MAX_DURATION=30000 EXECUTOR='per-vu-iterations' ENV=perf
// Configuration constants
const host = 'localhost';
const port = 5432;
const user = __ENV.DB_USER || 'postgres';
const password = __ENV.DB_PASSWORD || 'a6QpEQfYLebs';
const dbName = __ENV.DB_NAME || 'synapse';

// Reusable SQL database client
const sqlDBClient = new SqlDBClient(dbName, user, password, host, port);

// Function to get a random user from the database
export function getUserRandom() {
  try {
    // Fetch a random user from the database
    const userInfo = sqlDBClient.getRandomUser();
    // Log the random user information
    console.log('Random user:', userInfo);
  } catch (error) {
    console.error('Error fetching random user:', error);
  }
}
