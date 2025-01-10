import getStoreConfig from '@/store';
import { LANG } from '@/types/constants';

export const getDocLang = () => {
  const { store } = getStoreConfig();
  const locale = store.getState().global.lang;

  switch (locale) {
    case LANG.FR:
      return '?ljs=fr';
    case LANG.EN:
      return '?ljs=en-CA';
    default:
      return '';
  }
};

export default getDocLang();
