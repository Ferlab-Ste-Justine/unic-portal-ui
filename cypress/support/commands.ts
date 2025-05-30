/// <reference types="cypress"/>
import createUUID from './createUUID';
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { getDateTime } from 'cypress/support/utils';
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

Cypress.Commands.add('getColumnHeadCell', (columnName: string, eq: number = 0) => {
  cy.get(CommonSelectors.tableHead).eq(eq).find(CommonSelectors.tableCell).then(($tableCells) => {
    let matchedCell: JQuery<HTMLElement> | undefined = undefined;
    $tableCells.each((_index, cell) => {
      if (cell.textContent?.includes(columnName)) {
        matchedCell = Cypress.$(cell);
        return false;
      };
    });
    if (matchedCell) {
      return matchedCell;
    };
  });
});

Cypress.Commands.add('hideColumn', (column: string|RegExp, eq: number = 0) => {
  cy.get('[data-icon="setting"]').eq(eq).clickAndWait();

  cy.intercept('PUT', '**/user').as('getPOSTuser');
  cy.get('[class*="ColumnSelector_ProTablePopoverColumnListWrapper"]').contains(column).find('[type="checkbox"]').uncheck();
  cy.wait('@getPOSTuser', {timeout: oneMinute});

  cy.get('[class*="Header_ProTableHeader"]').eq(eq).clickAndWait();
});

Cypress.Commands.add('inputDropdownSelectValue', (tabSelector: string, eq: number, valueLabel: string, isMultiSelect: boolean = false) => {
  cy.get(`${tabSelector} [class*="InputSelect_filter"]`).eq(eq).type(valueLabel);
  if (isMultiSelect) {
    cy.get(`${CommonSelectors.dropdown} [label="${valueLabel}"]`).clickAndWait();
    cy.get(`${tabSelector} [class*="InputSelect_title"]`).eq(eq).click();
  }
  else {
    cy.get(`${CommonSelectors.dropdown} [title="${valueLabel}"]`).clickAndWait();
  }
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
 cy.get('[data-cy="Login"]').clickAndWait();
 cy.wait(2000);

 cy.get('[class*="Header_langButton"]').invoke('text').then((invokeText) => {
   if (invokeText.includes("EN")) {
     cy.get('[class*="Header_langButton"]').clickAndWait();
   };
 });
});

Cypress.Commands.add('logout', () => {
  cy.visit('/');
  cy.wait(2000);

  cy.get('[class*="Header_menuTrigger"] [class*="anticon-down"]').eq(0).click();
  cy.get('[data-menu-id*="logout"]').clickAndWait();
});

Cypress.Commands.add('removeFilesFromFolder', (folder: string) => {
  cy.exec(`/bin/rm ${folder}/*`, {failOnNonZeroExit: false});
});

Cypress.Commands.add('resetColumns', (eq: number = 0) => {
  cy.get('[data-icon="setting"]').eq(eq).clickAndWait();
  cy.get('button[class*="ColumnSelector_ProTablePopoverColumnResetBtn"]').eq(0).clickAndWait({force: true});
  cy.get('button[class*="ColumnSelector_ProTablePopoverColumnResetBtn"]').eq(0).should('be.disabled');
  cy.get('[data-icon="setting"]').eq(eq).clickAndWait();
  cy.get('[class*="Header_ProTableHeader"]').eq(eq).clickAndWait();
});

Cypress.Commands.add('shouldBeSortable', { prevSubject: 'element' }, (subject, isSortable: boolean) => {
  const strExpectedSortable = isSortable ? 'have.class' : 'not.have.class';
  cy.wrap(subject).should(strExpectedSortable, 'ant-table-column-has-sorters');
});

Cypress.Commands.add('shouldHaveActiveTab', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('have.class', 'ant-tabs-tab-active');
});

Cypress.Commands.add('shouldHavePopover', { prevSubject: 'element' }, (subject, popoverTitle: string, popoverContent: string) => {
  cy.wrap(subject).trigger('mouseover', { eventConstructor: 'MouseEvent' });
  cy.get('[class="ant-popover-title"]').contains(popoverTitle).should('exist');
  cy.get('[class="ant-popover-inner-content"]').contains(popoverContent).should('exist');
});

Cypress.Commands.add('shouldHaveTooltip', { prevSubject: 'element' }, (subject, tooltipContent: string) => {
  cy.wrap(subject).trigger('mouseover', { eventConstructor: 'MouseEvent' });
  cy.get('body').contains(tooltipContent).should('exist');
});

Cypress.Commands.add('showColumn', (column: string|RegExp, eq: number = 0) => {
  cy.get('[data-icon="setting"]').eq(eq).clickAndWait();

  cy.intercept('PUT', '**/user').as('getPOSTuser');
  cy.get('[class*="ColumnSelector_ProTablePopoverColumnListWrapper"]').contains(column).find('[type="checkbox"]').check();
  cy.wait('@getPOSTuser', {timeout: oneMinute});

  cy.get('[class*="Header_ProTableHeader"]').eq(eq).clickAndWait();
});

