/// <reference types="cypress"/>
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { formatResourceType, getColumnName, getColumnPosition, getResourceColor } from 'cypress/pom/shared/Utils';
import { formatToK } from 'cypress/pom//shared/Utils';
import { oneMinute } from 'cypress/support/utils';
import { Replacement } from 'cypress/support/commands';

const selectorPanel = '[id*="panel-resources"]';
const selectorHead = CommonSelectors.tableHead;
const selectors = {
  downloadButton: `${selectorPanel} [data-icon="download"]`,
  pageTitle: '[class*="PageLayout_titlePage"]',
  proTableHeader: `${selectorPanel} [class*="Header_ProTableHeader"]`,
  searchInput: `${selectorPanel} [class*="InputSearch_filter"] input`,
  selectInput: `${selectorPanel} [class*="InputSelect_filter"]`,
  tab: '[data-node-key="resources"]',
  tableCell: (dataResource: any) => `[data-row-key="${dataResource.dataRowKey}"] [class="ant-table-cell"]`,
  tableHeadCell: `${selectorHead} ${CommonSelectors.tableCell}`,
};

const tableColumns = [
  {
    id: 'code',
    name: 'Code',
    isVisibleByDefault: false,
    isSortable: true,
    position: 0,
    tooltip: null,
  },
  {
    id: 'name',
    name: 'Name',
    isVisibleByDefault: true,
    isSortable: true,
    position: 1,
    tooltip: null,
  },
  {
    id: 'type',
    name: 'Type',
    isVisibleByDefault: true,
    isSortable: true,
    position: 2,
    tooltip: null,
  },
  {
    id: 'updatedOn',
    name: 'Updated On',
    isVisibleByDefault: true,
    isSortable: true,
    position: 3,
    tooltip: 'Date of the most recent update of the dictionary for this resource',
  },
  {
    id: 'createdOn',
    name: 'Created On',
    isVisibleByDefault: false,
    isSortable: true,
    position: 4,
    tooltip: 'Creation date of the dictionary for this resource',
  },
  {
    id: 'approvedOn',
    name: 'Approved On',
    isVisibleByDefault: false,
    isSortable: false,
    position: 5,
    tooltip: 'Date when the project was approved for research or for quality improvement assessment at CHUSJ for this resource',
  },
  {
    id: 'tables',
    name: 'Table',
    isVisibleByDefault: true,
    isSortable: false,
    position: 6,
    tooltip: null,
  },
  {
    id: 'variables',
    name: 'Variable',
    isVisibleByDefault: true,
    isSortable: false,
    position: 7,
    tooltip: null,
  },
  {
    id: 'description',
    name: 'Description',
    isVisibleByDefault: true,
    isSortable: false,
    position: 8,
    tooltip: null,
  },
  {
    id: 'collectionStartingYear',
    name: 'Collection Starting Year',
    isVisibleByDefault: false,
    isSortable: false,
    position: 9,
    tooltip: null,
  },
  {
    id: 'version',
    name: 'Version',
    isVisibleByDefault: false,
    isSortable: false,
    position: 10,
    tooltip: null,
  },
  {
    id: 'naganoID',
    name: 'Nagano ID',
    isVisibleByDefault: false,
    isSortable: false,
    position: 11,
    tooltip: null,
  },
  {
    id: 'principalInvestigator',
    name: 'Principal Investigator',
    isVisibleByDefault: false,
    isSortable: false,
    position: 12,
    tooltip: null,
  },
];

const texts = {
  pageTitle: 'UnIC Catalog',
  resetFilters: 'Reset filters',
};

