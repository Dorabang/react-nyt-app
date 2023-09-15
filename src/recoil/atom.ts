import { atom } from 'recoil';

export const currentPageState = atom<'Home' | 'Scrape'>({
  key: 'currentPageState',
  default: 'Home',
});

export const paginationState = atom<number>({
  key: 'paginationState',
  default: 0,
});
