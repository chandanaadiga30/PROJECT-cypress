class PaymentDetails {
    amountField(){
        return cy.get("input[name='amount']");
    }
    nameField(){
        return cy.get("input[name='fullName']");
    }
    nameErrorValidation(){
        return cy.get(':nth-child(3) > .MuiFormControl-root > .MuiFormHelperText-root');
    }
    emailField(){
        return cy.get("input[name='email']");
    }
    emailErrorValidation(){
        return cy.get(':nth-child(4) > .MuiFormControl-root > .MuiFormHelperText-root');
    }
    countryCode(){
        return cy.get("div.selected-flag");
    }
    countryList(){
        return cy.get(".country-list").find("li[role='option']");
    }
    phoneNumberField(){
        return cy.get("input[placeholder='Phone Number']");
    }
    paymentButton(){
       return cy.get("button[type='button']")
    }

}

export default PaymentDetails;