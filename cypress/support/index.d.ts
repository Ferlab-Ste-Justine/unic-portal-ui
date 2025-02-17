/// <reference types="cypress"/>
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    clickAndIntercept(selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number): cy & CyEventEmitter;
    clickAndWait(options?: Partial<ClickOptions>): Chainable<Element>;
    login(): cy & CyEventEmitter;
    logout(): cy & CyEventEmitter;
    typeAndIntercept(selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitAndIntercept(url: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitCatalog(): cy & CyEventEmitter;
    waitWhileSpin(ms: number): cy & CyEventEmitter;
  }
}
