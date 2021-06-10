import { Platform } from 'react-native';

const access = 'limited';

export const config = {
  access: access,
  market:
    Platform === "ios" ? 'App Store' : 'Google Play',
  market_link:
    Platform === "ios" ? 'https://www.apple.com/ru/app-store/' : 'https://play.google.com/store',
  postsLimits: {
    semD: access === 'full' ? 5 : 1,
    kkz: access === 'full' ? 5 : 6,
    sokrsokr: access === 'full' ? 6 : 9
  }
};