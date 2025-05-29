/// <reference types="cypress"/>
import { formatToK } from 'cypress/pom/shared/Utils';

const panelSelector = '[id*="panel-variables"]';

const selectors = {
  FilterTitleInput: (title: string) => `${panelSelector} [class*="InputSelect_filter"] [title="${title}"]`,
  filterTagInput: `${panelSelector} [class*="InputSelect_filter"] [class*="ant-tag"]`,
  pageTitle: '[class*="PageLayout_titlePage"]',
  proTableHeader: `${panelSelector} [class*="Header_ProTableHeader"]`,
  tab: '[data-node-key="variables"]',
};

const texts = {
  pageTitle: 'UnIC Catalog',
};

export const VariablesTable = {
    actions: {
    },
  
    validations: {
      /**
       * Checks that a filter input with the given value exists.
       * @param value The value to check in the filter input.
       */
      shouldShowFilterInput(value: string) {
        cy.get(selectors.FilterTitleInput(value)).should('exist');
      },
      /**
       * Checks that a filter tag with the given value exists.
       * @param value The value to check in the filter tag.
       */
      shouldShowFilterTag(value: string) {
        cy.get(selectors.filterTagInput).contains(value).should('exist');
      },
      /**
       * Checks the page title.
       */
      shouldShowPageTitle() {
        cy.get(selectors.pageTitle).contains(texts.pageTitle).should('exist');
      },
      /**
       * Checks that the redirection to the table page works and validates the results count.
       * @param filterName The filter value to apply (usually the table name).
       * @param count The expected results count (string or number).
       */
      shouldRedirectAndValidateTable(filterNames: string[], count: string | number)
      {
        this.shouldShowPageTitle();
        this.shouldHaveActiveTab();
        filterNames.forEach((name) => {
          this.shouldShowFilterInput(name);
        });
        this.shouldShowResultsCount(count);
      },
      /**
       * Checks the displayed results count.
       * @param count The expected count (string, number, or RegExp).
       * @param shouldExist Whether the count should exist (default: true).
       */
      shouldShowResultsCount(count: string | number | RegExp, shouldExist: boolean = true) {
        const strCount = count instanceof RegExp ? count.source : formatToK(count);
        const strExist = shouldExist ? 'exist' : 'not.exist';
        const strPlural = strCount === '1' ? '' : 's';
        cy.get(selectors.proTableHeader).contains(new RegExp(`(^${strCount} Result${strPlural}$| of ${strCount}$)`)).should(strExist);
      },
      /**
       * Checks that the tab is active.
       */
      shouldHaveActiveTab() {
        cy.get(selectors.tab).shouldHaveActiveTab();
      },
    },
  };
  