Cypress.Commands.add('sortTableAndIntercept', (column: string|RegExp, nbCalls: number, eq: number = 0) => {
  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

  cy.get(CommonSelectors.tableHead).eq(eq).contains(column).clickAndWait({force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getPOSTgraphql', {timeout: oneMinute});
  };
});

Cypress.Commands.add('sortTableAndWait', (column: string|RegExp, eq: number = 0) => {
  cy.get(CommonSelectors.tableHead).eq(eq).contains(column).click({force: true});
  cy.wait(1000);
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

Cypress.Commands.add('validateFileContent', (fixture: string, replacements?: Replacement[]) => {
  const arrReplacements = replacements !== undefined ? replacements : [];
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.readFile(`${filename}`).then((file) => {
        let fileWithData = file;
        arrReplacements.forEach((replacement) => {
          fileWithData = fileWithData.replace(replacement.placeholder, replacement.value);
        });
        expectedData.content.forEach((value: any) => {
          let valueWithData = value
          arrReplacements.forEach((replacement) => {
            valueWithData = valueWithData.replace(replacement.placeholder, replacement.value);
          });
          assert.include(fileWithData, valueWithData);
        });
      });
    });
  });
});

Cypress.Commands.add('validateFileHeaders', (fixture: string) => {
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.readFile(`${filename}`).then((file) => {
        expectedData.headers.forEach((header: any) => {
          assert.include(file, header);
        });
      });
    });
  });
});

Cypress.Commands.add('validateFileName', (entity: string) => {
  const { strDate } = getDateTime();

  cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/unic-${entity}-${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}.tsv`).then((result) => {
    const filename = result.stdout.trim();
    cy.readFile(`${filename}`).should('exist');
  });
});

Cypress.Commands.add('validatePaging', (total: string|RegExp, eq: number = 0) => {
  if (typeof total === 'string') {
    total = new RegExp(total);
  }

  cy.get('span[class*="ant-select-selection-item"]').eq(eq).clickAndWait({force: true});
  cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('(Results 1 - 100 of '+total.source+'|'+total.source+' Results)'), true, eq);

  cy.get('span[class*="ant-select-selection-item"]').eq(eq).clickAndWait({force: true});
  cy.get('div[class*="ant-select-item-option-content"]').contains('20 ').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Results 1 - 20 of '+total.source), true, eq);
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('First').parent('button').should('be.disabled');

  cy.wait(2000);
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('Next').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Results 21 - 40 of '+total.source), true, eq);
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('Next').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('(Results 41 - 60 of '+total.source+'|Results 41 - '+total.source+' of '+total.source+')'), true, eq);
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('Previous').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Results 21 - 40 of '+total.source), true, eq);
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('First').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Results 1 - 20 of '+total.source), true, eq);
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
  cy.get('div[class*="Pagination"]').eq(eq).find('button[type="button"]').contains('First').parent('button').should('be.disabled');
});

Cypress.Commands.add('validateTableFirstRow', (expectedValue: string|RegExp, eq: number = 0, hasCheckbox: boolean = false, selector: string = '') => {
  cy.waitWhileSpin(oneMinute);
  cy.wait(1000);
  cy.get(`${selector} ${CommonSelectors.tableRow}`).eq(0)
  .then(($firstRow) => {
    cy.wrap($firstRow).find('td').eq(eq).contains(expectedValue).should('exist');
    if (hasCheckbox) {
      cy.wrap($firstRow).find('[type="checkbox"]').check();
      cy.wrap($firstRow).find('[type="checkbox"]').should('be.checked');
      cy.wrap($firstRow).find('[type="checkbox"]').uncheck();
    };
  });
});

Cypress.Commands.add('validateTableResultsCount', (expectedCount: string|RegExp, shouldExist: boolean = true, eq: number = 0) => {
  const strExist = shouldExist ? 'exist' : 'not.exist';
  cy.get('div[class*="ProTableHeader"]').eq(eq).contains(expectedCount).should(strExist);
});

Cypress.Commands.add('visitAndIntercept', (url: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');
  cy.visit(url);

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: oneMinute});
  };

  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('visitCatalog', (tab?: string) => {
  const strTab = tab !== undefined ? tab : 'resources';
  let eq = strTab === 'resources' ? 0 : 1;

  cy.visitAndIntercept('/catalog/', 'POST','**/graphql', 1);
  cy.get(`[data-node-key="${strTab}"]`).clickAndWait();
  cy.resetColumns(eq);
});

Cypress.Commands.add('visitResourceEntity', (code: string) => {
  cy.visitAndIntercept(`/resource/${code}`, 'POST','**/graphql', 1);
});

Cypress.Commands.add('visitTableEntity', (resource: string, name: string) => {
  cy.visitAndIntercept(`/table/${resource}/${name}`, 'POST','**/graphql', 1);
});

Cypress.Commands.add('visitVariableEntity', (resource: string, table: string,name: string) => {
  cy.visitAndIntercept(`/variable/${resource}/${table}/${name}`, 'POST','**/graphql', 1);
});

Cypress.Commands.add('waitUntilFile', (ms: number) => {
  const start = new Date().getTime();

  function checkFile(): any {
    const now = new Date().getTime();
    if (now - start > ms) {
      throw new Error(`Timed out after ${ms}ms waiting for file`);
    }

    return cy.task('fileExists', `${Cypress.config('downloadsFolder')}`).then((exists) => {
      if (exists) {
        return true;
      } else {
        return cy.wait(500).then(checkFile);
      }
    });
  }

  return checkFile();
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
        return cy.wait(1000).then(checkForSpinners);
      };
    });
  };

  return checkForSpinners();
});

Cypress.Commands.overwrite('log', (_subject, message) => cy.task('log', message));