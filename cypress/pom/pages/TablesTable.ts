import { formatToK } from 'cypress/pom//shared/Utils';

const selectorPanel = '[id*="panel-tables"]';
const selectors = {
  FilterTitleInput: (title: string) => `${selectorPanel} [class*="InputSelect_filter"] [title="${title}"]`,
  filterTagInput: `${selectorPanel} [class*="InputSelect_filter"] [class*="ant-tag"]`,
  pageTitle: '[class*="PageLayout_titlePage"]',
  proTableHeader: `${selectorPanel} [class*="Header_ProTableHeader"]`,
  tab: '[data-node-key="tables"]',
};

const texts = {
  pageTitle: 'UnIC Catalog',
};

export const TablesTable = {
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
      redirectAndFilterTable(filterName: string, count: string | number)
      {
        this.pageTitle();
        this.tabActive();
        this.inputFilterExists(filterName);
        this.resultsCount(count);
      },
      resultsCount(count: string | number) {
        const countToK = formatToK(count);
        cy.get(selectors.proTableHeader).contains(new RegExp(`(^${countToK} Results$| of ${countToK}$)`)).should('exist');
      },
      tabActive() {
        cy.get(selectors.tab).shouldHaveActiveTab();
      },
    },
  };
  