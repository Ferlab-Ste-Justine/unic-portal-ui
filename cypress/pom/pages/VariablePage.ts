/// <reference types="cypress"/>
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { CommonTexts } from 'cypress/pom/shared/Texts';
import { oneMinute } from 'cypress/pom/shared/Utils';
import { Replacement } from 'cypress/pom/shared/Types';

const cardSelector = {
  categories: '[id="categories"]',
  derivation: '[id="derivation"]',
  summary: '[id="summary"]',
};

const selectors = {
  categories: {
    downloadButton: `${cardSelector.categories} ${CommonSelectors.downloadIcon}`,
    searchInput: `${cardSelector.categories} input`,
    table: (dataRowKey: string) => `${cardSelector.categories} [data-row-key="${dataRowKey}"] td`,
    tableHeaders: `${cardSelector.categories} th`,
  },
  derivation: {
    arrowIcon: `${CommonSelectors.sourceLink} [class*="SourceLink_icon"]`,
    content: `${cardSelector.derivation} [class="ant-descriptions-item-content"]`,
    label: `${cardSelector.derivation} [class="ant-descriptions-item-label"]`,
    resourceLink: (sources: any) => `${CommonSelectors.sourceLink} [href="/resource/${sources.resource}"]`,
    tableLink: (sources: any) => `${CommonSelectors.sourceLink} [href="/table/${sources.resource}/${sources.table}"]`,
    variableLink: (sources: any) => `${CommonSelectors.sourceLink} [href="/variable/${sources.resource}/${sources.table}/${sources.variable}"]`,
  },
  summary: {
    header: {
      icon: `${cardSelector.summary} [class*="EntityCardSummary"] [data-testid="keywording-tools-icon"]`,
      tag: `${cardSelector.summary} [class*="EntityCardSummary_title"] ${CommonSelectors.tag}`,
      title: `${cardSelector.summary} [class*="EntityCardSummary_title"]`,
    },
    content: `${cardSelector.summary} [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]`,
    tooltipIcon: '[class*="SummaryContent_tooltipIcon"]',
  },
  title: {
    header: '[class*="page_titleHeader"]',
    headerIcon: '[class*="page_titleHeader"] [class*="anticon-read"]',
  },
};

