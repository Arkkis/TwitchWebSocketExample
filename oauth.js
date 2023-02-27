import { GetAppUrl, GetToken, SetAppUrl, SetToken } from "./shared.js";

export function OauthRedirectHandler() {
  const tokenHash = document.location.hash;

  if (tokenHash.includes("#access_token=")) {
    const token = tokenHash.split("#access_token=")[1].split("&")[0];
    SetToken(token);
    window.location.replace(`${GetAppUrl()}`);
  } else {
    SetAppUrl(window.location.href);
  }

  if (GetToken() === null) {
    throw new Error("Not logged in");
  }
}
