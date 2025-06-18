/// <reference types="cypress"/>
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { CommonTexts } from 'cypress/pom/shared/Texts';
import { formatResourceType, formatToK, getColumnName, getColumnPosition, getResourceColor, stringToRegExp } from 'cypress/pom/shared/Utils';
import { oneMinute } from 'cypress/pom/shared/Utils';
import { Replacement } from 'cypress/pom/shared/Types';

const selectorPanel = '[id*="panel-variables"]';
const selectorHead = CommonSelectors.tableHead;
const selectors = {
  clearFilterLink: `${selectorPanel} [class*="Header_clearFilterLink"]`,
  downloadButton: `${selectorPanel} ${CommonSelectors.downloadIcon}`,
  filterTitleInput: (title: string) => `${selectorPanel} [class*="InputSelect_filter"] [title="${title}"]`,
  filterTagInput: `${selectorPanel} [class*="InputSelect_filter"] [class*="ant-tag"]`,
  pageTitle: '[class*="PageLayout_titlePage"]',
  proTableHeader: `${selectorPanel} [class*="Header_ProTableHeader"]`,
  tab: '[data-node-key="variables"]',
  searchInput: `${selectorPanel} [class*="InputSearch_filter"] input`,
  selectInput: `${selectorPanel} [class*="InputSelect_filter"]`,
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
    id: 'label',
    name: 'Label',
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
    id: 'table',
    name: 'Table',
    isVisibleByDefault: true,
    isSortable: true,
    position: 3,
    tooltip: null,
  },
  {
    id: 'type',
    name: 'Type',
    isVisibleByDefault: true,
    isSortable: true,
    position: 4,
    tooltip: null,
  },
  {
    id: 'source',
    name: 'Source',
    isVisibleByDefault: true,
    isSortable: false,
    position: 5,
    tooltip: 'The source refers to the hospital system that is the origin of the variable.',
  },
  {
    id: 'createdOn',
    name: 'Created On',
    isVisibleByDefault: false,
    isSortable: true,
    position: 6,
    tooltip: CommonTexts.createdOnTooltip('variable'),
  },
  {
    id: 'updatedOn',
    name: 'Updated On',
    isVisibleByDefault: false,
    isSortable: true,
    position: 7,
    tooltip: CommonTexts.updatedOnTooltip('variable'),
  },
];

