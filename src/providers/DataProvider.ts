//@ts-ignore
import sql from 'k6/x/sql';

export class DataProvider {
  private environmentConfig: any;
  private dbConnection: any;
  constructor(filePath = 'config') {
    const workDir = `${__ENV.PWD}`;
    const envConfigFilePath = `${workDir}/${filePath}/env/${__ENV.ENV}.json`;
    const sqlFilePath = `${workDir}/${filePath}/data/${__ENV.ENV}.sqlite`;
  
    this.environmentConfig = this.loadConfig(envConfigFilePath);
    this.dbConnection = this.openDbConnection('sqlite3', sqlFilePath);
  }
  loadConfig(filePath: string) {
    try {
      return JSON.parse(open(filePath));
    } catch (error) {
      console.error('Error reading environment config:', error);
      throw error;
    }
  }
  checkFileExists(filePath: string) {
    try {
      const file = open(filePath);
      return true
    } catch (error) {
      console.error(`Data file not found in path ${filePath}`, error);
      return false
    }
  }
  openDbConnection(dbType: string, filePath: string) {
    try {
      this.checkFileExists(filePath)
      return sql.open(dbType, filePath);
    } catch (error) {
      console.error('Error opening database connection:', error);
      throw error;
    }
  }
  closeDbConnection() {
    try {
      this.dbConnection.close();
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }
  getEnv() {
    return this.environmentConfig.environmentName;
  }
  getUserGroup() {
    return this.environmentConfig.userGroup;
  }
  getDefaultUserPassword() {
    return this.environmentConfig.defaultUserPassword;
  }
  getWhatsappWebhookToken() {
    return this.environmentConfig.whatsappWebhookToken;
  }
  getCompany() {
    return this.environmentConfig.company;
  }
  getOrganizationUser() {
    return this.environmentConfig.organizationUser;
  }
  getEndpoints() {
    return this.environmentConfig.endpoints;
  }
  getDlpMessages() {
    return this.environmentConfig.dlpMessages;
  }
  closeConnection() {
    try {
      this.dbConnection.close();
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }
  getUserById(userId: string) {
    try {
      const query = `SELECT * FROM users WHERE user_id="${userId}";` 
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getUserByUserName(userName: string) {
    try {
      const query = `SELECT * FROM users WHERE user_name="${userName}";` 
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getClientById(clientId: string) {
    try {
      const query = `SELECT * FROM clients WHERE client_id="${clientId}";` 
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getUserByUserId(userId: string) {
    try {
      const query = `SELECT * FROM users WHERE user_id="${userId}";` 
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getRandomUserInRange(target = 1, offset = 0) {
    try {
      const query = `SELECT * FROM ( SELECT * FROM users ORDER BY user_id LIMIT ${target} OFFSET ${offset} ) AS subquery ORDER BY RANDOM() LIMIT 1;`
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getUserUserNameInRange(target = 1, offset = 0) {
    try {
      const query = `SELECT user_name FROM users LIMIT ${target} OFFSET ${offset};`
      const result = sql.query(this.dbConnection, query);
      return result.map(row => row.user_name);
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getClientByClientId(clientId: string) {
    try {
      const query = `SELECT * FROM clients WHERE client_id="${clientId}";` 
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getclientByUserName(userName: string) {
    try {
      const query = `SELECT * FROM clients WHERE user_name="${userName}";` 
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getRandomUser() {
    try {
      const query = `SELECT * FROM users ORDER BY random() LIMIT 1;`
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getRandomiMessageUser(target = 1, offset = 0) {
    try {
      const query = `SELECT * FROM users WHERE user_name LIKE 'imessage_user_disney%' ORDER BY RANDOM() LIMIT ${target} OFFSET ${offset};`
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getRandomClient() {
    try {
      const query = `SELECT * FROM clients ORDER BY random() LIMIT 1;`
      const result = sql.query(this.dbConnection, query);
      return result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }
  getDistinctRandomUsers(target = 1) {
    try {
      const distinctUsers : any[] = [];
      while (distinctUsers.length < target) {
        const randomUser = this.getRandomUser();
        if (!distinctUsers.some(user => user.user_id === randomUser.user_id)) {
          distinctUsers.push(randomUser);
        }
      }
      return distinctUsers;
    } catch (error) {
      console.error('Error fetching distinct random users:', error);
      return null;
    }
  }
  getDistinctRandomiMessageUsers(target = 1) {
    try {
      const distinctUsers : any[] = [];
      while (distinctUsers.length < target) {
        const randomUser = this.getRandomiMessageUser();
        if (!distinctUsers.some(user => user.user_id === randomUser.user_id)) {
          distinctUsers.push(randomUser);
        }
      }
      return distinctUsers;
    } catch (error) {
      console.error('Error fetching distinct random iMessage users:', error);
      return null;
    }
  }
  getDistinctRandomClients(target = 1) {
    try {
      const distinctClients : any[] = [];
      while (distinctClients.length < target) {
        const randomClient = this.getRandomClient();
        if (!distinctClients.some(client => client.client_id === randomClient.client_id)) {
          distinctClients.push(randomClient);
        }
      }
      return distinctClients;
    } catch (error) {
      console.error('Error fetching distinct random clients:', error);
      return null;
    }
  }
  updateBondAccessToken(userName: string, bondAccessToken: string) {
    try {
      const query = `UPDATE users SET json_info = json_set(json_info, '$.bond_access_token', "${bondAccessToken}") WHERE user_name = "${userName}";`
      sql.query(this.dbConnection, query);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  }
}
