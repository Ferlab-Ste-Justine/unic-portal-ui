/// <reference types="cypress"/>
import { buildBilingualRegExp, varSingleDigit } from 'cypress/pom/shared/Utils';
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { CommonTexts } from 'cypress/pom/shared/Texts';
import { data } from 'cypress/pom/shared/Data';

const selectors = {
  loginButton: '[data-cy="Login"]',
  logo: '[class*="page_logoContainer"] [src="/unic-logo.svg"]',
  signupButton: '[data-cy="Signup"]',
  statsContainer: '[class*="DataRelease_colDataReleaseContainer"]',
  statsTitle: '[class*="page_loginStats"]',
  subtitle: '[class*="page_loginSubTitle"]',
  title: '[class*="page_loginTitle"]',
};

export const LandingPage = {
  actions: {
  },

  validations: {
    /**
     * Validates the buttons of the landing page.
     */
    shouldHaveButtons() {
    cy.get(selectors.loginButton).contains(buildBilingualRegExp(CommonTexts.loginButton, CommonTexts.loginButtonFR)).should('exist');
    cy.get(selectors.signupButton).contains(buildBilingualRegExp(CommonTexts.signup, CommonTexts.signupFR)).should('exist');
    },
    /**
     * Validates the logo of the landing page.
     */
    shouldHaveLogo() {
      cy.get(selectors.logo).should('exist');
    },
    /**
     * Validates the statistiques of the landing page.
     */
    shouldHaveStats() {
      cy.get(selectors.title).contains(buildBilingualRegExp(CommonTexts.landingTitle, CommonTexts.landingTitleFR)).should('exist');
    },
    /**
     * Validates the title of the landing page.
     */
    shouldHaveTitle() {
    cy.get(selectors.statsTitle).contains(buildBilingualRegExp(CommonTexts.statsTitle, CommonTexts.statsTitleFR)).should('exist');
    cy.get(selectors.statsContainer).eq(0).find(CommonSelectors.readIcon).should('exist');
    cy.get(selectors.statsContainer).eq(0).contains(varSingleDigit).should('exist');
    cy.get(selectors.statsContainer).eq(0).contains(buildBilingualRegExp(CommonTexts.projects, CommonTexts.projectsFR)).should('exist');
    cy.get(selectors.statsContainer).eq(1).find(CommonSelectors.userIcon).should('exist');
    cy.get(selectors.statsContainer).eq(1).contains(data.totalParticipants).should('exist');
    cy.get(selectors.statsContainer).eq(1).contains(CommonTexts.participants).should('exist');
    cy.get(selectors.statsContainer).eq(2).find(CommonSelectors.fileTextIcon).should('exist');
    cy.get(selectors.statsContainer).eq(2).contains(varSingleDigit).should('exist');
    cy.get(selectors.statsContainer).eq(2).contains(buildBilingualRegExp(CommonTexts.hospitalSystems, CommonTexts.hospitalSystemsFR)).should('exist');
    cy.get(selectors.statsContainer).eq(3).find(CommonSelectors.goldIcon).should('exist');
    cy.get(selectors.statsContainer).eq(3).contains(varSingleDigit).should('exist');
    cy.get(selectors.statsContainer).eq(3).contains(CommonTexts.variables).should('exist');
    },
    /**
     * Validates the absence of the subtitle of the landing page.
     */
    shouldNotHaveSubtitle() {
      cy.get(selectors.subtitle).should('not.exist');
    },
  },
};
