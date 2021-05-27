import { Platform } from 'react-native';

export const config = {
  access: 'full',
  market:
    Platform === "ios" ? 'App Store' : 'Google Play',
  market_link:
    Platform === "ios" ? 'https://www.apple.com/ru/app-store/' : 'https://play.google.com/store',
  postsLimits: {
    semD: 6,
    kkz: 1,
    sokrsokr: 9
  }
};