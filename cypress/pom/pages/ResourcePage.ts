/// <reference types="cypress"/>
import { formatResourceType, getResourceColor, getResourceIconSelector } from 'cypress/pom/shared/Utils';
import { CommonSelectors } from 'cypress/pom/shared/Selectors';

const cardSelector = {
  currentVersion: '[id="currentVersion"]',
  summary: '[id="summary"]',
  variables: '[id="variables"]',
};

const selectors = {
  currentVersion: {
    content: `${cardSelector.currentVersion} [class="ant-descriptions-item-content"]`,
    label: `${cardSelector.currentVersion} [class="ant-descriptions-item-label"]`,
    tooltipIcon: `${cardSelector.currentVersion} ${CommonSelectors.tooltipIcon}`,
  },
  summary: {
    content: `${cardSelector.summary} [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]`,
    header: {
      icon: (resourceIconSelector: string) => `${cardSelector.summary} [class*="EntityCardSummary"] ${resourceIconSelector}`,
      tag: (resourceColor: string) => `${cardSelector.summary} [class*="EntityCardSummary_title"] [class*="ant-tag-${resourceColor}"]`,
      title: `${cardSelector.summary} [class*="EntityCardSummary_title"]`,
      type: `${cardSelector.summary} [class*="EntityCardSummary_title"] [class*="EntityCardSummary_type"]`,
    },
  },
  title: {
    header: '[class*="page_titleHeader"]',
    headerIcon: '[class*="page_titleHeader"] [class*="anticon-read"]',
  },
  variables: {
    content: `${cardSelector.variables} [class="ant-descriptions-item-content"]`,
    hospitalSystemItems: '[class*="page_hospitalSystem"]',
    label: `${cardSelector.variables} [class="ant-descriptions-item-label"]`,
    tooltipIcon: `${cardSelector.variables} ${CommonSelectors.tooltipIcon}`,
  },
};

const texts = {
  hostpitalSystemsTooltip: 'Hospital systems used to generate variables for this project.',
  versionTooltip: 'Dictionary version for this project',
};

export const ResourcePage = {
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
       * @param dataResource The resource object containing the expected values.
       */
      shouldHavePublishedOn(dataResource: any) {
        cy.get(selectors.currentVersion.label).eq(0).contains('Published On').should('exist');
        cy.get(selectors.currentVersion.content).eq(0).contains(dataResource.updatedOn).should('exist');
      },
      /**
       * Validates the version value and optionally the tooltip in the current version section.
       * @param dataResource The resource object containing the expected values.
       * @param isTooltip Whether to check the tooltip (default: false).
       */
      shouldHaveVersion(dataResource: any, isTooltip: boolean = false) {
        cy.get(selectors.currentVersion.label).eq(1).contains('Version').should('exist');
        cy.get(selectors.currentVersion.content).eq(1).contains(dataResource.version).should('exist');
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
       * Validates the "Approved On" date in the summary section.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHaveApprovedOn(dataResource: any) {
        cy.get(selectors.summary.content).eq(3).contains('Approved On').should('exist');
        cy.get(selectors.summary.content).eq(3).contains(dataResource.approvedOn).should('exist');
      },
      /**
       * Validates the collection starting year in the summary section.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHaveCollectionStartingYear(dataResource: any) {
        cy.get(selectors.summary.content).eq(3).contains('Collection Starting Year').should('exist');
        cy.get(selectors.summary.content).eq(3).contains(dataResource.collectionStartingYear).should('exist');
      },
      /**
       * Validates the description in the summary section.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHaveDescription(dataResource: any) {
        cy.get(selectors.summary.content).eq(1).contains('Description').should('exist');
        cy.get(selectors.summary.content).eq(1).contains(dataResource.description).should('exist');
      },
      /**
       * Validates the header section of the summary card for the given resource.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHaveHeader(dataResource: any) {
        cy.get(selectors.summary.header.icon(getResourceIconSelector(dataResource.type))).should('exist');
        cy.get(selectors.summary.header.type).contains(formatResourceType(dataResource.type)).should('exist');
        cy.get(selectors.summary.header.title).contains(dataResource.name).should('exist');
        cy.get(selectors.summary.header.tag(getResourceColor(dataResource.type))).contains(formatResourceType(dataResource.type)).should('exist');
      },
      /**
       * Validates the Nagano ID in the summary section.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHaveNaganoID(dataResource: any) {
        cy.get(selectors.summary.content).eq(3).contains('Nagano ID').should('exist');
        cy.get(selectors.summary.content).eq(3).contains(dataResource.naganoID).should('exist');
      },
      /**
       * Validates the principal investigator in the summary section.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHavePrincipalInvestigator(dataResource: any) {
        cy.get(selectors.summary.content).eq(2).contains('Investigator / Owner').should('exist');
        cy.get(selectors.summary.content).eq(2).contains(dataResource.principalInvestigator).should('exist');
      },
      /**
       * Validates the title in the summary section.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHaveTitle(dataResource: any) {
        cy.get(selectors.summary.content).eq(0).contains('Title').should('exist');
        cy.get(selectors.summary.content).eq(0).contains(dataResource.title).should('exist');
      },
    },
    /**
     * Validates the main title of the resource page.
     * @param dataResource The resource object containing the expected values.
     */
    shouldHaveTitle(dataResource: any) {
      cy.get(selectors.title.headerIcon).should('exist');
      cy.get(selectors.title.header).contains(dataResource.name).should('exist');
    },
    variables: {
      /**
       * Validates the hospital systems listed in the variables section.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHaveHospitalSystems(dataResource: any) {
        cy.get(selectors.variables.label).eq(1).contains('Hospital Systems').should('exist');
        cy.get(selectors.variables.tooltipIcon).shouldHaveTooltip(texts.hostpitalSystemsTooltip);

        Object.entries(dataResource.variables.hospitalSystems).forEach(([name, count]) => {
          cy.get(selectors.variables.content).eq(1).contains(`${name} (`).should('exist');
          cy.get(selectors.variables.content).eq(1).contains(`${count}`).should('exist');
        });
      },
      /**
       * Validates the variable count and table count in the variables section.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHaveVariableCount(dataResource: any) {
        cy.get(selectors.variables.label).eq(0).contains('Variable Count').should('exist');
        cy.get(selectors.variables.content).eq(0).contains(dataResource.variables.totalCount).should('exist');
        cy.get(selectors.variables.content).eq(0).contains(` (in ${dataResource.tables} tables)`).should('exist');
      },
    },
  },
};
