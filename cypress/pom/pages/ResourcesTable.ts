/// <reference types="cypress"/>
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { CommonTexts } from 'cypress/pom/shared/Texts';
import { formatResourceType, getColumnName, getColumnPosition, getResourceColor, isFerlease, stringToRegExp } from 'cypress/pom/shared/Utils';
import { formatToK } from 'cypress/pom/shared/Utils';
import { oneMinute } from 'cypress/pom/shared/Utils';
import { Replacement } from 'cypress/pom/shared/Types';

const selectorPanel = '[id*="panel-resources"]';
const selectorHead = CommonSelectors.tableHead;
const selectors = {
  clearFilterLink: `${selectorPanel} [class*="Header_clearFilterLink"]`,
  downloadButton: `${selectorPanel} ${CommonSelectors.downloadIcon}`,
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
    tooltip: CommonTexts.updatedOnTooltip('resource'),
  },
  {
    id: 'createdOn',
    name: 'Created On',
    isVisibleByDefault: false,
    isSortable: true,
    position: 4,
    tooltip: CommonTexts.createdOnTooltip('resource'),
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

export const ResourcesTable = {
    actions: {
      /**
       * Clears all filters in the table.
       */
      clearFilters() {
        cy.get(selectors.clearFilterLink).clickAndWait();
      },
      /**
       * Clears the value in the select input.
       */
      clearInputSelect() {
        cy.get(`${selectors.selectInput} ${CommonSelectors.clearSelect}`).clickAndWait();
      },
      /**
       * Clicks the download button and waits for the file to be available.
       */
      clickDownloadButton() {
        cy.get(selectors.downloadButton).clickAndWait();
        cy.waitUntilFile(oneMinute);
      },
      /**
       * Clicks the link in a specific table cell for a given resource and column.
       * @param dataResource The resource object.
       * @param columnID The ID of the column.
       */
      clickTableCellLink(dataResource: any, columnID: string) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            cy.get(selectors.tableCell(dataResource)).eq(position).find(CommonSelectors.link).clickAndWait();
          };
        }));
      },
      /**
       * Deletes the resource type tag from the filter.
       * @param dataResource The resource object.
       */
      deleteResourceTypeTag(dataResource: any) {
        cy.get(`${selectors.selectInput} ${CommonSelectors.tagColor(getResourceColor(dataResource.type))} ${CommonSelectors.closeIcon}`).clickAndWait();
      },
      /**
       * Hides a specific column in the table.
       * @param columnID The ID of the column to hide.
       */
      hideColumn(columnID: string) {
        cy.hideColumn(getColumnName(tableColumns, columnID));
      },
      /**
       * Selects a resource type in the filter dropdown.
       * @param dataResource The resource object.
       */
      selectResourceTypeFilter(dataResource: any) {
        cy.inputDropdownSelectValue(selectorPanel, 0/*Resource type*/, formatResourceType(dataResource.type), true/*isMultiSelect*/);
      },
      /**
       * Shows all columns in the table.
       */
      showAllColumns() {
        tableColumns.forEach((column) => {
          if (!column.isVisibleByDefault) {
            cy.showColumn(stringToRegExp(column.name, true/*exact*/));
          };
        });
      },
      /**
       * Shows a specific column in the table.
       * @param columnID The ID of the column to show.
       */
      showColumn(columnID: string) {
        cy.showColumn(stringToRegExp(getColumnName(tableColumns, columnID), true/*exact*/));
      },
      /**
       * Sorts a column, optionally using an intercept.
       * @param columnID The ID of the column to sort.
       * @param needIntercept Whether to use an intercept (default: true).
       */
      sortColumn(columnID: string, needIntercept: boolean = true) {
        const columnName = getColumnName(tableColumns, columnID);
        if (needIntercept) {
          cy.sortTableAndIntercept(stringToRegExp(columnName, true/*exact*/), 1);
        }
        else {
          cy.sortTableAndWait(stringToRegExp(columnName, true/*exact*/));
        };
      },
      /**
       * Types the resource name in the resource type filter input.
       * @param dataResource The resource object.
       */
      typeResourceTypeFilter(dataResource: any) {
        cy.get(selectors.selectInput).eq(0).type(dataResource.name.toLowerCase());
      },
      /**
       * Types text in the resource search input.
       * @param text The text to type.
       */
      typeResourceSearchInput(text: string) {
        cy.get(selectors.searchInput).type(text);
        cy.waitWhileSpin(oneMinute);
      }
    },
  
    validations: {
      /**
       * Checks that a specific column is displayed.
       * @param columnID The ID of the column to check.
       */
      shouldDisplayColumn(columnID: string) {
        cy.get(selectorHead).contains(getColumnName(tableColumns, columnID)).should('exist');
      },
      /**
       * Checks that the tab is active.
       */
      shouldHaveActiveTab() {
        cy.get(selectors.tab).shouldHaveActiveTab();
      },
      /**
       * Validates the content of the exported file.
       * @param dataResource The resource object containing the expected values.
       */
      shouldHaveExportedFileContent(dataResource: any) {
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
      /**
       * Validates the headers of the exported file.
       */
      shouldHaveExportedFileHeaders() {
        cy.validateFileHeaders('ExportTableauRessources.json');
      },
      /**
       * Validates the name of the exported file.
       */
      shouldHaveExportedFileName() {
        cy.validateFileName('resources');
      },
      /**
       * Validates the value of the first row for a given column.
       * @param value The expected value (string or RegExp).
       * @param columnID The ID of the column to check.
       */
      shouldHaveFirstRowValue(value: string | RegExp, columnID: string) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            cy.validateTableFirstRow(value, position);
          };
        }));
      },
      /**
       * Validates the default visibility of each column.
       */
      shouldMatchDefaultColumnVisibility() {
        tableColumns.forEach((column) => {
          const expectedExist = column.isVisibleByDefault ? 'exist' : 'not.exist';
          cy.get(selectorHead).contains(stringToRegExp(column.name, true/*exact*/)).should(expectedExist);
        });
      },
      /**
       * Checks that a specific column is not displayed.
       * @param columnID The ID of the column to check.
       */
      shouldNotDisplayColumn(columnID: string) {
        cy.get(selectorHead).contains(getColumnName(tableColumns, columnID)).should('not.exist');
      },
      /**
       * Validates that all columns are displayed in the correct order in the table.
       */
      shouldShowAllColumns() {
        ResourcesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          cy.get(selectors.tableHeadCell).eq(column.position).contains(stringToRegExp(column.name, true/*exact*/)).should('exist');
        });
      },
      /**
       * Validates the presence of tooltips on columns.
       */
      shouldShowColumnTooltips() {
        ResourcesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          if (column.tooltip) {
            cy.getColumnHeadCell(column.name).shouldHaveTooltip(column.tooltip);
          }
        });
      },
      /**
       * Validates the presence of the description popover.
       * @param dataResource The resource object containing the expected description.
       */
      shouldShowDescriptionPopover(dataResource: any) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, 'description').then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            cy.get(selectors.tableCell(dataResource)).eq(position).contains(dataResource.description.slice(0, 13)).shouldHavePopover(dataResource.name, dataResource.description);
          };
        }));
      },
      /**
       * Checks that the "No Results" message is displayed.
       */
      shouldShowNoResultsMessage() {
        cy.get(selectors.proTableHeader).contains(/^No Results$/).should('exist');
      },
      /**
       * Checks the page title.
       */
      shouldShowPageTitle() {
        cy.get(selectors.pageTitle).contains(CommonTexts.catalogPageTitle).should('exist');
      },
      /**
       * Validates the pagination functionality.
       */
      shouldShowPaging(total: string | RegExp) {
        cy.validatePaging(total, 0);
      },
      /**
       * Checks the presence of the reset filters button.
       */
      shouldShowResetFilterButton() {
        cy.get(selectors.proTableHeader).contains(CommonTexts.resetFiltersButton).should('exist');
      },
      /**
       * Checks the presence of the Resource Type tag in the dropdown.
       * @param dataResource The resource object containing the type.
       * @param shouldExist Whether the tag should exist (default: true).
       */
      shouldShowResourceTypeTagInDropdown(dataResource: any, shouldExist: boolean = true) {
        const strExist = shouldExist ? 'exist' : 'not.exist';
        cy.get(`${CommonSelectors.dropdown} ${CommonSelectors.label(formatResourceType(dataResource.type))} ${CommonSelectors.tagColor(getResourceColor(dataResource.type))}`).should(strExist);
      },
      /**
       * Checks the presence of the Resource Type tag in the filter.
       * @param dataResource The resource object containing the type.
       * @param shouldExist Whether the tag should exist (default: true).
       */
      shouldShowResourceTypeTagInFilter(dataResource: any, shouldExist: boolean = true) {
        const strExist = shouldExist ? 'exist' : 'not.exist';
        cy.get(`${selectors.selectInput} ${CommonSelectors.tagColor(getResourceColor(dataResource.type))}`).should(strExist);
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
       * Validates that sortable columns are correctly marked as sortable.
       */
      shouldShowSortableColumns() {
        ResourcesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          cy.getColumnHeadCell(column.name).shouldBeSortable(column.isSortable);
        });
      },
      /**
       * Validates the content of all columns in the table for a given resource.
       * @param dataResource The resource object containing the expected values.
       */
      shouldShowTableContent(dataResource: any) {
        tableColumns.forEach((column) => {
          switch (column.id) {
            case 'type':
              cy.get(selectors.tableCell(dataResource)).eq(column.position).contains(formatResourceType(dataResource.type)).should('exist');
              cy.get(selectors.tableCell(dataResource)).eq(column.position).find(CommonSelectors.tagColor(getResourceColor(dataResource.type))).should('exist');
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
      /**
       * Validates the sorting functionality of a column.
       * @param columnID The ID of the column to sort.
       * @param needIntercept Whether to use an intercept for the sorting action (default: true).
       */
      shouldSortColumn(columnID: string, needIntercept: boolean = true) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            ResourcesTable.actions.sortColumn(columnID, needIntercept);
            cy.get(CommonSelectors.tableRow).eq(0).find('td').eq(position).invoke('text').then((smallestValue) => {
              const smallest = smallestValue.trim();

              ResourcesTable.actions.sortColumn(columnID);
              cy.get(CommonSelectors.tableRow).eq(0).find('td').eq(position).invoke('text').then((biggestValue) => {
                const biggest = biggestValue.trim();
                if (biggest.localeCompare(smallest) < 0) {
                  throw new Error(`Error: "${biggest}" should be >= "${smallest}"`);
                };
              });
            });
          };
        }));
      },
    },
  };
