import { ContactSelf, Friendship, Message } from 'wechaty';
import * as PUPPET from 'wechaty-puppet';

export const WechatyEvent = {
  Login: 'login',
  Logout: 'logout',
  Ready: 'ready',
  Message: 'message',
  Scan: 'scan',
  Friendship: 'friendship',
}

export interface WechatyLoginEventPayload {
  bot: ContactSelf,
}

export interface WechatyLogoutEventPayload {
  bot: ContactSelf,
  reason: string,
}

export interface WechatyMessageEventPayload {
  message: Message,
}

export interface WechatyScanEventPayload {
  qrcode: string,
  status: PUPPET.types.ScanStatus,
  data?: string,
}

export interface WechatyFriendshipEventPayload {
  friendship: Friendship,
}
