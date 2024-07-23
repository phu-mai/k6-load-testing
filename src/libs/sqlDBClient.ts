//@ts-ignore
import sql from 'k6/x/sql';

export class SqlDBClient {
  private dbType: string;
  private sqlDBHost: string;
  private sqlDBPort: number;
  private sqlDBName: string;
  private sqlDBUserName: string;
  private sqlDBPassword: string;
  private dbConnectionString: string;
  private dbConnection: any;

  // Constructor to initialize SQL database connection settings
  constructor(
    sqlDBName: string,
    sqlDBUserName: string,
    sqlDBPassword: string,
    sqlDBHost: string,
    sqlDBPort: number = 5432,
    dbType: string = 'postgres'
  ) {
    this.dbType = dbType;
    this.sqlDBName = sqlDBName;
    this.sqlDBUserName = sqlDBUserName;
    this.sqlDBPassword = sqlDBPassword;
    this.sqlDBHost = sqlDBHost;
    this.sqlDBPort = sqlDBPort;
    this.dbConnectionString = this.constructConnectionString();
    this.dbConnection = this.connect(); // Establish a connection to the database
  }

  // Method to construct the connection string based on the dbType
  private constructConnectionString(): string {
    switch (this.dbType) {
      case 'postgres':
        return `postgres://${this.sqlDBUserName}:${this.sqlDBPassword}@${this.sqlDBHost}:${this.sqlDBPort}/${this.sqlDBName}?sslmode=disable`;
      case 'mysql':
        return `${this.sqlDBUserName}:${this.sqlDBPassword}@tcp(${this.sqlDBHost}:${this.sqlDBPort})/${this.sqlDBName}`;
      case 'mssql':
        return `server=${this.sqlDBHost};database=${this.sqlDBName};user id=${this.sqlDBUserName};password=${this.sqlDBPassword}`;
      default:
        throw new Error(`Unsupported database type: ${this.dbType}`);
    }
  }

  // Method to establish a connection to the database
  private connect() {
    try {
      return sql.open(this.dbType, this.dbConnectionString); // Open database connection
    } catch (error) {
      console.error('Error opening database connection:', error); // Log error if connection fails
      throw error; // Propagate error
    }
  }

  // Method to close the database connection
  close() {
    try {
      this.dbConnection.close(); // Close database connection
    } catch (error) {
      console.error('Error closing database connection:', error); // Log error if closing fails
    }
  }

  // Method to get a random user from the database
  getRandomUser() {
    try {
      const query = 'SELECT * FROM users ORDER BY RANDOM() LIMIT 1'; // Query to fetch a random user
      const result = sql.query(this.dbConnection, query); // Execute query
      return result; // Return the result
    } catch (error) {
      console.error('Error fetching random user:', error); // Log error if fetching fails
      throw error; // Propagate error
    }
  }
}
