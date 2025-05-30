/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité de la recherche Table', () => {
  it('By Name', () => {
    VariablesTable.actions.typeTableFilter('Maternal_');
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableMaternalUltrasound);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });
});