export const VariablePage = {
  actions: {
    /**
     * Clicks the download button in the categories section and waits for the file to be available.
     */
    clickCategoriesDownloadButton() {
      cy.get(selectors.categories.downloadButton).clickAndWait();
      cy.waitUntilFile(oneMinute);
    },
    /**
     * Clicks the resource link in the derivation section.
     * @param dataVariable The variable object containing the expected values.
     */
    clickDerivationResourceLink(dataVariable: any) {
      cy.get(selectors.derivation.content).eq(0).find(selectors.derivation.resourceLink(dataVariable.sources)).eq(0).clickAndWait();
    },
    /**
     * Clicks the table link in the derivation section.
     * @param dataVariable The variable object containing the expected values.
     */
    clickDerivationTableLink(dataVariable: any) {
      cy.get(selectors.derivation.content).eq(0).find(selectors.derivation.tableLink(dataVariable.sources)).clickAndWait();
    },
    /**
     * Clicks the variable link in the derivation section.
     * @param dataVariable The variable object containing the expected values.
     */
    clickDerivationVariableLink(dataVariable: any) {
      cy.get(selectors.derivation.content).eq(0).find(selectors.derivation.variableLink(dataVariable.sources)).clickAndWait();
    },
    /**
     * Clicks the resource link in the summary section.
     */
    clickResourceLink() {
      cy.get(selectors.summary.content).eq(1).find(CommonSelectors.link).eq(0).clickAndWait();
    },
    /**
     * Clicks the table link in the summary section.
     */
    clickTableLink() {
      cy.get(selectors.summary.content).eq(1).find(CommonSelectors.link).eq(1).clickAndWait();
    },
    /**
     * Clicks the catalog title link of the variable page.
     */
    clickTitleCatalogLink() {
      cy.get(selectors.title.header).find(CommonSelectors.link).eq(0).clickAndWait();
    },
    /**
     * Clicks the resource title link of the variable page.
     */
    clickTitleResourceLink() {
      cy.get(selectors.title.header).find(CommonSelectors.link).eq(1).clickAndWait();
    },
    /**
     * Clicks the table title link of the variable page.
     */
    clickTitleTableLink() {
      cy.get(selectors.title.header).find(CommonSelectors.link).eq(2).clickAndWait();
    },
    /**
     * Types text in the category search input.
     * @param text The text to type.
     */
    typeCategorySearchInput(text: string) {
      cy.get(selectors.categories.searchInput).type(text);
    }
  },
  
  validations: {
    categories: {
      /**
       * Validates the content of the exported file.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveExportedFileContent(dataVariable: any) {
        Object.entries(dataVariable.categories).forEach(([key, label]) => {
          const replacements: Replacement[] = [
            { placeholder: '{{key}}', value: String(key) },
            { placeholder: '{{label}}', value: String(label) },
          ];
          cy.validateFileContent('PageVariableEntityCategories.json', replacements);
        });
      },
      /**
       * Validates the headers of the exported file.
       */
      shouldHaveExportedFileHeaders() {
        cy.validateFileHeaders('PageVariableEntityCategories.json');
      },
      /**
       * Validates the name of the exported file.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveExportedFileName(dataVariable: any) {
        cy.validateFileName(`${dataVariable.name}-categories`);
      },
      /**
       * Validates the category headers in the categories section.
       */
      shouldHaveHeaders() {
        cy.get(selectors.categories.tableHeaders).eq(0).contains('Value').should('exist');
        cy.get(selectors.categories.tableHeaders).eq(1).contains('Label').should('exist');
      },
      /**
       * Validates a specific category row in the categories table.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveCategories(dataVariable: any) {
        Object.entries(dataVariable.categories).forEach(([key, label]) => {
          cy.get(selectors.categories.table(key)).eq(0).contains(key).should('exist');
          cy.get(selectors.categories.table(key)).eq(1).contains(String(label)).should('exist');
        });
      },
      /**
       * Checks the presence of the category in the categories table.
       * @param categoryKey The object containing the name.
       * @param shouldExist Whether the name should exist (default: true).
       */
      shouldShowCategoryInTable(categoryKey: string, shouldExist: boolean = true) {
        const strExist = shouldExist ? 'exist' : 'not.exist';
        cy.get(selectors.categories.table(categoryKey)).should(strExist);
      },
    },
    derivation: {
      /**
       * Validates the sources in the derivation section.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveSources(dataVariable: any) {
        cy.get(selectors.derivation.label).eq(0).contains('Sources').should('exist');
        cy.get(selectors.derivation.content).eq(0).find(CommonSelectors.sourceLink).contains(dataVariable.sources.resource).should('exist');
        cy.get(selectors.derivation.content).eq(0).find(CommonSelectors.sourceLink).contains(dataVariable.sources.table).should('exist');
        cy.get(selectors.derivation.content).eq(0).find(CommonSelectors.sourceLink).contains(dataVariable.sources.variable).should('exist');
        cy.get(selectors.derivation.content).eq(0).find(selectors.derivation.arrowIcon).should('exist');
      },
      /**
       * Validates the absence of algorithm section in derivation.
       */
      shouldNotHaveAlgorithm() {
        cy.get(cardSelector.derivation).eq(1).should('not.exist');
      },
    },
    summary: {
      /**
       * Validates the header section of the summary card for the given variable.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveHeader(dataVariable: any) {
        cy.get(selectors.summary.header.icon).should('exist');
        cy.get(selectors.summary.header.title).contains('Variable').should('exist');
        cy.get(selectors.summary.header.title).contains(dataVariable.name).should('exist');
        cy.get(selectors.summary.header.tag).contains(dataVariable.type).should('exist');
      },
      /**
       * Validates the label in the summary section.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveLabel(dataVariable: any) {
        cy.get(selectors.summary.content).eq(0).contains('Label').should('exist');
        cy.get(selectors.summary.content).eq(0).contains(dataVariable.label).should('exist');
      },
      /**
       * Validates the resource in the summary section.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveResource(dataVariable: any) {
        cy.get(selectors.summary.content).eq(1).contains('Resource').should('exist');
        cy.get(selectors.summary.content).eq(1).contains(dataVariable.resourceName).should('exist');
      },
      /**
       * Validates the table in the summary section.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveTable(dataVariable: any) {
        cy.get(selectors.summary.content).eq(1).contains('Table').should('exist');
        cy.get(selectors.summary.content).eq(1).contains(dataVariable.table).should('exist');
      },
      /**
       * Validates the "Created On" date in the summary section.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveCreatedOn(dataVariable: any) {
        cy.get(selectors.summary.content).eq(2).contains('Created On').should('exist');
        cy.get(selectors.summary.content).eq(2).find(selectors.summary.tooltipIcon).eq(0).shouldHaveTooltip(CommonTexts.createdOnTooltip('variable'));
        cy.get(selectors.summary.content).eq(2).contains(dataVariable.createdOn).should('exist');
      },
      /**
       * Validates the "Updated On" date in the summary section.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveUpdatedOn(dataVariable: any) {
        cy.get(selectors.summary.content).eq(2).contains('Updated On').should('exist');
        cy.get(selectors.summary.tooltipIcon).eq(1).shouldHaveTooltip(CommonTexts.updatedOnTooltip('variable'));
        cy.get(selectors.summary.content).eq(2).contains(dataVariable.updatedOn).should('exist');
      },
      /**
       * Validates the absence of notes in the summary section.
       */
      shouldNotHaveNotes() {
        cy.get(selectors.summary.content).contains('Notes').should('not.exist');
      },
    },
    /**
     * Validates the main title of the variable page.
     * @param dataVariable The variable object containing the expected values.
     */
    shouldHaveTitle(dataVariable: any) {
      cy.get(selectors.title.headerIcon).should('exist');
      cy.get(selectors.title.header).contains(dataVariable.resourceName).should('exist');
      cy.get(selectors.title.header).contains(dataVariable.table).should('exist');
      cy.get(selectors.title.header).contains(dataVariable.name).should('exist');
    },
  },
};
