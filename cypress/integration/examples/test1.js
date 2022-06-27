import PaymentDetails from '../../support/pageObjects/paymentDetails';
import PaymentOptions from '../../support/pageObjects/paymentOptions';
import { BrowserMultiFormatReader } from '@zxing/browser';

describe('Payment details page', () => {
    const paymentDetails = new PaymentDetails();
    const paymentOptions = new PaymentOptions();

    beforeEach(function(){
       cy.fixture('inputValues').then(function(data){
          this.data = data;
       })
     })
    it('Veriy the amount field is not editable', function() {
      cy.visit(Cypress.env('url')); //visit is method used to visit any website
      paymentDetails.amountField().should('be.disabled');
    })

    it('Verify Name Field',function(){
      paymentDetails.nameField().type(this.data.name).clear();
      paymentDetails.nameErrorValidation().should('have.text','Required');
      paymentDetails.nameField().type(this.data.nameNum);
      paymentDetails.nameErrorValidation().should('have.text','Some other error');
      paymentDetails.nameField().clear().should('have.attr','maxlength',30).type(this.data.name);
      paymentDetails.nameErrorValidation().should('not.be.visible');
    })

    it('Verify Email Field',function(){
      paymentDetails.emailField().type(this.data.invalidEmail);
      paymentDetails.emailErrorValidation().should('have.text','Some other error')
      paymentDetails.emailField().clear().type(this.data.email);
      paymentDetails.emailErrorValidation().should('not.be.visible');

    })
    it('Select country code and enter Phone number',function(){
      paymentDetails.countryCode().click();
      paymentDetails.countryList().should("have.length",6); // find will look only on parent class (parent child chaining)
      cy.selectCountry(this.data.country);
      paymentDetails.phoneNumberField().type(this.data.phoneNumber);
    })

    it('Click on Submit Button and verify you are navigating to checkout page', function() {
      paymentDetails.paymentButton().click();
      cy.url().should('include','stage-checkout.chaiport.io');

    })

    it('Verify total amount and amount to pay', function() {
      let totalText;
      paymentOptions.totalAmount().then(function(total){
      totalText = total.text();
      })
       paymentOptions.payNow().then(function(ele){
       const actualText = ele.text();
       let result = actualText.split(" ");
       result = result[1].trim( );
       expect(totalText).to.equal(result);
     })
    })

    it('No payment option is selected and I click on pay button',function(){
      paymentOptions.payNow().scrollIntoView().click();
      paymentOptions.invalidValidationAlert().should('have.text',"Please select a payment option!");
      })

    it('Pay Using BNPL',function(){
      paymentOptions.payUsingBnpl().click();
      paymentOptions.radioBox().check('wallets-ATOME-ATOME_BNPL').should('be.checked');
      paymentOptions.payNow().scrollIntoView().click();
      paymentOptions.tryAgain().click();
      cy.url().should('include','stage-checkout.chaiport.io');
    })

    it('Pay Using Crypto',function(){
      paymentOptions.payUsingCrypto().click();
      paymentOptions.payNow().scrollIntoView().click();
      paymentOptions.failedMessage().should('have.text','Payment Failed!');
      paymentOptions.tryAgain().click();
      cy.url().should('include','stage-checkout.chaiport.io');
    })

    it('Direct Bank Transfer',function(){
      paymentOptions.payDirectBankTransfer().click();
      paymentOptions.imageUpload().attachFile('transcationDetails.jpeg');
      paymentOptions.enterRecipientName().scrollIntoView().type(this.data.name);
      paymentOptions.payNow().click();
      cy.go('back');
      cy.wait(3000);

   })

   it('Pay Using COD',function(){
    cy.loginDetails();
    paymentOptions.payCod().click();
    paymentOptions.payNow().scrollIntoView().click();
    cy.go('back');
    cy.wait(4000);
  })

   it('Pay through Wallet', function(){
     cy.loginDetails();
     paymentOptions.payUsingWallet().click();
     paymentOptions.radioBox().check('wallets-OMISE-OMISE_PAYNOW').should('be.checked');
     paymentOptions.payNow().scrollIntoView().click();
     paymentOptions.verifyQRcode().should('be.visible');
     
    //  paymentOptions.verifyQRcode().then($el =>{
    //     const img = $el[0];
    //     const image = new Image();
    //     image.width = img.width;
    //     image.height = img.height;
    //     image.src = img.src;
    //     image.crossOrigin = 'Anonymous';
    //     return image;
    //   }).then(function(image) {
    //     let reader = new BrowserMultiFormatReader();
    //     return reader.decodeFromImageElement(image[0])
    //   })
    //   .then(result => {
    //     expect(result.getText()).to.equal('This is test QR');
    //   });
   //})
    })
  })