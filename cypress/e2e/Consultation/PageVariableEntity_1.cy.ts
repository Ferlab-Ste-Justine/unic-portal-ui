/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablePage } from 'cypress/pom/pages/VariablePage';

describe('Page d\'une variable - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariableEntity(data.variableSector);
  };

  it('Titre', () => {
    setupTest();
    VariablePage.validations.shouldHaveTitle(data.variableSector);
  });

  it('Panneau Summary - Header', () => {
    setupTest();
    VariablePage.validations.summary.shouldHaveHeader(data.variableSector);
  });

  it('Panneau Summary - Label', () => {
    setupTest();
    VariablePage.validations.summary.shouldHaveLabel(data.variableSector);
  });

  it('Panneau Summary - Resource', () => {
    setupTest();
    VariablePage.validations.summary.shouldHaveResource(data.variableSector);
  });

  it('Panneau Summary - Table', () => {
    setupTest();
    VariablePage.validations.summary.shouldHaveTable(data.variableSector);
  });

  it('Panneau Summary - Notes', () => {
    setupTest();
    VariablePage.validations.summary.shouldNotHaveNotes();
  });

  it('Panneau Summary - Created On', () => {
    setupTest();
    VariablePage.validations.summary.shouldHaveCreatedOn(data.variableSector);
  });

  it('Panneau Summary - Updated On', () => {
    setupTest();
    VariablePage.validations.summary.shouldHaveUpdatedOn(data.variableSector);
  });

  it('Panneau Categories - Headers', () => {
    setupTest();
    VariablePage.validations.categories.shouldHaveHeaders();
  });

  it('Panneau Categories - Data', () => {
    setupTest();
    VariablePage.validations.categories.shouldHaveCategories(data.variableSector);
  });

  it('Panneau Derivation - Sources', () => {
    setupTest();
    VariablePage.validations.derivation.shouldHaveSources(data.variableSector);
  });

  it('Panneau Derivation - Algorithm', () => {
    setupTest();
    VariablePage.validations.derivation.shouldNotHaveAlgorithm();
  });
});
