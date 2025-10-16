/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Vérifier la fonctionnalité de la recherche Table', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
  };

  it('By Name', () => {
    setupTest();
    VariablesTable.actions.typeTableFilter('Maternal_');
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableMaternalUltrasound);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });
});
