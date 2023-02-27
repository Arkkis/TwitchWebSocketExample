import {
  SubscribeRedeem,
  SubscribeRaid,
  SubscribeFollow,
  SubscribeBits,
  SubscribeSubscribe,
} from "./subscriptions.js";
import { SetSessionId, SetUserInfo } from "./shared.js";
import { FetchUserInfo, SubscribeTopic } from "./api.js";
import { OauthRedirectHandler } from "./oauth.js";

OauthRedirectHandler();

const socket = new WebSocket("wss://eventsub-beta.wss.twitch.tv/ws");
const keepAliveInSeconds = 50;
let lastKeepAlive = new Date();

socket.onopen = function (event) {
  console.log("WebSocket connection opened: ", event);
};

setInterval(() => {
  if (Date.now() > lastKeepAlive.getTime() + keepAliveInSeconds * 1000) {
    console.log("Connection is probably lost");
  }
}, keepAliveInSeconds * 1000);

// keepalive
socket.onmessage = async function (event) {
  const message = JSON.parse(event.data);
  const messageType = message.metadata.message_type;
  if (messageType === "session_keepalive") {
    lastKeepAlive = new Date();
  }
};

// session_welcome
socket.addEventListener(
  "message",
  async function (event) {
    const message = JSON.parse(event.data);
    const messageType = message.metadata.message_type;

    if (messageType === "session_welcome") {
      console.log("Welcome: ", message);
      SetSessionId(message.payload.session.id);
      await SetUserInfo(FetchUserInfo());
      await SubscribeTopic(SubscribeRedeem());
      await SubscribeTopic(SubscribeRaid());
      await SubscribeTopic(SubscribeFollow());
      await SubscribeTopic(SubscribeBits());
      await SubscribeTopic(SubscribeSubscribe());
    }
  },
  false
);

// notification
socket.addEventListener(
  "message",
  async function (event) {
    const message = JSON.parse(event.data);
    console.log(message);
  },
  false
);

socket.onclose = function (event) {
  console.log("WebSocket connection closed: ", event);
};

socket.onerror = function (error) {
  console.error("WebSocket error: ", error);
};