export const VariablesTable = {
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
       * Clicks the link in a specific table cell for a given variable and column.
       * @param dataVariable The variable object.
       * @param columnID The ID of the column.
       */
      clickTableCellLink(dataVariable: any, columnID: string) {
        cy.get(selectors.tableCell(dataVariable)).eq(getColumnPosition(tableColumns, columnID)).find(CommonSelectors.link).clickAndWait();
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
       * Selects a source in the filter dropdown.
       * @param dataResource The resource object.
       */
      selectSourceFilter(dataResource: any) {
        cy.inputDropdownSelectValue(selectorPanel, 3/*Source*/, dataResource.code);
      },
      /**
       * Selects a table in the filter dropdown.
       * @param dataTable The table object.
       */
      selectTableFilter(dataTable: any) {
        cy.inputDropdownSelectValue(selectorPanel, 2/*Table*/, dataTable.name);
      },
      /**
       * Shows all columns in the table.
       */
      showAllColumns() {
        tableColumns.forEach((column) => {
          if (!column.isVisibleByDefault) {
            cy.showColumn(stringToRegExp(column.name, true/*exact*/), 1);
          };
        });
      },
      /**
       * Shows a specific column in the table.
       * @param columnID The ID of the column to show.
       */
      showColumn(columnID: string) {
        cy.showColumn(stringToRegExp(getColumnName(tableColumns, columnID), true/*exact*/), 1);
      },
      /**
       * Sorts a column, optionally using an intercept.
       * @param columnID The ID of the column to sort.
       * @param needIntercept Whether to use an intercept (default: true).
       */
      sortColumn(columnID: string, needIntercept: boolean = true) {
        const columnName = getColumnName(tableColumns, columnID);
        if (needIntercept) {
          cy.sortTableAndIntercept(stringToRegExp(columnName, true/*exact*/), 1, 1);
        }
        else {
          cy.sortTableAndWait(stringToRegExp(columnName, true/*exact*/), 1);
        };
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
       * Types a source name in the source filter input.
       * @param dataSource The resource object.
       */
      typeSourceFilter(dataSource: any) {
        cy.get(selectors.selectInput).eq(3/*Source*/).type(dataSource.name.toLowerCase());
      },
      /**
       * Types a table name in the table filter input.
       * @param dataTable The table object or a string.
       */
      typeTableFilter(dataTableOrTExt: { name: string } | string) {
        const text = typeof dataTableOrTExt === 'string' ? dataTableOrTExt : dataTableOrTExt.name.toLowerCase();
        cy.get(selectors.selectInput).eq(2/*Table*/).type(text);
      },
      /**
       * Types text in the variable search input.
       * @param text The text to type.
       */
      typeVariableSearchInput(text: string) {
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
       * @param dataVariable The variable object containing the expected values.
       */
      shouldHaveExportedFileContent(dataVariable: any) {
        const replacements: Replacement[] = [
          { placeholder: '{{name}}', value: dataVariable.name },
          { placeholder: '{{label}}', value: dataVariable.label },
          { placeholder: '{{resource}}', value: dataVariable.resourceName },
          { placeholder: '{{table}}', value: dataVariable.table },
          { placeholder: '{{source}}', value: dataVariable.source.replace(/\s/g, '') },
          { placeholder: '{{createdOn}}', value: dataVariable.createdOn },
          { placeholder: '{{updatedOn}}', value: dataVariable.updatedOn },
        ];
        cy.validateFileContent('ExportTableauVariables.json', replacements);
      },
      /**
       * Validates the headers of the exported file.
       */
      shouldHaveExportedFileHeaders() {
        cy.validateFileHeaders('ExportTableauVariables.json');
      },
      /**
       * Validates the name of the exported file.
       */
      shouldHaveExportedFileName() {
        cy.validateFileName('variables');
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
          cy.get(selectorHead).eq(1).contains(stringToRegExp(column.name, true/*exact*/)).should(expectedExist);
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
       * @param filterName The filter value to apply (usually the variable name).
       * @param count The expected results count (string or number).
       */
      shouldRedirectAndValidateTable(filterNames: string[], count: string | number)
      {
        this.shouldShowPageTitle();
        this.shouldHaveActiveTab();
        filterNames.forEach((name) => {
          this.shouldShowFilterInput(name);
        });
        this.shouldShowResultsCount(count);
      },
      /**
       * Validates that all columns are displayed in the correct order in the table.
       */
      shouldShowAllColumns() {
        VariablesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          cy.get(`${selectorHead}`).eq(1).find(`${CommonSelectors.tableCell}`).eq(column.position).contains(stringToRegExp(column.name, true/*exact*/)).should('exist');
        });
      },
      /**
       * Validates the presence of tooltips on columns.
       */
      shouldShowColumnTooltips() {
        VariablesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          if (column.tooltip) {
            cy.get(CommonSelectors.tableHead).eq(1).find(CommonSelectors.tableCell).contains(stringToRegExp(column.name, true/*exact*/)).shouldHaveTooltip(column.tooltip);
          }
        });
      },
      /**
       * Checks that a filter input with the given value exists.
       * @param value The value to check in the filter input.
       */
      shouldShowFilterInput(value: string) {
        cy.get(selectors.filterTitleInput(value)).should('exist');
      },
      /**
       * Checks that a filter tag with the given value exists.
       * @param value The value to check in the filter tag.
       */
      shouldShowFilterTag(value: string) {
        cy.get(selectors.filterTagInput).contains(value).should('exist');
      },
      /**
       * Checks that the "No Results" message is displayed.
       */
      shouldShowNoResultsMessage() {
        cy.get(selectors.proTableHeader).contains(/^No Results$/).should('exist');
      },
      /**
       * Checks the presence of the Object name in the dropdown.
       * @param dataObject The object containing the name.
       * @param shouldExist Whether the tag should exist (default: true).
       */
      shouldShowObjectInDropdown(dataObject: any, shouldExist: boolean = true) {
        const strExist = shouldExist ? 'exist' : 'not.exist';
        cy.get(`${CommonSelectors.dropdown} ${CommonSelectors.title(dataObject.name)}`).should(strExist);
      },
      /**
       * Checks the presence of the Object in the filter.
       * @param dataObject The object containing the name.
       * @param shouldExist Whether the name should exist (default: true).
       */
      shouldShowObjectInFilter(dataObject: any, shouldExist: boolean = true) {
        const strExist = shouldExist ? 'exist' : 'not.exist';
        cy.get(selectors.filterTitleInput(dataObject.name)).should(strExist);
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
        VariablesTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          cy.getColumnHeadCell(column.name, 1).shouldBeSortable(column.isSortable);
        });
      },
      /**
       * Validates the content of all columns in the table for a given table.
       * @param dataVariable The variable object containing the expected values.
       */
      shouldShowTableContent(dataVariable: any) {
        tableColumns.forEach((column) => {
          switch (column.id) {
            case 'resource':
              cy.get(selectors.tableCell(dataVariable)).eq(column.position).contains(dataVariable[`${column.id}Name`]).should('exist');
              break;
            case 'type':
              cy.get(selectors.tableCell(dataVariable)).eq(column.position).contains(dataVariable[column.id]).should('exist');
              cy.get(selectors.tableCell(dataVariable)).eq(column.position).find(CommonSelectors.tag).should('exist');
              break;
            default:
              cy.get(selectors.tableCell(dataVariable)).eq(column.position).contains(dataVariable[column.id]).should('exist');
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

        VariablesTable.actions.sortColumn(columnID, needIntercept);
        cy.get(`${selectorPanel} ${CommonSelectors.tableRow}`).eq(0).find('td').eq(columnIndex).invoke('text').then((smallestValue) => {
          const smallest = smallestValue.trim();

          VariablesTable.actions.sortColumn(columnID);
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
  