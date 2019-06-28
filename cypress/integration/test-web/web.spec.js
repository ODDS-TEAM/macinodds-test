describe('Actions', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it("login", () => {

        cy.contains('Welcome to mac.odds.team');
        cy.get('#btn-admin').click();
        // cy.url().should("eq", "http://localhost:4200/admin/app/menu-view-admin");
        cy.contains('Add device').click();
        // cy.url().should("eq", "http://localhost:4200/admin/app/menu-add-device");
    })
})