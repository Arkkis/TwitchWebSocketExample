import { GetUserInfo, GetSessionId } from "./shared.js";

export function SubscribeRedeem() {
  let base = SubscriptionBase();
  base.type = "channel.channel_points_custom_reward_redemption.add";
  base.condition = { broadcaster_user_id: GetUserInfo().id };
  return base;
}

export function SubscribeRaid() {
  let base = SubscriptionBase();
  base.type = "channel.raid";
  base.condition = { to_broadcaster_user_id: GetUserInfo().id };
  return base;
}

export function SubscribeFollow() {
  let base = SubscriptionBase();
  base.version = "2";
  base.type = "channel.follow";
  base.condition = {
    broadcaster_user_id: GetUserInfo().id,
    moderator_user_id: GetUserInfo().id,
  };
  return base;
}

export function SubscribeBits() {
  let base = SubscriptionBase();
  base.type = "channel.cheer";
  base.condition = { broadcaster_user_id: GetUserInfo().id };
  return base;
}

export function SubscribeSubscribe() {
  let base = SubscriptionBase();
  base.type = "channel.subscribe";
  base.condition = {
    broadcaster_user_id: GetUserInfo().id,
  };
  return base;
}

function SubscriptionBase() {
  return {
    version: "1",
    condition: {},
    transport: {
      method: "websocket",
      session_id: GetSessionId(),
    },
  };
}
