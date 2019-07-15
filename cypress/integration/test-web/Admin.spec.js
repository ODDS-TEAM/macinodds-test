describe('macinodds_admin_test', () => {
    // beforeEach(() => {
    //     cy.visit('/');
    // })

    const device = {
        name: 'name device1 cypress [TEST]',
        serial: 'fakeSerial0001[TEST]',
        spec: 'macinodds test spec1 [TEST]',
        image: 'img_mac.png',
        holder: 'name holder',
        tel: '0888888888'
    }
    var result;
    var macApi = 'http://mac.odds.team/api/mac';
    var menuView = "http://mac.odds.team/user/app/menu-view-admin";
    var menuAdd = "http://mac.odds.team/admin/app/menu-add-device";
    var menuHistory = "http://mac.odds.team/admin/app/menu-view-history";
    var loginPage = "http://mac.odds.team/login"

    var localHost = "http://localhost:4200/"
    var localMenuView = "http://localhost:4200/user/app/menu-view-admin";
    var localMenuAdd = "http://localhost:4200/admin/app/menu-add-device";
    var localMenuHistory = "http://localhost:4200/admin/app/menu-view-history";
    var localLoginPage = "http://localhost:4200/login"
        /*
            const ProfileCourseName = 'img_mac.png';
            const ProfileCoursefileType = 'application/png';
            const ProfileCoursefileInput = 'input[name="thumbnail"]';
            cy.get('input[name="thumbnail"]')
                .upload_file(ProfileCourseName, ProfileCoursefileType, ProfileCoursefileInput);
        */
    it(".server , server status", () => {

        // Validate the status
        result = cy.request(macApi);
        result.its('status')
            .should('equal', 200);
        // Validate the header
        result = cy.request(macApi);
        result.its('headers')
            .its('content-type')
            .should('include', 'application/json');
    })

    it(".admin , login", () => {

        cy.visit(localHost);
        cy.contains('Welcome to mac.odds.team');
        cy.get('#btn-admin').click();

    })

    it(".first page . check admin menu", () => {

        cy.url().should("eq", localMenuView);
        cy.get('.img_pro').should('be.visible');
        cy.get('[class="mat-nav-list mat-list-base"]')
            .contains('Sanders Melendez')
        cy.get('[class="mat-nav-list mat-list-base"]')
            .contains('example@odds.team');

        cy.get('[class="ng-star-inserted"]')
            .find('div[class="mat-list-item-content"]')
            .contains('View Admin')

        cy.get('[class="ng-star-inserted"]')
            .find('div[class="mat-list-item-content"]')
            .contains('Add Device')
            .click()
        cy.url().should("eq", localMenuAdd);

        cy.get('[class="ng-star-inserted"]')
            .find('div[class="mat-list-item-content"]')
            .contains('History')
            .click()
        cy.url().should("eq", localMenuHistory);

        cy.contains('Sign Out')
            .click();
        cy.url().should("eq", localLoginPage);
    })


    it(".check profile", () => {

        cy.get('#btn-admin').click();
        cy.get('.img_pro').should('be.visible');
        cy.get('[class="mat-nav-list mat-list-base"]')
            .contains('Sanders Melendez');
        cy.get('[class="mat-nav-list mat-list-base"]')
            .contains('example@odds.team');
        cy.get('[class="ng-star-inserted"]')
            .find('div[class="mat-list-item-content"]')
            .contains('Add Device')
            .click()
        cy.url().should("eq", localMenuAdd);

    })

    it(".Add Device . check contains and clear input", () => {

        cy.contains("ลงทะเบียนอุปกรณ์");
        cy.contains("ระบุชื่ออุปกรณ์");
        cy.get('#name').focus().blur();
        cy.contains("ระบุ serial");
        cy.get('#serial').focus().blur();
        cy.contains("ระบุสเปคเครื่อง");
        cy.get('#spec').focus().blur();
        cy.contains("ที่อยู่ของอุปกรณ์");
        cy.get('#location').focus().blur();
        cy.contains("รูปภาพเครื่อง");
        cy.contains("Upload Image");

        // input file
        cy.get('#name').type(device.name, { force: true }).should("have.value", 'name device1 cypress [TEST]');
        cy.get('#serial').type(device.serial, { force: true }).should("have.value", 'fakeSerial0001[TEST]');;
        cy.get('#spec').type(device.spec, { force: true }).should("have.value", 'macinodds test spec1 [TEST]');;
        cy.get('#btn-upload-file').click();
        cy.get('#img-show-upload').click();
        cy.get('#openUploadModal').click({ force: true })
        cy.wait(300)
        cy.fixture('upload-cloud.png', 'base64').then(fileContent => {
            cy.get('#button-select-crop').upload({ fileContent, fileName: 'upload-cloud.png', mimeType: 'image/*' }, { subjectType: 'input' });
        });
        cy.wait(300);
        cy.get('#button-cropping').click({ force: true });
        cy.wait(300);


    })

    it(".Add Device , Can clear From", () => {
        // // check clear funtion
        cy.get('#cancelBt').click();
        cy.get('#name').should('have.value', "")
        cy.get('#serial').should('have.value', "")
        cy.get('#spec').should('have.value', "")
        cy.get('#img-show-upload').should('have.value', "")
        cy.wait(100);
        cy.contains('View Admin').click();
    })

    it(".Add Device . Add new device (check post api)", () => {
        cy.contains('Add Device').click();
        cy.get('#name').type(device.name, { force: true }).should("have.value", 'name device1 cypress [TEST]');
        cy.get('#serial').type(device.serial, { force: true }).should("have.value", 'fakeSerial0001[TEST]');;
        cy.get('#spec').type(device.spec, { force: true }).should("have.value", 'macinodds test spec1 [TEST]');;
        cy.get('#btn-upload-file').click();
        cy.get('#img-show-upload').click();
        cy.get('#openUploadModal').click({ force: true })
        cy.wait(300)
        cy.fixture('upload-cloud.png', 'base64').then(fileContent => {
            cy.get('#button-select-crop').upload({ fileContent, fileName: 'upload-cloud.png', mimeType: 'image/*' }, { subjectType: 'input' });
        });
        cy.wait(300);
        cy.get('#button-cropping').click({ force: true });
        cy.wait(300);
        cy.contains("upload-cloud.png");
        cy.get('#saveBt').click();
    })


    // it(".Edit device , check form ", () => {

    //     cy.get('#btn-edit-0').click({ force: true });
    //     cy.get('#name').should("have.value", 'name device1 cypress [TEST]')
    //     cy.get('#serial').should("have.value", 'fakeSerial0001[TEST]')
    //     cy.get('#spec').should("have.value", 'macinodds test spec1 [TEST]')

    // })

    // it(".Edit device , edit form", () => {

    //     cy.get('#name').type(2, { force: true }).should("have.value", 'name device1 cypress [TEST]2');
    //     cy.get('#serial').type(2, { force: true }).should("have.value", 'fakeSerial0001[TEST]2');
    //     cy.get('#spec').type(2, { force: true }).should("have.value", 'macinodds test spec1 [TEST]2');
    //     cy.get('[class="btn btn-default-black"]').focus();
    //     cy.get('[class="btn btn-default-blue"]').click({ force: true });

    // })

    // it(".View admin , check change after edit", () => {

    //     cy.get('#name-0').contains("name device1 cypress [TEST]2");
    //     cy.get('#serial-0').contains('fakeSerial0001[TEST]2');
    //     cy.get('#spec-0').contains('macinodds test spec1 [TEST]2');
    //     cy.get('#status-av-0').contains('ว่าง').should('have.css', 'color');

    // })

    // it(".delete device , delete test device", () => {

    //     cy.get('#btn-delete-0').click({ force: true });

    // })

    // it(".View admin ,check after delete device", () => {

    //     cy.get('[class="list-group"]').children();
    //     // cy.contains("name device1 cypress [TEST]2");
    //     // cy.contains('fakeSerial0001[TEST]2');
    //     // cy.contains('macinodds test spec1 [TEST]2');

    // })
})