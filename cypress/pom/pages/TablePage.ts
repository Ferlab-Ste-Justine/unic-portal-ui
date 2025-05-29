/// <reference types="cypress"/>
/* Work In Progress */
import { CommonSelectors } from 'cypress/pom/shared/Selectors';

const cardSelector = {
  summary: '[id="summary"]',
  variables: '[id="variables"]',
  currentVersion: '[id="currentVersion"]',
};

const selectors = {
  currentVersion: {
    label: `${cardSelector.currentVersion} [class="ant-descriptions-item-label"]`,
    content: `${cardSelector.currentVersion} [class="ant-descriptions-item-content"]`,
    tooltipIcon: `${cardSelector.currentVersion} ${CommonSelectors.tooltipIcon}`,
  },
  title: {
    header: '[class*="page_titleHeader"]',
    headerIcon: '[class*="page_titleHeader"] [class*="anticon-read"]',
  },
  summary: {
    header: {
      icon: `${cardSelector.summary} [class*="EntityCardSummary"] [data-testid="pattern-system-icon"]`,
      title: `${cardSelector.summary} [class*="EntityCardSummary_title"]`,
    },
    content: `${cardSelector.summary} [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]`,
  },
  variables: {
    label: `${cardSelector.variables} [class="ant-descriptions-item-label"]`,
    content: `${cardSelector.variables} [class="ant-descriptions-item-content"]`,
    tooltipIcon: `${cardSelector.variables} ${CommonSelectors.tooltipIcon}`,
    hospitalSystemItems: '[class*="page_hospitalSystem"]',
  },
};

const texts = {
  hostpitalSystemsTooltip: 'Hospital systems used to generate variables for this project.',
  versionTooltip: 'Dictionary version for this project',
};

