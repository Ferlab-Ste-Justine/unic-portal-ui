/// <reference types="cypress"/>
import createUUID from './createUUID';
import { oneMinute } from '../support/utils';

export interface Replacement {
  placeholder: string;
  value: string;
}

Cypress.Commands.add('clickAndIntercept', (selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number) => {
  if (!eq) {
    eq = 0;
  }

  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');
  cy.get(selector).eq(eq).clickAndWait({force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher');
  };

  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('clickAndWait', { prevSubject: 'element' }, (subject, options) => {
  cy.wrap(subject).click(options);
  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('login', () => {
  cy.session(['user'], () => {
    cy.visit('/');

    cy.request({
      url: `https://auth.qa.unic.ferlab.bio/realms/UNIC/protocol/openid-connect/auth`,
      qs: {
        client_id: 'unic-client',
        redirect_uri: Cypress.config('baseUrl'),
        kc_idp_hint: null,
        scope: 'openid',
        state: createUUID(),
        nonce: createUUID(),
        response_type: 'code',
        response_mode: 'fragment',
      },
    }).then((response) => {
      const html: HTMLElement = document.createElement('html');
      html.innerHTML = response.body;

      const script = html.getElementsByTagName('script')[0] as HTMLScriptElement;

      eval(script.textContent ?? '');

      const loginUrl: string = (window as any).kcContext.url.loginAction;

      return cy.request({
        form: true,
        method: 'POST',
        url: loginUrl,
        followRedirect: false,
        body: {
          username: Cypress.env('user_username'),
          password: Cypress.env('user_password'),
        },
      });
    });
    cy.waitWhileSpin(oneMinute);
 });
 cy.visit('/');
 cy.get('[data-cy="Login"]').clickAndWait({force: true});

 cy.get('[class*="Header_langButton"]').invoke('text').then((invokeText) => {
   if (invokeText.includes("EN")) {
     cy.get('[class*="Header_langButton"]').clickAndWait();
   };
 });
});

Cypress.Commands.add('logout', () => {
  cy.visit('/');
  cy.wait(2000);

  cy.get('[class*="Header_menuTrigger"] [class*="anticon-down"]').eq(1).click({force: true});
  cy.get('[data-menu-id*="logout"]').clickAndWait({force: true});
});

Cypress.Commands.add('typeAndIntercept', (selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).find('input').type(text, {force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: oneMinute});
  };

  cy.waitWhileSpin(oneMinute);
  cy.wait(1000);
});

Cypress.Commands.add('waitWhileSpin', (ms: number) => {
  const start = new Date().getTime();

  function checkForSpinners():any {
    const now = new Date().getTime();
    if (now - start > ms) {
      throw new Error(`Timed out after ${ms}ms waiting for spinners to disappear`);
    };

    return cy.get('body').then(($body) => {
      if ($body.find('.ant-spin-blur').length > 0) {
        return cy.wait(500).then(checkForSpinners);
      };
    });
  };

  return checkForSpinners();
});

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));