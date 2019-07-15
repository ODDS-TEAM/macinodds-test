// For return userID:5d250385a67b86e4230cd5d5


describe('macinodds_user_test', () => {

    var localHost = "http://localhost:4200/"
    var localMenuViewUser = "http://localhost:4200/user/app/menu-view-user";
    var localLoginPage = "http://localhost:4200/login";

    it(".user, login", () =>{

        cy.visit(localHost);
        cy.get('#btn-user').click();

    })

    it(".first page ", () => {

        cy.url().should("eq", localMenuViewUser);
        
    })

// For return userID:5d250385a67b86e4230cd5d5 

    it(".check profile", () => {

        cy.get('.img_pro').should('be.visible');
        cy.get('[class="mat-nav-list mat-list-base"]')
            .contains('Clements Barrera')
        cy.get('[class="mat-nav-list mat-list-base"]')
            .contains('example@odds.team');

        // cy.get('[class="ng-star-inserted"]')
        //     .find('div[class="mat-list-item-content"]')
        //     .contains('Menu User Test')
        //     .click()
        // cy.url().should("eq", localMenuViewUser);

    })
   

    it("show my mac component", () => {
        cy.get('#name').contains('Macbook Pro 2018');
        cy.contains('Serial');
        cy.get('#serial').contains('5d25061ae2271f67bb0745e2');
        cy.contains('สเปค');
        cy.get('#spec').contains('Intel Core i5 2.3 GHz, Memory 4 GB 2133 MHz LPDDR3, HD 500 GB.');
        // cy.contains('วันที่ยืม');
        // cy.get('#borrowDate').contains('28/06/2016');
        cy.contains('กำหนดคืน');
        cy.get('#returnDate').contains('28/06/2019');

        cy.get('#btn-return').click({force: true});

    })

    const device = {
        memo: 'TEST for user return',
        location: 'workwize'
    }

    it(".add info in Returnmodal", () => {

        cy.get('.modal').invoke('show').should('be.visible')
        cy.get('.modal-content')
        cy.contains("บันทึกการคืน");
        

        cy.contains("สภาพเครื่อง");
        // cy.get('#memo').focus().blur();
        cy.get('#memo').type(device.memo, { force: true }).should("have.value", 'TEST for user return');
        cy.contains("สถานที่คืน");
        // cy.get('#location').focus().blur();
        cy.get('#location').type(device.location, { force: true }).should("have.value", 'workwize');
        cy.get('#btn-Submit').click({force: true});
        
    })


//For borrow userID:5d250385aa920601650f984d

    // it(".check profile", () => {

    //     cy.get('.img_pro').should('be.visible');
    //     cy.get('[class="mat-nav-list mat-list-base"]')
    //         .contains('Odom Hardy')
    //     cy.get('[class="mat-nav-list mat-list-base"]')
    //         .contains('example@odds.team');

    //     // cy.get('[class="ng-star-inserted"]')
    //     //     .find('div[class="mat-list-item-content"]')
    //     //     .contains('Menu User Test')
    //     //     .click()
    //     // cy.url().should("eq", localMenuViewUser);

    // })

    // it("show my mac component", () => {
    //     cy.get('#name-0').contains('Macbook Pro 2018');
    //     cy.get('#status-av-0');
    //     cy.contains('Serial');
    //     cy.get('#serial-0').contains('5d25061ae2271f67bb0745e2');
    //     cy.contains('สเปค');
    //     cy.get('#spec-0').contains('Intel Core i5 2.3 GHz, Memory 4 GB 2133 MHz LPDDR3, HD 500 GB.');

    //     cy.get('#btn-borrow-0').click({force: true});

    // })


    // it(".add info in Returnmodal", () => {

    //     cy.get('.modal').invoke('show').should('be.visible')
    //     cy.get('.modal-content')
    //     cy.contains("เลือกวันที่ต้องการคืน");
        
    //     cy.contains("เลือกวันที่ที่ต้องการคืน");
    //     cy.get('.mat-datepicker-toggle-default-icon').click();
    //     cy.get('.mat-calendar-body-today').click();
        
    //     cy.get('#Btn-submit').click({force: true});
    // })
})