export const TablePage = {
  actions: {
    /**
     * Clicks the link for a specific hospital system in the variables section.
     * @param hospitalSystem The name of the hospital system to click.
     */
    clickHospitalSystemLink(hospitalSystem: string) {
      cy.get(selectors.variables.content).eq(1).find(selectors.variables.hospitalSystemItems).then(($elements) => {
        $elements.each((index, element) => {
          if (element.textContent?.includes(hospitalSystem)) {
            cy.get(selectors.variables.content).eq(1).find(CommonSelectors.link).eq(index).clickAndWait();
            return false;
          };
        });
      });
    },
    /**
     * Clicks the main title link of the resource page.
     */
    clickTitleLink() {
      cy.get(selectors.title.header).find(CommonSelectors.link).clickAndWait();
    },
    /**
     * Clicks the variable count link in the variables section.
     */
    clickVariableCountLink() {
      cy.get(selectors.variables.content).eq(0).find(CommonSelectors.link).clickAndWait();
    },
  },
  
  validations: {
    currentVersion: {
      /**
       * Validates the "Published On" date in the current version section.
       * @param resourceUpdatedOn The expected date (string or RegExp).
       */
      shouldHavePublishedOn(tableUpdatedOn: string|RegExp) {
        cy.get(selectors.currentVersion.label).eq(0).contains('Published On').should('exist');
        cy.get(selectors.currentVersion.content).eq(0).contains(tableUpdatedOn).should('exist');
      },
      /**
       * Validates the version value and optionally the tooltip in the current version section.
       * @param resourceVersion The expected version string.
       * @param isTooltip Whether to check the tooltip (default: false).
       */
      shouldHaveVersion(tableVersion: string, isTooltip: boolean = false) {
        cy.get(selectors.currentVersion.label).eq(1).contains('Version').should('exist');
        cy.get(selectors.currentVersion.content).eq(1).contains(tableVersion).should('exist');
        if (isTooltip) {
          cy.get(selectors.currentVersion.tooltipIcon).shouldHaveTooltip(texts.versionTooltip);
        }
        else {
          cy.get(selectors.currentVersion.tooltipIcon).should('not.exist');
        };
      },
    },
    summary: {
      /**
       * Validates the collection starting year in the summary section.
       * @param resourceCollectionStartingYear The expected year.
       */
      shouldHaveCollectionStartingYear(tableCollectionStartingYear: string) {
        cy.get(selectors.summary.content).eq(3).contains('Collection Starting Year').should('exist');
        cy.get(selectors.summary.content).eq(3).contains(tableCollectionStartingYear).should('exist');
      },
      /**
       * Validates the header section of the summary card for the given resource.
       * @param resource The resource object.
       */
      shouldHaveHeader(table: any) {
        cy.get(selectors.summary.header.icon).should('exist');
        cy.get(selectors.summary.header.title).contains('Table').should('exist');
        cy.get(selectors.summary.header.title).contains(table.name).should('exist');
      },
      /**
       * Validates the "Approved On" date in the summary section.
       * @param resourceApprovedOn The expected date (string or RegExp).
       */
      shouldHaveApprovedOn(tableApprovedOn: string|RegExp) {
        cy.get(selectors.summary.content).eq(3).contains('Approved On').should('exist');
        cy.get(selectors.summary.content).eq(3).contains(tableApprovedOn).should('exist');
      },
      /**
       * Validates the description in the summary section.
       * @param resourceDescription The expected description.
       */
      shouldHaveDescription(tableDescription: string) {
        cy.get(selectors.summary.content).eq(1).contains('Description').should('exist');
        cy.get(selectors.summary.content).eq(1).contains(tableDescription).should('exist');
      },
      /**
       * Validates the Nagano ID in the summary section.
       * @param resourceNaganoID The expected Nagano ID.
       */
      shouldHaveNaganoID(tableNaganoID: string) {
        cy.get(selectors.summary.content).eq(3).contains('Nagano ID').should('exist');
        cy.get(selectors.summary.content).eq(3).contains(tableNaganoID).should('exist');
      },
      /**
       * Validates the principal investigator in the summary section.
       * @param resourcePrincipalInvestigator The expected investigator name.
       */
      shouldHavePrincipalInvestigator(tablePrincipalInvestigator: string) {
        cy.get(selectors.summary.content).eq(2).contains('Investigator / Owner').should('exist');
        cy.get(selectors.summary.content).eq(2).contains(tablePrincipalInvestigator).should('exist');
      },
      /**
       * Validates the title in the summary section.
       * @param resourceTitle The expected title.
       */
      shouldHaveTitle(tableTitle: string) {
        cy.get(selectors.summary.content).eq(0).contains('Title').should('exist');
        cy.get(selectors.summary.content).eq(0).contains(tableTitle).should('exist');
      },
    },
    /**
     * Validates the main title of the resource page.
     * @param resourceName The expected resource name.
     */
    shouldHaveTitle(tableName: string) {
      cy.get(selectors.title.headerIcon).should('exist');
      cy.get(selectors.title.header).contains(tableName).should('exist');
    },
    variables: {
      /**
       * Validates the hospital systems listed in the variables section.
       * @param resourceHospitalSystems The expected hospital systems object.
       */
      shouldHaveHospitalSystems(tableHospitalSystems: any) {
        cy.get(selectors.variables.label).eq(1).contains('Hospital Systems').should('exist');
        cy.get(selectors.variables.tooltipIcon).shouldHaveTooltip(texts.hostpitalSystemsTooltip);

        Object.entries(tableHospitalSystems).forEach(([name, count]) => {
          cy.get(selectors.variables.content).eq(1).contains(`${name} (`).should('exist');
          cy.get(selectors.variables.content).eq(1).contains(`${count}`).should('exist');
        });
      },
      /**
       * Validates the variable count and table count in the variables section.
       * @param table The table object.
       */
      shouldHaveVariableCount(table: any) {
        cy.get(selectors.variables.label).eq(0).contains('Variable Count').should('exist');
        cy.get(selectors.variables.content).eq(0).contains(table.variables.totalCount).should('exist');
        cy.get(selectors.variables.content).eq(0).contains(` (in ${table.tables} tables)`).should('exist');
      },
    },
  },
};
