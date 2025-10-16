/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablePage } from 'cypress/pom/pages/VariablePage';

describe('Page d\'une variable - Vérifier la fonctionnalité de la recherche Categories', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariableEntity(data.variableUnicproduct);
  };

  it('Table filtered by Value', () => {
    setupTest();
    VariablePage.actions.typeCategorySearchInput('psl');
    VariablePage.validations.categories.shouldShowCategoryInTable('MDS', false/*shouldExist*/);
    VariablePage.validations.categories.shouldShowCategoryInTable('PSL');
  });

  it('Table filtered by Label en', () => {
    setupTest();
    VariablePage.actions.typeCategorySearchInput('Product');
    VariablePage.validations.categories.shouldShowCategoryInTable('MDS', false/*shouldExist*/);
    VariablePage.validations.categories.shouldShowCategoryInTable('PSL');
  });

  it('Table filtered by Label fr', () => {
    setupTest();
    VariablePage.actions.typeCategorySearchInput('produit');
    VariablePage.validations.categories.shouldShowCategoryInTable('MDS', false/*shouldExist*/);
    VariablePage.validations.categories.shouldShowCategoryInTable('PSL');
  });
});
