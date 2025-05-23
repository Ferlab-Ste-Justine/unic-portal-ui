import { LANG } from '@/types/constants';

import intlEn from './en';
import intlFr from './fr';

const locales = {
  [LANG.FR]: intlFr,
  [LANG.EN]: intlEn,
};

export default locales;
