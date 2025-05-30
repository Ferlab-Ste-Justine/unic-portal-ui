/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablePage } from 'cypress/pom/pages/VariablePage';

beforeEach(() => {
  cy.login();
  cy.visitVariableEntity(data.variableSector);
});

describe('Page d\'une variable - Vérifier les informations affichées', () => {
  it('Titre', () => {
    VariablePage.validations.shouldHaveTitle(data.variableSector);
  });

  it('Panneau Summary - Header', () => {
    VariablePage.validations.summary.shouldHaveHeader(data.variableSector);
  });

  it('Panneau Summary - Label', () => {
    VariablePage.validations.summary.shouldHaveLabel(data.variableSector);
  });

  it('Panneau Summary - Resource', () => {
    VariablePage.validations.summary.shouldHaveResource(data.variableSector);
  });

  it('Panneau Summary - Table', () => {
    VariablePage.validations.summary.shouldHaveTable(data.variableSector);
  });

  it('Panneau Summary - Notes', () => {
    VariablePage.validations.summary.shouldNotHaveNotes();
  });

  it('Panneau Summary - Created On', () => {
    VariablePage.validations.summary.shouldHaveCreatedOn(data.variableSector);
  });

  it('Panneau Summary - Updated On', () => {
    VariablePage.validations.summary.shouldHaveUpdatedOn(data.variableSector);
  });

  it('Panneau Categories - Headers', () => {
    VariablePage.validations.categories.shouldHaveHeaders();
  });

  it('Panneau Categories - Data', () => {
    VariablePage.validations.categories.shouldHaveCategories(data.variableSector);
  });

  it('Panneau Derivation - Sources', () => {
    VariablePage.validations.derivation.shouldHaveSources(data.variableSector);
  });

  it('Panneau Derivation - Algorithm', () => {
    VariablePage.validations.derivation.shouldNotHaveAlgorithm();
  });
});
