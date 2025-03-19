/// <reference types="cypress"/>
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    clickAndIntercept(selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number): cy & CyEventEmitter;
    clickAndWait(options?: Partial<ClickOptions>): Chainable<Element>;
    inputDropdownSelectValue(tab: string, eq: number, valueLabel: string, isMultiSelect: boolean = false): cy & CyEventEmitter
    login(): cy & CyEventEmitter;
    logout(): cy & CyEventEmitter;
    removeFilesFromFolder(folder: string): cy & CyEventEmitter;
    resetColumns(eq: number = 0): cy & CyEventEmitter;
    showColumn(column: string|RegExp, eq: number = 0): cy & CyEventEmitter;
    sortTableAndIntercept(column: string|RegExp, nbCalls: number, eq: number = 0): cy & CyEventEmitter;
    sortTableAndWait(column: string|RegExp, eq: number = 0): cy & CyEventEmitter;
    typeAndIntercept(selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    validateFileContent(fixture: string, replacements?: Replacement[]): cy & CyEventEmitter;
    validateFileHeaders(fixture: string): cy & CyEventEmitter;
    validateFileName(namePattern: string): cy & CyEventEmitter;
    validatePaging(total: string|RegExp, eq: number = 0): cy & CyEventEmitter;
    validateTableFirstRow(expectedValue: string|RegExp, eq: number = 0, hasCheckbox: boolean = false, selector: string = ''): cy & CyEventEmitter;
    validateTableResultsCount(expectedCount: string|RegExp, shouldExist: boolean = true, eq: number = 0): cy & CyEventEmitter;
    visitAndIntercept(url: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitCatalog(tab?: string): cy & CyEventEmitter;
    visitResourceEntity(code: string): cy & CyEventEmitter;
    visitTableEntity(resource: string, name: string): cy & CyEventEmitter;
    visitVariableEntity(resource: string, table: string,name: string): cy & CyEventEmitter;
    waitUntilFile(ms: number): cy & CyEventEmitter;
    waitWhileSpin(ms: number): cy & CyEventEmitter;
  }
}
