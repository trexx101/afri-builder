import { customElementName } from '../support';

describe('Main', () => {
beforeEach(() => {
  cy.getOauth2Data();
  cy.get('@oauth2Data').then(oauth2Data => {
    cy.keycloackLogin(oauth2Data, 'user');
  });
});

afterEach(() => {
  cy.get('@oauth2Data').then(oauth2Data => {
    cy.keycloackLogout(oauth2Data);
  });
  cy.clearCache();
});

  describe('Form widget', () => {
    it('should load the page', () => {
      cy.get(customElementName).should('exist');
    });

    it('should display all the entity fields in the component', () => {
        cy.contains('entities.appUser.username').should('be.visible');
        cy.contains('entities.appUser.password').should('be.visible');
        cy.contains('entities.appUser.firstname').should('be.visible');
        cy.contains('entities.appUser.lastname').should('be.visible');
        cy.contains('entities.appUser.email').should('be.visible');
    });
  });
});
