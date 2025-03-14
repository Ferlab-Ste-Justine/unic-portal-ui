import { format } from 'date-fns';
import { enCA, frCA } from 'date-fns/locale';

import { LANG } from '@/types/constants';

const formatDate = (value: number | string | Date, lang?: LANG): string => {
  try {
    const newDate = new Date(value);
    const defaultLocaleFormat = 'yyyy-MM-dd';
    const localeFormat = lang === LANG.FR ? 'dd-MM-yyyy' : defaultLocaleFormat;
    const locale = lang === LANG.FR ? frCA : enCA;
    const date = format(newDate, localeFormat, { locale });
    return date;
  } catch (error) {
    console.error('[formatDate] value:', value, 'error:', error);
    return `${value}` || '';
  }
};

export default formatDate;
