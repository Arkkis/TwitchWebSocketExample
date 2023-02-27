let userInfo = {};
let sessionId = "";
let clientId = "<<CLIENTID>>";

export function GetUserInfo() {
  return userInfo;
}

export async function SetUserInfo(newUserInfo) {
  userInfo = await newUserInfo;
}

export function GetSessionId() {
  return sessionId;
}

export function SetSessionId(newSessionId) {
  sessionId = newSessionId;
}

export function GetToken() {
  return localStorage.getItem("eventAppToken");
}

export function SetToken(newToken) {
  localStorage.setItem("eventAppToken", newToken);
}

export function GetAppUrl() {
  return localStorage.getItem("eventAppUrl");
}

export function SetAppUrl(newUrl) {
  localStorage.setItem("eventAppUrl", newUrl);
}

export function GetClientId() {
  return clientId;
}
