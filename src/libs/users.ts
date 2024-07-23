import http from "k6/http";
import { check, fail } from 'k6';
//@ts-ignore
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
//@ts-ignore
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { md5 } from "k6/crypto";
export class Users {
  private config: any;
  private name: string;
  private organizationUser: string;
  private apiEndpoint: string;
  private messageEndpoint: string;
  private apiVersion: string;

  constructor() {
    const workDir = `${__ENV.PWD}`;
    const envConfigFilePath = `${workDir}/config/env/${__ENV.ENV}.json`;
    this.config = this.loadConfig(envConfigFilePath);
    this.name = this.config.environmentName;
    this.organizationUser = this.config.organizationUser;
    this.apiEndpoint = this.config.endpoints.api;
    this.messageEndpoint = this.config.endpoints.message;
    this.apiVersion = this.config.apiVersion;
  }
  loadConfig(filePath: string) {
    try {
      return JSON.parse(open(filePath));
    } catch (error) {
      console.error('Error reading environment config:', error);
      throw error;
    }
  }
  getInfo(userId: string, bondAccessToken: string){
    const params = {
      headers: {
        Authorization: `Bearer ${bondAccessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      tags: {
        name: 'getUserInfo'
      }
    }
    const url = `https://${this.apiEndpoint}/${this.apiVersion}/user_management/users/${userId}`
    const res = http.get(url, params)
    const status = check(res, {
      'get user info success': r => r.status === 200
    })
    if(!status){
      fail(`Unexpected status for ${url}, received ${res.status}, message ${res.status_text}`)
    } else{
      const body = JSON.parse(res.body as string);
      return body;
    }
  }
  getUserStatus(matrixAccessToken: string, filter=0, timeout=0, since="s22596068_859439_0_2324718_1_107535_1_1338739_0_1"){
    console.log(`getUserStatus: ${matrixAccessToken}`)
    const params = {
      headers: {
        Authorization: `Bearer ${matrixAccessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      tags: {
        name: 'getUserStatus'
      }
    }
    const url = `https://${this.messageEndpoint}/_matrix/client/r0/sync?filter=${filter}&timeout=${timeout}&since=${since}`
    const res = http.get(url, params)
    const status = check(res, {
      'get user status success': r => r.status === 200
    })
    if(!status){
      fail(`Unexpected status for ${url}, received ${res.status}, message ${res.status_text}`)
    } else{
      const body = JSON.parse(res.body as string);
      return body;
    }
  }
  createGroupwithUsers(primaryUserBondAccessToken: string, memberUserId: string){
    const payload = JSON.stringify({
      clients: [],
      clientProfiles: [],
      otherUsers: [
        {
          id: memberUserId,
          channel: ''
        }
      ],
      type: 'ONE_TO_ONE',
      includeMe: true
    })
    const params = {
      headers: {
        Authorization: `Bearer ${primaryUserBondAccessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      }
    const url = `https://${this.apiEndpoint}/${this.apiVersion}/integration/rooms`
    const res = http.post(url, payload, params)
    const status = check(res, {
      'create group with users success': r => r.status === 200
    })
    if(!status){
      fail(`Unexpected status for ${url}, received ${res.status}, message ${res.status_text}`)
    } else{
      const body = JSON.parse(res.body as string);
      return body;
    }
  }
  sendMessage(primaryUserMatrixToken: string, roomID: string, message: string, expectDLPRejected=false){
    const ramdomMessageId = randomIntBetween(11111111111111, 9999999999999)
    const payload = JSON.stringify({
      'org.matrix.msc1767.text': message,
      body: message,
      msgtype: 'm.text'
    })
    const params = {
      headers: {
        Authorization: `Bearer ${primaryUserMatrixToken}`,
        'Content-Type': 'application/json'
      },
      tags: {
        name: 'userTextMessageToGroup'
      }
    }
    const url = `https://${this.messageEndpoint}/_matrix/client/r0/rooms/${roomID}/send/m.room.message/m${ramdomMessageId}.0`
    const res = http.put(url, payload, params)
    const status = check(res,{
      'send message to group status is 200':(r) => r.status === (expectDLPRejected ? 403 : 200),
    })
    if (!status) {
      fail(`Unexpected status for ${url}, received ${res.status}, message ${res.status_text}`)
    } else {
      if (!res.body) fail('No body in response')
      try {
        const body = JSON.parse(res.body as string)
        const eventId = body['event_id']
        check(res,{
          'send message to group success': () => eventId !== null
        })
        return body
      } catch (e) {
        fail('Error parsing response body')
      }
    }
  }
  sendAttachment(primaryUserMatrixToken: string, roomId: string, fileName: string, fileBinaryContent: string, fileContentType: string, msgType = "m.file", expectDLPRejected=false){
    const ramdomMessageId = randomIntBetween(11111111111111, 9999999999999)
    const payload = JSON.stringify({
      msgtype: `${msgType}`,
      body: `${fileName}`,
      filename: `${fileName}`,
      channel: '',
      url: `${fileBinaryContent}`,
      info: {
        mimetype: fileContentType,
      }
    })
    const params = {
      headers: {
        Authorization: `Bearer ${primaryUserMatrixToken}`,
        'Content-Type': 'application/json'
      },
      tags: {
        name: 'userSendAttachmentFileToGroup'
      }
    }
    const url = `https://${this.messageEndpoint}/_matrix/client/r0/rooms/${roomId}/send/m.room.message/m${ramdomMessageId}.0`
    const res = http.put(url, payload, params)
    const status = check(res, {
      'send attachment to whatsapp status is 200':() => res.status === 200,
    })
    if (!status) {
      fail(`Unexpected status for ${url}, received ${res.status}, message ${res.status_text}`)
    } else {
      const body = JSON.parse(res.body as string)
      const eventId = body['event_id']
      check(res,{
        'send attachment to whatsapp success': () => eventId !== null
      })
      return body
    }
  }
  login1(companyName: string, username: string, deviceId: string){
    const payload = JSON.stringify({})
    const params = {
      headers: {
        authorization: `DigestLeapXpert username="${username}",company="${companyName}",realm="LeapXpert",deviceUniqueIdentifier="${deviceId}"`,
        'content-type': 'application/json',
      },
      tags: {
        name: 'userLogin1'
      }
    }
    const url = `https://${this.apiEndpoint}/${this.apiVersion}/authentication/login`
    const res = http.post(url, payload, params)
    const status = check(res, {
      'User: Login 1 successful (Status 200)': (r) => r.status === 401,
    })
    if (!status) {
      fail(`Unexpected status for ${url}, received ${res.status}, message: userLogin1 ${res.status_text}`)
    } else {
      const headersUserLogin1 = res.headers
      const wwwAuthenticateHeader = headersUserLogin1['Www-Authenticate']
      check(res, {
        'User: Login 1 successful': (r) => wwwAuthenticateHeader.includes('DigestLeapXpert'),
      })
      return res.headers
    }
  }
  login2(companyName: string, userName: string, deviceId: string, nonce: string, qop: string, nc: string, cnonce: string, uri: string, response: string){
    const payload = JSON.stringify({})
    const params = {
      headers: {
        authorization: `DigestLeapXpert username="${userName}",company="${companyName}",realm="${companyName}",nonce="${nonce}",qop="${qop}",deviceUniqueIdentifier="${deviceId}",nc="${nc}",cnonce="${cnonce}",uri="${uri}",algorithm="md5",response="${response}"`,
        'content-type': 'application/json',
      },
      tags: {
        name: 'userLogin2'
      }
    };
    const url = `https://${this.apiEndpoint}/${this.apiVersion}/authentication/login`
    const res = http.post(url, payload, params)
    const status = check(res, {
      'User: Login 2 successful (Status 200)': (r) => r.status === 200,
    })
    if (!status) {
      fail(`Unexpected status for ${url}, received ${res.status}, message: userLogin2 ${res.status_text}`)
    } else {
      const bodyUserLogin2 = JSON.parse(res.body as string)
      const resMessage = bodyUserLogin2['message']
      check(res, {
        'User: Login 2 successful': (r) => resMessage === 'Success',
      })
      return bodyUserLogin2
    }
  }
  generateResponse(userName: string, password: string, realm: string, nonce: string, cnonce: string, qop: string){
    const ha1 = `${userName}:${realm}:${password}`
    const ha1Hash = md5(ha1, 'hex')
    const method = 'POST'
    const uri = '/v1/authentication/login'
    const body = md5('{}', 'hex')
    const ha2 = `${method}:${uri}:${body}`
    const ha2Hash = md5(ha2, 'hex')
    const nextncstring = '00000002'
    const response = `${ha1Hash}:${nonce}:${nextncstring}:${cnonce}:${qop}:${ha2Hash}`
    const responseHash = md5(response, 'hex')
    return responseHash
  }
  mfaVerify(ticket: string, passcode: string, userId: string, companyId: string, role: string){
    const payload = JSON.stringify({
      ticket: ticket,
      passcode: passcode,
      userId: userId,
      companyId: companyId,
      role: role,
    })
    const params = {
      headers: {
        'content-type': 'application/json',
      },
      tags: {
        name: 'mfaVerify'
      }
    }
    const url = `https://${this.apiEndpoint}/${this.apiVersion}/authentication/login/mfa/verify`
    const res = http.post(url, payload, params)
    const status = check(res, {
      'User: MFA verification successful (Status 200)': (r) => r.status === 200,
    })
    if (!status) {
      fail(`Unexpected status for ${url}, received ${res.status}, message: mfaVerify ${res.status_text}`)
    } else {
      const bodyMfaVerify = JSON.parse(res.body as string)
      const resMessage = bodyMfaVerify['message']
      check(res, {
        'User: MFA verification successful': (r) => resMessage === 'Success',
      })
      return bodyMfaVerify
    }
  }
  getDevices(accessToken: string, deviceId: string, userId: string){
    const payload = JSON.stringify({
      device: {
        uniqueIdentifier: deviceId,
        hardwareIdentifier: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        osIdentifier: 'MacIntel',
        resolution: '1920x1080',
        formFactor: 'DESKTOP',
        platform: 'WEB',
        publicEncryptionKey: '-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhWcZ9+VlBNmKVSwRjfmY\nuZ3XCs4p+jRzs3bhmdSKIQnliP1ShcJ5iY3URdERz3hyT0OVfbLzO57+83yOcDoa\njIMHWM/0PAcosYZjo2E++KeGQZFSYWG3Q5Z9bzqTgxfubTPfiNHJwZJeb4UhKM6G\nSWzbvOgLwjZ/TGEAgy3lVf6ckYTPfNyw/Hxlrrx01Wj3Q5KlQZm7aa29RCuhTAH+\nDAH7+ll18Oa80osaHu+nWC6V7qY0TSnJi8WolI66slHL6A8fEvrj/ih17tkxfk7j\nU3uHq4iyAtbH4mISd9LGQIQWwGPvcNwbIEPJCNBxRgIelA8w6ppIEmz76bmidhag\n0wIDAQAB\n-----\n',
        applications: [
          {
            application: {
              id: 'lxp-web',
              bundleIdentifier: 'com.leapxpert.manager',
              platform: 'WEB',
            },
            applicationVersion: '1.12.0',
            pushTokens: [],
          },
        ],
        ownerId: userId,
      },
    })
    const params = {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      tags: {
        name: 'getDevices'
      }
    }
    const url = `https://${this.apiEndpoint}/${this.apiVersion}/device_management/devices`
    const res = http.post(url, payload, params)
    const status = check(res, {
      'User: Devices retrieval successful (Status 200)': (r) => r.status === 200,
    })
    if (!status) {
      fail(`Unexpected status for ${url}, received ${res.status}, message: getDevices ${res.status_text}`)
    } else {
      const bodyGetDevices = JSON.parse(res.body as string)
      const resMessage = bodyGetDevices['message']
      check(res, {
        'User: Devices retrieval successful': (r) => resMessage === 'Success',
      })
      return bodyGetDevices
    }
  }
}
