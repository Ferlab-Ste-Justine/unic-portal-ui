/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { varSingleDigit } from 'cypress/pom/shared/Utils';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
});

describe('Tableau Ressources - Vérifier la fonctionnalité de la recherche Resource', () => {
  it('Results by Code', () => {
    ResourcesTable.actions.typeResourceSearchInput('Choriobact');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Results by Description en', () => {
    ResourcesTable.actions.typeResourceSearchInput('warehouse tables');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Results by Description fr', () => {
    ResourcesTable.actions.typeResourceSearchInput('Tables d\'entrepôt');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Results by Name', () => {
    ResourcesTable.actions.typeResourceSearchInput('chorio-bact');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Results by Project PI', () => {
    ResourcesTable.actions.typeResourceSearchInput('boucoiran');
    ResourcesTable.validations.shouldShowResultsCount(varSingleDigit);
  });

  it('Results by Title', () => {
    ResourcesTable.actions.typeResourceSearchInput('entrepôt de données');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Lien Reset filters', () => {
    ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
    ResourcesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Resource type filter', () => {
    ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
    ResourcesTable.validations.shouldShowNoResultsMessage();
  });
});
