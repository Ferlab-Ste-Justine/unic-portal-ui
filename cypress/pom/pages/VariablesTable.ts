import { formatToK } from "cypress/pom//shared/Utils";

const panelSelector = '[id*="panel-variables"]';

const selectors = {
  FilterTitleInput: (title: string) => `${panelSelector} [class*="InputSelect_filter"] [title="${title}"]`,
  filterTagInput: `${panelSelector} [class*="InputSelect_filter"] [class*="ant-tag"]`,
  pageTitle: '[class*="PageLayout_titlePage"]',
  resultsCount: `${panelSelector} [class*="Header_ProTableHeader"]`,
  tab: '[data-node-key="variables"]',
};

const texts = {
  pageTitle: 'UnIC Catalog',
};

export const VariablesTable = {
    actions: {
    },
  
    validations: {
      inputFilterExists(value: string) {
        cy.get(selectors.FilterTitleInput(value)).should('exist');
      },
      inputFilterTagExists(value: string) {
        cy.get(selectors.filterTagInput).contains(value).should('exist');
      },
      pageTitle() {
        cy.get(selectors.pageTitle).contains(texts.pageTitle).should('exist');
      },
      resultsCount(count: string) {
        const countToK = formatToK(count);
        cy.get(selectors.resultsCount).contains(new RegExp(`(^${countToK} Results$| of ${countToK}$)`)).should('exist');
      },
      tabActive() {
        cy.get(selectors.tab).shouldHaveActiveTab();
      },
    },
  };
  