import { LANG } from '@/types/constants';

const formatDate = (date?: string | null, lang: string = LANG.FR) => {
  const dateObject = date ? new Date(date) : new Date();
  // Get day, month, year, hours, and minutes
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  // Add ordinal suffix for the 1st day
  const daySuffix = day === 1 ? '1er' : day;

  // Define month names in French
  const monthNames =
    lang === LANG.FR
      ? [
          'janvier',
          'février',
          'mars',
          'avril',
          'mai',
          'juin',
          'juillet',
          'août',
          'septembre',
          'octobre',
          'novembre',
          'décembre',
        ]
      : [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
  const monthName = monthNames[month];

  // Format hours and minutes with leading zero if needed
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Combine into the final string
  return `${daySuffix} ${monthName} ${year}, ${formattedHours}h${formattedMinutes}`;
};

export default formatDate;
