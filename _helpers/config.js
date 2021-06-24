
const access = 'limited';

export const config = {
  access: access,
  postsLimits: {
    semD: access === 'full' ? 5 : 1,
    kkz: access === 'full' ? 5 : 6,
    sokrsokr: access === 'full' ? 6 : 9
  }
};