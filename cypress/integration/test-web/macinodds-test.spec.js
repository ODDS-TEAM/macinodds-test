describe('macinodds_admin_test', () => {

    var menuView = "http://mac.odds.team/admin/app/menu-view-admin";
    var menuAdd = "http://mac.odds.team/admin/app/menu-add-device";
    var menuHistory = "http://mac.odds.team/admin/app/menu-view-history";

    it(".admin , login", () => {

        cy.visit('/');
        cy.contains('Welcome to mac.odds.team');
        cy.get('#btn-admin').click();

    })

    it(".first page . check admin menu", () => {
        cy.get('.img_pro').should('be.visible');
        cy.get('[class="mat-nav-list mat-list-base"]')
            .contains('Username')
            .contains('E-mail');

        cy.get('[class="ng-star-inserted"]')
            .find('div[class="mat-list-item-content"]')
            .contains('View admin')
            .click()
        cy.url().should("eq", menuView);

        cy.get('[class="ng-star-inserted"]')
            .find('div[class="mat-list-item-content"]')
            .contains('Add device')
            .click()
        cy.url().should("eq", menuAdd);

        cy.get('[class="ng-star-inserted"]')
            .find('div[class="mat-list-item-content"]')
            .contains('History')
            .click()
        cy.url().should("eq", menuHistory);

        cy.contains('Sign out')
            .click();
    })


});