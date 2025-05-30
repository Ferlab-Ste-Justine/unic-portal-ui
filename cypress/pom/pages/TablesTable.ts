/// <reference types="cypress"/>
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { CommonTexts } from 'cypress/pom/shared/Texts';
import { formatResourceType, formatToK, getColumnName, getColumnPosition, getResourceColor } from 'cypress/pom/shared/Utils';
import { Replacement } from 'cypress/support/commands';
import { oneMinute } from 'cypress/support/utils';

const selectorPanel = '[id*="panel-tables"]';
const selectorHead = CommonSelectors.tableHead;
const selectors = {
  clearFilterLink: `${selectorPanel} [class*="Header_clearFilterLink"]`,
  downloadButton: `${selectorPanel} ${CommonSelectors.download}`,
  filterTitleInput: (title: string) => `${selectorPanel} [class*="InputSelect_filter"] ${CommonSelectors.title(title)}`,
  filterTagInput: `${selectorPanel} [class*="InputSelect_filter"] [class*="ant-tag"]`,
  pageTitle: '[class*="PageLayout_titlePage"]',
  proTableHeader: `${selectorPanel} [class*="Header_ProTableHeader"]`,
  searchInput: `${selectorPanel} [class*="InputSearch_filter"] input`,
  selectInput: `${selectorPanel} [class*="InputSelect_filter"]`,
  tab: '[data-node-key="tables"]',
  tableCell: (dataTable: any) => `[data-row-key="${dataTable.dataRowKey}"] [class="ant-table-cell"]`,
};

const tableColumns = [
  {
    id: 'name',
    name: 'Name',
    isVisibleByDefault: true,
    isSortable: true,
    position: 0,
    tooltip: null,
  },
  {
    id: 'description',
    name: 'Description',
    isVisibleByDefault: true,
    isSortable: false,
    position: 1,
    tooltip: null,
  },
  {
    id: 'resource',
    name: 'Resource',
    isVisibleByDefault: true,
    isSortable: true,
    position: 2,
    tooltip: null,
  },
  {
    id: 'entity',
    name: 'Entity',
    isVisibleByDefault: false,
    isSortable: true,
    position: 3,
    tooltip: CommonTexts.tableEntityTooltip,
  },
  {
    id: 'domain',
    name: 'Domain',
    isVisibleByDefault: false,
    isSortable: true,
    position: 4,
    tooltip: CommonTexts.tableDomainTooltip,
  },
  {
    id: 'variableCount',
    name: 'Variable Count',
    isVisibleByDefault: true,
    isSortable: false,
    position: 5,
    tooltip: null,
  },
  {
    id: 'createdOn',
    name: 'Created On',
    isVisibleByDefault: false,
    isSortable: true,
    position: 6,
    tooltip: CommonTexts.createdOnTooltip('table'),
  },
  {
    id: 'updatedOn',
    name: 'Updated On',
    isVisibleByDefault: false,
    isSortable: true,
    position: 7,
    tooltip: CommonTexts.updatedOnTooltip('table'),
  },
];

