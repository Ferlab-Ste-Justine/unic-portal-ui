import { formatResourceType, getResourceColor, getResourceIconSelector } from 'cypress/pom/shared/Utils';
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
      icon: (resourceIconSelector: string) => `${cardSelector.summary} [class*="EntityCardSummary"] ${resourceIconSelector}`,
      title: `${cardSelector.summary} [class*="EntityCardSummary_title"]`,
      tag: (resourceColor: string) => `${cardSelector.summary} [class*="EntityCardSummary_title"] [class*="ant-tag-${resourceColor}"]`,
      type: `${cardSelector.summary} [class*="EntityCardSummary_title"] [class*="EntityCardSummary_type"]`,
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

export const ResourcePage = {
  actions: {
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
    clickTitleLink() {
      cy.get(selectors.title.header).find(CommonSelectors.link).clickAndWait();
    },
    clickVariableCountLink() {
      cy.get(selectors.variables.content).eq(0).find(CommonSelectors.link).clickAndWait();
    },
  },
  
  validations: {
    currentVersion: {
      publishedOn(resourceUpdatedOn: string|RegExp) {
        cy.get(selectors.currentVersion.label).eq(0).contains('Published On').should('exist');
        cy.get(selectors.currentVersion.content).eq(0).contains(resourceUpdatedOn).should('exist');
      },
      version(resourceVersion: string, isTooltip: boolean = false) {
        cy.get(selectors.currentVersion.label).eq(1).contains('Version').should('exist');
        cy.get(selectors.currentVersion.content).eq(1).contains(resourceVersion).should('exist');
        if (isTooltip) {
          cy.get(selectors.currentVersion.tooltipIcon).shouldHaveTooltip(texts.versionTooltip);
        }
        else {
          cy.get(selectors.currentVersion.tooltipIcon).should('not.exist');
        };
      },
    },
    summary: {
      collectionStartingYear(resourceCollectionStartingYear: string) {
        cy.get(selectors.summary.content).eq(3).contains('Collection Starting Year').should('exist');
        cy.get(selectors.summary.content).eq(3).contains(resourceCollectionStartingYear).should('exist');
      },
      header(resource: any) {
        cy.get(selectors.summary.header.icon(getResourceIconSelector(resource.type))).should('exist');
        cy.get(selectors.summary.header.type).contains(formatResourceType(resource.type)).should('exist');
        cy.get(selectors.summary.header.title).contains(resource.name).should('exist');
        cy.get(selectors.summary.header.tag(getResourceColor(resource.type))).contains(formatResourceType(resource.type)).should('exist');
      },
      approvedOn(resourceApprovedOn: string|RegExp) {
        cy.get(selectors.summary.content).eq(3).contains('Approved On').should('exist');
        cy.get(selectors.summary.content).eq(3).contains(resourceApprovedOn).should('exist');
      },
      description(resourceDescription: string) {
        cy.get(selectors.summary.content).eq(1).contains('Description').should('exist');
        cy.get(selectors.summary.content).eq(1).contains(resourceDescription).should('exist');
      },
      naganoID(resourceNaganoID: string) {
        cy.get(selectors.summary.content).eq(3).contains('Nagano ID').should('exist');
        cy.get(selectors.summary.content).eq(3).contains(resourceNaganoID).should('exist');
      },
      principalInvestigator(resourcePrincipalInvestigator: string) {
        cy.get(selectors.summary.content).eq(2).contains('Investigator / Owner').should('exist');
        cy.get(selectors.summary.content).eq(2).contains(resourcePrincipalInvestigator).should('exist');
      },
      title(resourceTitle: string) {
        cy.get(selectors.summary.content).eq(0).contains('Title').should('exist');
        cy.get(selectors.summary.content).eq(0).contains(resourceTitle).should('exist');
      },
    },
    title(resourceName: string) {
      cy.get(selectors.title.headerIcon).should('exist');
      cy.get(selectors.title.header).contains(resourceName).should('exist');
    },
    variables: {
      hostitalSystems(resourceHospitalSystems: any) {
        cy.get(selectors.variables.label).eq(1).contains('Hospital Systems').should('exist');
        cy.get(selectors.variables.tooltipIcon).shouldHaveTooltip(texts.hostpitalSystemsTooltip);

        Object.entries(resourceHospitalSystems).forEach(([name, count]) => {
          cy.get(selectors.variables.content).eq(1).contains(`${name} (`).should('exist');
          cy.get(selectors.variables.content).eq(1).contains(`${count}`).should('exist');
        });
      },
      variableCount(resource: any) {
        cy.get(selectors.variables.label).eq(0).contains('Variable Count').should('exist');
        cy.get(selectors.variables.content).eq(0).contains(resource.variables.totalCount).should('exist');
        cy.get(selectors.variables.content).eq(0).contains(` (in ${resource.tables} tables)`).should('exist');
      },
    },
  },
};
