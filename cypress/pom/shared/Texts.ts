/// <reference types="cypress"/>
export const CommonTexts = {
    catalogPageTitle: 'UnIC Catalog',
    resetFiltersButton: 'Reset filters',
    tableDomainTooltip: 'The domain refers to the specific thematic field in which the variables are collected or applied.',
    tableEntityTooltip: 'The entity refers to the object to which the variable is associated (e.g. the variable “age” is associated with “patient”). The entity describes the context or level to which the data pertains.',
    createdOnTooltip: (object: string) => `Creation date of the dictionary for this ${object}`,
    updatedOnTooltip: (object: string) => `Date of the most recent update of the dictionary for this ${object}`,
  };
  