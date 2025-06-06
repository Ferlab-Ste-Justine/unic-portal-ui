/// <reference types="cypress"/>
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { CommonTexts } from 'cypress/pom/shared/Texts';
import { data } from 'cypress/pom/shared/Data';

const selectors = {
  subtitle: '[class*="PageLayout_subTitlePage"]',
  title: '[class*="PageLayout_titlePage"]',

  header: {
    aboutIcon: `${CommonSelectors.headerButton} [class="anticon"]`,
    catalogIcon: `${CommonSelectors.headerButton} ${CommonSelectors.readIcon}`,
    language: '[class*="Header_langButton"]',
    link: '[class*="Header_mainHeader"] a',
    logo: '[class*="Header_logo"]',
    userAvatar: '[class*="Header_userAvatar"]',
    userName: '[class*="Header_userName"]',
  },

  warehouse: {
    button: '[class*="WarehouseCard_homeCardContent"] button',
    description: '[class*="WarehouseCard_homeCardDescription"]',
    header: '[class*="WarehouseCard_homeCardHeader"]',
    icon: '[class*="WarehouseCard_homeCardHeader"] path[fill="#FFE7BA"]',
    stats: `[class*="WarehouseCard_homeCardStats"] ${CommonSelectors.tagColor('orange')}`,
    title: '[class*="WarehouseCard_homeCardTitle"]',
  },
  
  projects: {
    button: '[class*="ResearchProjectsCard_homeCardContent"] button',
    description: '[class*="ResearchProjectsCard_homeCardDescription"]',
    header: '[class*="ResearchProjectsCard_homeCardHeader"]',
    icon: '[class*="ResearchProjectsCard_homeCardHeader"] path[fill="#B5F5EC"]',
    stats: `[class*="ResearchProjectsCard_homeCardStats"] ${CommonSelectors.tagColor('cyan')}`,
    title: '[class*="ResearchProjectsCard_homeCardTitle"]',
  },
  
  eqp: {
    button: '[class*="EQPProjectsCard_homeCardContent"] button',
    description: '[class*="EQPProjectsCard_homeCardDescription"]',
    header: '[class*="EQPProjectsCard_homeCardHeader"]',
    icon: '[class*="EQPProjectsCard_homeCardHeader"] path[fill="#E0F2FE"]',
    stats: `[class*="EQPProjectsCard_homeCardStats"] ${CommonSelectors.tagColor('blue')}`,
    title: '[class*="EQPProjectsCard_homeCardTitle"]',
  },
  
  hospitalSystems: {
    button: '[class*="HospitalSystemsCard_homeCardContent"] button',
    description: '[class*="HospitalSystemsCard_homeCardDescription"]',
    header: '[class*="HospitalSystemsCard_homeCardHeader"]',
    icon: '[class*="HospitalSystemsCard_homeCardHeader"] path[fill="#EFDBFF"]',
    stats: `[class*="HospitalSystemsCard_homeCardStats"] ${CommonSelectors.tagColor('purple')}`,
    title: '[class*="HospitalSystemsCard_homeCardTitle"]',
  },
};

