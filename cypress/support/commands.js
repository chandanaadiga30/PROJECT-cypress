import PaymentDetails from '../support/pageObjects/paymentDetails';
import { BrowserMultiFormatReader } from '@zxing/browser';

const reader = new BrowserMultiFormatReader();
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  Cypress.Commands.add('selectCountry', (country) => {   
    cy.get("ul.country-list").find("li[role='option']").each(($el,index,$list)=>{
    const flagVal = $el.find('span.country-name').text();
    if(flagVal.includes(country)){
        cy.wrap($el).find("span.country-name").click();
    }
 }) })

 Cypress.Commands.add('loginDetails',()=>{
   const paymentDetails = new PaymentDetails();
    paymentDetails.nameField().type("testUserA");
    paymentDetails.emailField().type("testUserA@automation.com");
    paymentDetails.phoneNumberField().type("9481403127");
    paymentDetails.paymentButton().click();
 })

 import 'cypress-file-upload';

