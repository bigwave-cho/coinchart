import { atom } from 'recoil';
// Atom 만들기
export const isDartAtom = atom({
  key: 'isDark',
  default: JSON.parse(window.localStorage.getItem('CoinChartDarkMode')!),
});

export const scrollH = atom({
  key: 'scrollH',
  default: { hegiht: 0, page: 1 },
});