export const HomePage = {
  actions: {
    /**
     * Clicks the Catalog button in the header.
     */
    clickCatalogButton() {
      cy.get(selectors.header.catalogIcon).parent().clickAndWait();
    },
    /**
     * Clicks the language button in the header.
     */
    clickLanguageButton() {
      cy.get(selectors.header.language).clickAndWait();
    },
    /**
     * Clicks the logo in the header.
     */
    clickLogo() {
      cy.get(selectors.header.logo).clickAndWait();
    },
    /**
     * Clicks the Explore button for the EQP Projects card.
     */
    clickEQPExploreButton() {
      cy.get(selectors.eqp.button).clickAndWait();
    },
    /**
     * Clicks the Explore button for the Hospital Systems card.
     */
    clickHospitalSystemsExploreButton() {
      cy.get(selectors.hospitalSystems.button).clickAndWait();
    },
    /**
     * Clicks the Explore button for the Research Projects card.
     */
    clickProjectsExploreButton() {
      cy.get(selectors.projects.button).clickAndWait();
    },
    /**
     * Clicks the Explore button for the Warehouse card.
     */
    clickWarehouseExploreButton() {
      cy.get(selectors.warehouse.button).clickAndWait();
    },
  },

  validations: {
    eqp: {
      /**
       * Validates the EQP Projects card button.
       */
      shouldHaveButton() {
        cy.get(selectors.eqp.button).contains('Explore').should('exist');
      },
      /**
       * Validates the EQP Projects card description.
       */
      shouldHaveDescription() {
        cy.get(selectors.eqp.description).contains(CommonTexts.eqpDescription).should('exist');
      },
      /**
       * Validates the EQP Projects card icon.
       */
      shouldHaveIcon() {
        cy.get(selectors.eqp.icon).should('exist');
      },
      /**
       * Validates the EQP Projects card statistics.
       */
      shouldHaveStats() {
        cy.get(selectors.eqp.stats).eq(0).contains(/^\d{1}/).should('exist');
        cy.get(selectors.eqp.stats).eq(0).contains('projects').should('exist');
        cy.get(selectors.eqp.stats).eq(1).contains(/^\d{1}/).should('exist');
        cy.get(selectors.eqp.stats).eq(1).contains('variables').should('exist');
      },
      /**
       * Validates the EQP Projects card title.
       */
      shouldHaveTitle() {
        cy.get(selectors.eqp.title).contains(CommonTexts.eqpTitle).should('exist');
      },
    },
    header: {
      /**
       * Validates the About link in the header.
       */
      shouldHaveAboutLink() {
        cy.get(selectors.header.link).eq(2).should('have.attr', 'href', CommonTexts.aboutUrl).contains('About');
      },
      /**
       * Validates all header elements are displayed.
       */
      shouldHaveHeaderElements() {
        cy.get(selectors.header.logo).should('exist');
        cy.get(selectors.header.catalogIcon).should('exist');
        cy.get(CommonSelectors.headerButton).contains('Catalog').should('exist');
        cy.get(CommonSelectors.headerButton).contains('About').should('exist');
        cy.get(selectors.header.aboutIcon).should('exist');
        cy.get(selectors.header.userAvatar).contains(CommonTexts.userAvatar).should('exist');
        cy.get(selectors.header.userName).contains(CommonTexts.userName).should('exist');
        cy.get(selectors.header.language).contains(CommonTexts.switchLanguage).should('exist');
      },
    },
    hospitalSystems: {
      /**
       * Validates the Hospital Systems card button.
       */
      shouldHaveButton() {
        cy.get(selectors.hospitalSystems.button).contains('Explore').should('exist');
      },
      /**
       * Validates the Hospital Systems card description.
       */
      shouldHaveDescription() {
        cy.get(selectors.hospitalSystems.description).contains(CommonTexts.hospitalSystemsDescription).should('exist');
      },
      /**
       * Validates the Hospital Systems card icon.
       */
      shouldHaveIcon() {
        cy.get(selectors.hospitalSystems.icon).should('exist');
      },
      /**
       * Validates the Hospital Systems card statistics.
       */
      shouldHaveStats() {
        cy.get(selectors.hospitalSystems.stats).eq(0).contains(/^\d{1}/).should('exist');
        cy.get(selectors.hospitalSystems.stats).eq(0).contains('systems').should('exist');
        cy.get(selectors.hospitalSystems.stats).eq(1).contains(/^\d{1}/).should('exist');
        cy.get(selectors.hospitalSystems.stats).eq(1).contains('variables').should('exist');
      },
      /**
       * Validates the Hospital Systems card title.
       */
      shouldHaveTitle() {
        cy.get(selectors.hospitalSystems.title).contains(CommonTexts.hospitalSystems).should('exist');
      },
    },
    projects: {
      /**
       * Validates the Research Projects card button.
       */
      shouldHaveButton() {
        cy.get(selectors.projects.button).contains('Explore').should('exist');
      },
      /**
       * Validates the Research Projects card description.
       */
      shouldHaveDescription() {
        cy.get(selectors.projects.description).contains(CommonTexts.projectsDescription).should('exist');
      },
      /**
       * Validates the Research Projects card icon.
       */
      shouldHaveIcon() {
        cy.get(selectors.projects.icon).should('exist');
      },
      /**
       * Validates the Research Projects card statistics.
       */
      shouldHaveStats() {
        cy.get(selectors.projects.stats).eq(0).contains(/^\d{1}/).should('exist');
        cy.get(selectors.projects.stats).eq(0).contains('projects').should('exist');
        cy.get(selectors.projects.stats).eq(1).contains(/^\d{1}/).should('exist');
        cy.get(selectors.projects.stats).eq(1).contains('variables').should('exist');
      },
      /**
       * Validates the Research Projects card title.
       */
      shouldHaveTitle() {
        cy.get(selectors.projects.title).contains(CommonTexts.projectsTitle).should('exist');
      },
    },
    /**
     * Validates the main subtitle of the homepage.
     */
    shouldHaveSubtitle() {
      cy.get(selectors.subtitle).contains(CommonTexts.homePageSubtitle).should('exist');
    },
    /**
     * Validates the Title of the home page.
       * @param isFR Whether to check the title in french (default: false).
     */
    shouldHaveTitle(isFR: boolean = false) {
      const expectedTitle = isFR ? CommonTexts.homePageTitleFR : CommonTexts.homePageTitle;
      cy.get(selectors.title).contains(expectedTitle).should('exist');
    },
    warehouse: {
      /**
       * Validates the Warehouse card button.
       */
      shouldHaveButton() {
        cy.get(selectors.warehouse.button).contains('Explore').should('exist');
      },
      /**
       * Validates the Warehouse card description.
       */
      shouldHaveDescription() {
        cy.get(selectors.warehouse.description).contains(CommonTexts.warehouseDescription).should('exist');
      },
      /**
       * Validates the Warehouse card icon.
       */
      shouldHaveIcon() {
        cy.get(selectors.warehouse.icon).should('exist');
      },
      /**
       * Validates the Warehouse card statistics.
       */
      shouldHaveStats() {
        cy.get(selectors.warehouse.stats).eq(0).contains(data.resourceWarehouse.tables).should('exist');
        cy.get(selectors.warehouse.stats).eq(0).contains('tables').should('exist');
        cy.get(selectors.warehouse.stats).eq(1).contains(data.resourceWarehouse.variables.totalCount).should('exist');
        cy.get(selectors.warehouse.stats).eq(1).contains('variables').should('exist');
        cy.get(selectors.warehouse.stats).eq(2).contains(/^\d{1}/).should('exist');
        cy.get(selectors.warehouse.stats).eq(2).contains('hospital systems').should('exist');
        cy.get(selectors.warehouse.stats).eq(3).contains(/^\d{1}/).should('exist');
        cy.get(selectors.warehouse.stats).eq(3).contains('domains').should('exist');
      },
      /**
       * Validates the Warehouse card title.
       */
      shouldHaveTitle() {
        cy.get(selectors.warehouse.title).contains(CommonTexts.warehouseTitle).should('exist');
      },
    },
  },
};