export const TablesTable = {
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
        cy.clickAndIntercept(selectors.downloadButton, 'POST', '**/graphql', 2);
        cy.waitUntilFile(oneMinute);
      },
      /**
       * Clicks the link in a specific table cell for a given resource and column.
       * @param dataResource The resource object.
       * @param columnID The ID of the column.
       */
      clickTableCellLink(dataResource: any, columnID: string) {
        cy.get(selectors.tableCell(dataResource)).eq(getColumnPosition(tableColumns, columnID)).find(CommonSelectors.link).clickAndWait();
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
        cy.hideColumn(getColumnName(tableColumns, columnID), 1);
      },
      /**
       * Selects a resource in the filter dropdown.
       * @param dataResource The resource object.
       */
      selectResourceFilter(dataResource: any) {
        cy.inputDropdownSelectValue(selectorPanel, 1/*Resource*/, dataResource.name, false/*isMultiSelect*/);
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
            cy.showColumn(column.name, 1);
          };
        });
      },
      /**
       * Shows a specific column in the table.
       * @param columnID The ID of the column to show.
       */
      showColumn(columnID: string) {
        cy.showColumn(getColumnName(tableColumns, columnID), 1);
      },
      /**
       * Sorts a column, optionally using an intercept.
       * @param columnID The ID of the column to sort.
       * @param needIntercept Whether to use an intercept (default: true).
       */
      sortColumn(columnID: string, needIntercept: boolean = true) {
        const columnName = getColumnName(tableColumns, columnID);
        if (needIntercept) {
          cy.sortTableAndIntercept(columnName, 1, 1);
        }
        else {
          cy.sortTableAndWait(columnName, 1);
        }
      },
      /**
       * Types the resource name in the resource filter input.
       * @param dataResource The resource object.
       */
      typeResourceFilter(dataResource: any) {
        cy.get(selectors.selectInput).eq(1/*Resource*/).type(dataResource.name.toLowerCase());
      },
      /**
       * Types the resource name in the resource type filter input.
       * @param dataResource The resource object.
       */
      typeResourceTypeFilter(dataResource: any) {
        cy.get(selectors.selectInput).eq(0/*Resource type*/).type(dataResource.name.toLowerCase());
      },
      /**
       * Types text in the table search input.
       * @param text The text to type.
       */
      typeTableSearchInput(text: string) {
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
        cy.get(selectorHead).eq(1).contains(getColumnName(tableColumns, columnID)).should('exist');
      },
      /**
       * Checks that the tab is active.
       */
      shouldHaveActiveTab() {
        cy.get(selectors.tab).shouldHaveActiveTab();
      },
      /**
       * Validates the content of the exported file.
       * @param dataTable The table object containing the expected values.
       */
      shouldHaveExportedFileContent(dataTable: any) {
        const replacements: Replacement[] = [
          { placeholder: '{{name}}', value: dataTable.name },
          { placeholder: '{{description}}', value: dataTable.description },
          { placeholder: '{{resource}}', value: dataTable.resourceName },
          { placeholder: '{{entity}}', value: dataTable.entity },
          { placeholder: '{{domain}}', value: dataTable.domain },
          { placeholder: '{{variablesCount}}', value: dataTable.variableCount },
          { placeholder: '{{createdOn}}', value: dataTable.createdOn },
          { placeholder: '{{updatedOn}}', value: dataTable.updatedOn },
        ];
        cy.validateFileContent('ExportTableauTables.json', replacements);
      },
      /**
       * Validates the headers of the exported file.
       */
      shouldHaveExportedFileHeaders() {
        cy.validateFileHeaders('ExportTableauTables.json');
      },
      /**
       * Validates the name of the exported file.
       */
      shouldHaveExportedFileName() {
        cy.validateFileName('tables');
      },
      /**
       * Validates the value of the first row for a given column.
       * @param value The expected value (string or RegExp).
       * @param columnID The ID of the column to check.
       */
      shouldHaveFirstRowValue(value: string | RegExp, columnID: string) {
        cy.validateTableFirstRow(value, getColumnPosition(tableColumns, columnID), false/*hasCheckbox*/, selectorPanel);
      },
      /**
       * Validates the default visibility of each column.
       */
      shouldMatchDefaultColumnVisibility() {
        tableColumns.forEach((column) => {
          const expectedExist = column.isVisibleByDefault ? 'exist' : 'not.exist';
          cy.get(selectorHead).eq(1).contains(column.name).should(expectedExist);
        });
      },
      /**
       * Checks that a specific column is not displayed.
       * @param columnID The ID of the column to check.
       */
      shouldNotDisplayColumn(columnID: string) {
        cy.get(selectorHead).eq(1).contains(getColumnName(tableColumns, columnID)).should('not.exist');
      },
      /**
       * Checks that the redirection to the table page works and validates the results count.
       * @param filterName The filter value to apply (usually the table name).
       * @param count The expected results count (string or number).
       */
      shouldRedirectAndValidateTable(filterName: string, count: string | number)
      {
        this.shouldShowPageTitle();
        this.shouldHaveActiveTab();
        this.shouldShowFilterInput(filterName);
        this.shouldShowResultsCount(count);
      },
      /**
       * Validates that all columns are displayed in the correct order in the table.
       */
      shouldShowAllColumns() {
        TablesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          cy.get(`${selectorHead}`).eq(1).find(`${CommonSelectors.tableCell}`).eq(column.position).contains(column.name).should('exist');
        });
      },
      /**
       * Validates the presence of tooltips on columns.
       */
      shouldShowColumnTooltips() {
        TablesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          if (column.tooltip) {
            cy.get(CommonSelectors.tableHead).eq(1).find(CommonSelectors.tableCell).contains(column.name).shouldHaveTooltip(column.tooltip);
          }
        });
      },
      /**
       * Checks that a filter input with the given value exists.
       * @param value The value to check in the filter input.
       * @param shouldExist Whether the input should exist (default: true).
       */
      shouldShowFilterInput(value: string, shouldExist: boolean = true) {
        cy.get(selectors.filterTitleInput(value)).should('exist');
      },
      /**
       * Checks that the "No Results" message is displayed.
       */
      shouldShowNoResultsMessage() {
        cy.get(selectors.proTableHeader).contains(/^No Results$/).should('exist');
      },
      /**
       * Validates the pagination functionality.
       */
      shouldShowPaging(total: string | RegExp) {
        cy.validatePaging(total, 1);
      },
      /**
       * Checks the page title.
       */
      shouldShowPageTitle() {
        cy.get(selectors.pageTitle).contains(CommonTexts.catalogPageTitle).should('exist');
      },
      /**
       * Checks the presence of the reset filters button.
       */
      shouldShowResetFilterButton() {
        cy.get(selectors.proTableHeader).contains(CommonTexts.resetFiltersButton).should('exist');
      },
      /**
       * Checks the presence of the Resource name in the dropdown.
       * @param dataResource The resource object containing the name.
       * @param shouldExist Whether the tag should exist (default: true).
       */
      shouldShowResourceInDropdown(dataResource: any, shouldExist: boolean = true) {
        const strExist = shouldExist ? 'exist' : 'not.exist';
        cy.get(`${CommonSelectors.dropdown} ${CommonSelectors.title(formatResourceType(dataResource.name))}`).should(strExist);
      },
      /**
       * Checks the presence of the Resource in the filter.
       * @param dataResource The resource object containing the name.
       * @param shouldExist Whether the name should exist (default: true).
       */
      shouldShowResourceInFilter(dataResource: any, shouldExist: boolean = true) {
        const strExist = shouldExist ? 'exist' : 'not.exist';
        cy.get(selectors.filterTitleInput(dataResource.name)).should(strExist);
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
        TablesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          cy.getColumnHeadCell(column.name, 1).shouldBeSortable(column.isSortable);
        });
      },
      /**
       * Validates the content of all columns in the table for a given table.
       * @param dataTable The table object containing the expected values.
       */
      shouldShowTableContent(dataTable: any) {
        tableColumns.forEach((column) => {
          switch (column.id) {
            case 'resource':
              cy.get(selectors.tableCell(dataTable)).eq(column.position).contains(dataTable[`${column.id}Name`]).should('exist');
              break;
            default:
              cy.get(selectors.tableCell(dataTable)).eq(column.position).contains(dataTable[column.id]).should('exist');
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
        const columnIndex = getColumnPosition(tableColumns, columnID);

        TablesTable.actions.sortColumn(columnID, needIntercept);
        cy.get(`${selectorPanel} ${CommonSelectors.tableRow}`).eq(0).find('td').eq(columnIndex).invoke('text').then((smallestValue) => {
          const smallest = smallestValue.trim();

          TablesTable.actions.sortColumn(columnID);
          cy.get(`${selectorPanel} ${CommonSelectors.tableRow}`).eq(0).find('td').eq(columnIndex).invoke('text').then((biggestValue) => {
            const biggest = biggestValue.trim();
            if (biggest.localeCompare(smallest) < 0) {
              throw new Error(`Error: "${biggest}" should be >= "${smallest}"`);
            };
          });
        });
      },
    },
  };
  