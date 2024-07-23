import { DataProvider } from "../providers/DataProvider";
import { Users } from "../libs/users";

const dataProvider = new DataProvider();
const user = new Users();

export async function getUserStatus() {
  try {
    // Fetch a random user from the data provider
    const randomUser = await dataProvider.getRandomUser();

    // Parse the JSON information of the random user
    const userInfo = JSON.parse(randomUser.json_info);

    // Extract the user bond access token from the parsed JSON data
    const userBondAccessToken = userInfo.bond_access_token;

    // Retrieve the user status
    const userStatus = await user.getUserStatus(userBondAccessToken);
    console.log('User status:', userStatus);
  } catch (error) {
    console.error('Error getting user status:', error);
  }
}

export async function getUserInfo() {
  try {
    // Fetch a random user from the data provider
    const randomUser = await dataProvider.getRandomUser();

    // Parse the JSON information of the random user
    const userInfo = JSON.parse(randomUser.json_info);

    // Extract the user ID and bond access token from the parsed JSON data
    const userId = userInfo.user_id;
    const userBondAccessToken = userInfo.bond_access_token;

    // Retrieve additional information about the user using the extracted user ID and bond access token
    const userInfoResult = await user.getInfo(userId, userBondAccessToken);
    console.log('User info:', userInfoResult);
  } catch (error) {
    console.error('Error getting user info:', error);
  }
}

export async function createGroupWithUser(memberUserIds: string){
  const randomUser = dataProvider.getRandomUser();
  const userInfo = JSON.parse(randomUser.json_info);
  const bondAccessToken = userInfo.bond_access_token;
  user.createGroupwithUsers(bondAccessToken, memberUserIds)
}

export async function userCreateGroupWithUsers(){
  const memberUserIds = dataProvider.getRandomUser().user_id;
  createGroupWithUser(memberUserIds)
}
