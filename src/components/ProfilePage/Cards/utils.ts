import intl from 'react-intl-universal';

export const OTHER_KEY = 'other';

export interface IOption {
  label: string;
  value: string;
}

export const removeOtherKey = (list: string[], otherValue: string) => {
  const listWithoutOtherKey = list.filter((value) => value !== OTHER_KEY);
  if (otherValue) {
    listWithoutOtherKey.push(otherValue);
  }
  return listWithoutOtherKey;
};

/**
 * Sort alphabetically options by label name and translate
 * @param options: the array of options to sort
 * @param optionsName: the string to looking for translation
 */
export const sortOptionsLabelsByName = (options: IOption[], optionsName = '') =>
  /** sort options without other key */
  [
    ...options
      .filter((option) => option.value !== OTHER_KEY)
      .sort((a, b) => {
        const aLabel = intl.get(`screen.profileSettings.cards.${optionsName}.${a.value}`);
        const bLabel = intl.get(`screen.profileSettings.cards.${optionsName}.${b.value}`);
        return aLabel < bLabel ? -1 : 1;
      }),
    ...options.filter((option) => option.value === OTHER_KEY),
  ].map((option) => ({
    value: option.value,
    label: intl.get(`screen.profileSettings.cards.${optionsName}.${option.value}`) || option.label,
  }));
