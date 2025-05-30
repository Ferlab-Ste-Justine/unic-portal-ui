/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablePage } from 'cypress/pom/pages/VariablePage';

beforeEach(() => {
  cy.login();
  cy.visitVariableEntity(data.variableUnicproduct);
});

describe('Page d\'une variable - Vérifier la fonctionnalité de la recherche Categories', () => {
  it('Table filtered by Value', () => {
    VariablePage.actions.typeCategorySearchInput('psl');
    VariablePage.validations.categories.shouldShowCategoryInTable('MDS', false/*shouldExist*/);
    VariablePage.validations.categories.shouldShowCategoryInTable('PSL');
  });

  it('Table filtered by Label en', () => {
    VariablePage.actions.typeCategorySearchInput('Product');
    VariablePage.validations.categories.shouldShowCategoryInTable('MDS', false/*shouldExist*/);
    VariablePage.validations.categories.shouldShowCategoryInTable('PSL');
  });

  it('Table filtered by Label fr', () => {
    VariablePage.actions.typeCategorySearchInput('produit');
    VariablePage.validations.categories.shouldShowCategoryInTable('MDS', false/*shouldExist*/);
    VariablePage.validations.categories.shouldShowCategoryInTable('PSL');
  });
});
