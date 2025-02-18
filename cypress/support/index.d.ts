/// <reference types="cypress"/>
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    clickAndIntercept(selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number): cy & CyEventEmitter;
    clickAndWait(options?: Partial<ClickOptions>): Chainable<Element>;
    login(): cy & CyEventEmitter;
    logout(): cy & CyEventEmitter;
    resetColumns(table_id?: string): cy & CyEventEmitter;
    showColumn(column: string|RegExp): cy & CyEventEmitter;
    sortTableAndIntercept(column: string|RegExp, nbCalls: number): cy & CyEventEmitter;
    sortTableAndWait(column: string|RegExp): cy & CyEventEmitter;
    typeAndIntercept(selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    validatePaging(total: string|RegExp, eqSelect: number): cy & CyEventEmitter;
    validateTableFirstRow(expectedValue: string|RegExp, eq: number, hasCheckbox: boolean = false): cy & CyEventEmitter;
    validateTableResultsCount(expectedCount: string|RegExp, shouldExist: boolean = true): cy & CyEventEmitter;
    visitAndIntercept(url: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitCatalog(): cy & CyEventEmitter;
    waitWhileSpin(ms: number): cy & CyEventEmitter;
  }
}
