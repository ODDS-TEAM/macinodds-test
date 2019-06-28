describe('Actions', () => {
    beforeEach(() => {
        //cy.visit('139.5.146.213');
    })

    it("login", () => {
        cy.visit('http://localhost:4200/');
        cy.contains('Welcome to mac.odds.team');
        cy.get('#btn-admin').click();
        cy.url().should("eq", "http://localhost:4200/admin/app/menu-view-admin");
        cy.contains('Add device').click();
        cy.url().should("eq", "http://localhost:4200/admin/app/menu-add-device");
    })

    it("check Add device", () => {
        cy.visit('http://localhost:4200/admin/app/menu-add-device');
        cy.contains("ลงทะเบียนอุปกรณ์");
        cy.contains("ชื่ออุปกรณ์");
        cy.get('#name').type('name device1 cypress [TEST]', { force: true });
        cy.contains("Serial");
        cy.get('#serial').type('fakeSerial0001[TEST]', { force: true });
        cy.contains("สเปค");
        cy.get('#spec').type('macinodds test spec1 [TEST]', { force: true });
        cy.contains("upload file");
        // input file
        cy.fixture('img_mac.png', 'base64').then(fileContent => {
            cy.get('#pic').upload({ fileContent, fileName: 'img_mac.png', mimeType: 'image/png' }, { subjectType: 'input' });
            // cy.get('#pic').contains('img_mac.png');
        });
        cy.contains("สถานะ");
        cy.get('[name="available"]').click();
        cy.get('[class="btn btn-success"]').click();
    })

    it("check View decice", () => {
        cy.visit('http://localhost:4200/admin/app/menu-view-admin');
        // เช็คไฟล์รูป 
        // cy.get('#img-device').should('have.attr', 'src').should('include', '489a0e0c-9ffc-4079-a0e7-33eed5cdd618');

        cy.get('#name-0').contains("name device1 cypress [TEST]");
        cy.get('#serial-0').contains('fakeSerial0001[TEST]');
        cy.get('#spec-0').contains('macinodds test spec1 [TEST]');
        cy.get('#status-av-0').contains('ว่าง').should('have.css', 'color');
        cy
            .get('ul li') // this yields us a jquery object
            .its('length') // calls 'length' property returning that value
            // ensure the length is greater than 2
    })

    // cy.contains('ว่าง').should('have.css', 'color:#d60404');
    // })

    it("check edit decice", () => {
        cy.visit('http://localhost:4200/admin/app/menu-view-admin');
        cy.get('#btn-edit-0').click({ force: true });
        cy.get('#name').should('have.value', "name device1 cypress [TEST]").type('2', { force: true })
        cy.get('#serial').should('have.value', 'fakeSerial0001[TEST]').type('2', { force: true })
        cy.get('#spec').should('have.value', 'macinodds test spec1 [TEST]').type('2', { force: true })
        cy.get('[name="unavailable"]').click();
        cy.contains("ผู้ยืม");
        cy.get('#holder').should('have.value', '').type('name holder', { force: true });
        cy.contains("เบอร์ผู้ยืม");
        cy.get('#tel').type('0888888888', { delay: 100 });
        cy.get('[class="btn btn-danger"]').focus();
        cy.get('[class="btn btn-success"]').click({ force: true });

    })

    it("check delete decice", () => {
        cy.visit('http://localhost:4200/admin/app/menu-view-admin');
        cy.get('#name-3').contains("name device1 cypress [TEST]2");
        cy.get('#serial-3').contains('fakeSerial0001[TEST]2');
        cy.get('#spec-3').contains('macinodds test spec1 [TEST]2');
        cy.get('#status-uv-3').contains('ไม่ว่าง').should('have.css', 'color');
        cy.get('#holder-3').contains('name holder');
        cy.get('#tel-3').contains('0888888888');
        cy.get('#btn-delete-3').click({ force: true });
    })




})