export const ResourcesTable = {
    actions: {
      clickDownloadButton() {
        cy.get(selectors.downloadButton).clickAndWait();
        cy.waitUntilFile(oneMinute);
      },
      clickTableCellLink(dataResource: any, columnID: string) {
        cy.get(selectors.tableCell(dataResource)).eq(getColumnPosition(tableColumns, columnID)).find(CommonSelectors.link).clickAndWait();
      },
      searchResource(text: string) {
        cy.get(selectors.searchInput).type(text);
        cy.waitWhileSpin(oneMinute);
      },
      selectResourceTypeFilter(dataResource: any) {
        cy.inputDropdownSelectValue(selectorPanel, 0/*Resource type*/, formatResourceType(dataResource.type), true/*isMultiSelect*/);
      },
      showAllColumns() {
        tableColumns.forEach((column) => {
          if (!column.isVisibleByDefault) {
            cy.showColumn(column.name);
          };
        });
      },
      sortColumn(columnID: string, needIntercept: boolean = true) {
        const columnName = getColumnName(tableColumns, columnID);
        if (needIntercept) {
          cy.sortTableAndIntercept(columnName, 1);
        }
        else {
          cy.sortTableAndWait(columnName);
        }
      },
      typeResourceTypeFilter(dataResource: any) {
        cy.get(selectors.selectInput).eq(0).type(dataResource.name.toLowerCase());
      }
    },
  
    validations: {
      columnPositions() {
        ResourcesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          cy.get(selectors.tableHeadCell).eq(column.position).contains(column.name).should('exist');
        });
      },
      columnSortable() {
        ResourcesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          cy.getColumnHeadCell(column.name).shouldBeSortable(column.isSortable);
        });
      },
      columnSorting(columnID: string, needIntercept: boolean = true) {
        const columnIndex = getColumnPosition(tableColumns, columnID);

        ResourcesTable.actions.sortColumn(columnID, needIntercept);
        cy.get(CommonSelectors.tableRow).eq(0).find('td').eq(columnIndex).invoke('text').then((smallestValue) => {
          const smallest = smallestValue.trim();

          ResourcesTable.actions.sortColumn(columnID);
          cy.get(CommonSelectors.tableRow).eq(0).find('td').eq(columnIndex).invoke('text').then((biggestValue) => {
            const biggest = biggestValue.trim();
            expect(biggest.localeCompare(smallest)).to.be.at.least(0);
          });
        });
      },
      columnTooltips() {
        ResourcesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          if (column.tooltip) {
            cy.getColumnHeadCell(column.name).shouldHaveTooltip(column.tooltip);
          }
        });
      },
      columnVisibility() {
        tableColumns.forEach((column) => {
          const expectedExist = column.isVisibleByDefault ? 'exist' : 'not.exist';
          cy.get(selectorHead).contains(column.name).should(expectedExist);
        });
      },
      displayedColumn(columnName: string) {
        cy.get(selectorHead).contains(columnName).should('exist');
      },
      fileContent(dataResource: any) {
        const replacements: Replacement[] = [
          { placeholder: '{{code}}', value: dataResource.code },
          { placeholder: '{{name}}', value: dataResource.name },
          { placeholder: '{{type}}', value: dataResource.type },
          { placeholder: '{{updatedOn}}', value: dataResource.updatedOn },
          { placeholder: '{{createdOn}}', value: dataResource.createdOn.toString().slice(2, 10) },
          { placeholder: '{{approvedOn}}', value: dataResource.approvedOn.toString().slice(2, 10) },
          { placeholder: '{{tables}}', value: dataResource.tables.toString() },
          { placeholder: '{{variablesCount}}', value: dataResource.variables.totalCount },
          { placeholder: '{{description}}', value: dataResource.description },
          { placeholder: '{{collectionStartingYear}}', value: dataResource.collectionStartingYear },
          { placeholder: '{{version}}', value: dataResource.version },
          { placeholder: '{{naganoID}}', value: dataResource.naganoID },
          { placeholder: '{{principalInvestigator}}', value: dataResource.principalInvestigator },
        ];
        cy.validateFileContent('ExportTableauRessources.json', replacements);
      },
      fileHeaders() {
        cy.validateFileHeaders('ExportTableauRessources.json');
      },
      fileName() {
        cy.validateFileName('resources');
      },
      firstRowValue(value: string | RegExp, columnID: string) {
        cy.validateTableFirstRow(value, getColumnPosition(tableColumns, columnID));
      },
      hiddenColumn(columnName: string) {
        cy.get(selectorHead).contains(columnName).should('not.exist');
      },
      paging(total: string | RegExp) {
        cy.validatePaging(total, 0);
      },
      pageTitle() {
        cy.get(selectors.pageTitle).contains(texts.pageTitle).should('exist');
      },
      popoverDescription(dataResource: any) {
        cy.get(selectors.tableCell(dataResource)).eq(getColumnPosition(tableColumns, 'description')).contains(dataResource.description.slice(0, 13)).shouldHavePopover(dataResource.name, dataResource.description);
      },
      resetFilterButton() {
        cy.get(selectors.proTableHeader).contains(texts.resetFilters).should('exist');
      },
      resourceTypeTagFilter(dataResource: any, shouldExist: boolean = true) {
        const strExist = shouldExist ? 'exist' : 'not.exist';
        cy.get(`${CommonSelectors.dropdown} ${CommonSelectors.label(formatResourceType(dataResource.type))} ${CommonSelectors.tag(getResourceColor(dataResource.type))}`).should(strExist);
      },
      resultsCount(count: string | number) {
        const countToK = formatToK(count);
        cy.get(selectors.proTableHeader).contains(new RegExp(`(^${countToK} Result$| of ${countToK}$)`)).should('exist');
      },
      tabActive() {
        cy.get(selectors.tab).shouldHaveActiveTab();
      },
      tableContent(dataResource: any) {
        tableColumns.forEach((column) => {
          switch (column.id) {
            case 'type':
              cy.get(selectors.tableCell(dataResource)).eq(column.position).contains(formatResourceType(dataResource.type)).should('exist');
              cy.get(selectors.tableCell(dataResource)).eq(column.position).find(CommonSelectors.tag(getResourceColor(dataResource.type))).should('exist');
              break;
            case 'variables':
              cy.get(selectors.tableCell(dataResource)).eq(column.position).contains(dataResource[column.id].totalCount).should('exist');
              break;
            case 'description':
              cy.get(selectors.tableCell(dataResource)).eq(column.position).contains(dataResource[column.id].slice(0, 13)).should('exist');
              break;
            default:
              cy.get(selectors.tableCell(dataResource)).eq(column.position).contains(dataResource[column.id]).should('exist');
              break;
          }
        });
      },
    },
  };
