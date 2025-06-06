/// <reference types="cypress"/>
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { CommonTexts } from 'cypress/pom/shared/Texts';

const cardSelector = {
  history: '[id="history"]',
  summary: '[id="summary"]',
  variables: '[id="variables"]',
};

const selectors = {
  history: {
    content: `${cardSelector.history} [class="ant-descriptions-item-content"]`,
    label: `${cardSelector.history} [class="ant-descriptions-item-label"]`,
    tooltipIcon: `${cardSelector.history} ${CommonSelectors.tooltipIcon}`,
  },
  summary: {
    header: {
      icon: `${cardSelector.summary} [class*="EntityCardSummary"] [data-testid="pattern-system-icon"]`,
      title: `${cardSelector.summary} [class*="EntityCardSummary_title"]`,
    },
    content: `${cardSelector.summary} [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]`,
    tooltipIcon: `${cardSelector.summary} [class*="SummaryContent_tooltipIcon"]`,
  },
  title: {
    header: '[class*="page_titleHeader"]',
    headerIcon: '[class*="page_titleHeader"] [class*="anticon-read"]',
  },
  variables: {
    content: `${cardSelector.variables} [class="ant-descriptions-item-content"]`,
    label: `${cardSelector.variables} [class="ant-descriptions-item-label"]`,
  },
};

export const TablePage = {
  actions: {
    /**
     * Clicks the resource link in the summary section.
     */
    clickResourceLink() {
      cy.get(selectors.summary.content).eq(0).find(CommonSelectors.link).clickAndWait();
    },
    /**
     * Clicks the catalog title link of the table page.
     */
    clickTitleCatalogLink() {
      cy.get(selectors.title.header).find(CommonSelectors.link).eq(0).clickAndWait();
    },
    /**
     * Clicks the resource title link of the table page.
     */
    clickTitleResourceLink() {
      cy.get(selectors.title.header).find(CommonSelectors.link).eq(1).clickAndWait();
    },
    /**
     * Clicks the variable count link in the variables section.
     */
    clickVariableCountLink() {
      cy.get(selectors.variables.content).eq(0).find(CommonSelectors.link).clickAndWait();
    },
  },
  
  validations: {
    history: {
      /**
       * Validates the "Created On" date in the history section.
       * @param dataTable The table object containing the expected values.
       */
      shouldHaveCreatedOn(dataTable: any) {
        cy.get(selectors.history.label).eq(0).contains('Created On').should('exist');
        cy.get(selectors.history.tooltipIcon).eq(0).shouldHaveTooltip(CommonTexts.createdOnTooltip('table'));
        cy.get(selectors.history.content).eq(0).contains(dataTable.createdOn).should('exist');
      },
      /**
       * Validates the "Updated On" date in the history section.
       * @param dataTable The table object containing the expected values.
       */
      shouldHaveUpdatedOn(dataTable: any) {
        cy.get(selectors.history.label).eq(1).contains('Updated On').should('exist');
        cy.get(selectors.history.tooltipIcon).eq(1).shouldHaveTooltip(CommonTexts.updatedOnTooltip('table'));
        cy.get(selectors.history.content).eq(1).contains(dataTable.updatedOn).should('exist');
      },
    },
    summary: {
      /**
       * Validates the description in the summary section.
       * @param dataTable The table object containing the expected values.
       */
      shouldHaveDescription(dataTable: any) {
        cy.get(selectors.summary.content).eq(1).contains('Description').should('exist');
        cy.get(selectors.summary.content).eq(1).contains(dataTable.description).should('exist');
      },
      /**
       * Validates the domain in the summary section.
       * @param dataTable The table object containing the expected values.
       */
      shouldHaveDomain(dataTable: any) {
        cy.get(selectors.summary.content).eq(2).contains('Domain').should('exist');
        cy.get(selectors.summary.tooltipIcon).eq(1).shouldHaveTooltip(CommonTexts.tableDomainTooltip);
        cy.get(selectors.summary.content).eq(2).contains(dataTable.domain).should('exist');
      },
      /**
       * Validates the entity in the summary section.
       * @param dataTable The table object containing the expected values.
       */
      shouldHaveEntity(dataTable: any) {
        cy.get(selectors.summary.content).eq(2).contains('Entity').should('exist');
        cy.get(selectors.summary.tooltipIcon).eq(0).shouldHaveTooltip(CommonTexts.tableEntityTooltip);
        cy.get(selectors.summary.content).eq(2).contains(dataTable.entity).should('exist');
      },
      /**
       * Validates the header section of the summary card for the given table.
       * @param dataTable The table object containing the expected values.
       */
      shouldHaveHeader(dataTable: any) {
        cy.get(selectors.summary.header.icon).should('exist');
        cy.get(selectors.summary.header.title).contains('Table').should('exist');
        cy.get(selectors.summary.header.title).contains(dataTable.name).should('exist');
      },
      /**
       * Validates the resource in the summary section.
       * @param dataTable The table object containing the expected values.
       */
      shouldHaveResource(dataTable: any) {
        cy.get(selectors.summary.content).eq(0).contains('Resource').should('exist');
        cy.get(selectors.summary.content).eq(0).contains(dataTable.resourceName).should('exist');
      },
      /**
       * Validates the absence of row filter in the summary section.
       */
      shouldNotHaveRowFilter() {
        cy.get(selectors.summary.content).contains('Row Filter').should('not.exist');
      },
    },
    /**
     * Validates the main title of the table page.
     * @param dataTable The table object containing the expected values.
     */
    shouldHaveTitle(dataTable: any) {
      cy.get(selectors.title.headerIcon).should('exist');
      cy.get(selectors.title.header).contains(dataTable.resourceName).should('exist');
      cy.get(selectors.title.header).contains(dataTable.name).should('exist');
    },
    variables: {
      /**
       * Validates the variable count in the variables section.
       * @param dataTable The table object containing the expected values.
       */
      shouldHaveVariableCount(dataTable: any) {
        cy.get(selectors.variables.label).eq(0).contains('Variable Count').should('exist');
        cy.get(selectors.variables.content).eq(0).contains(dataTable.variableCount).should('exist');
      },
    },
  },
};
