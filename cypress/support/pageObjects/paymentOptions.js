class PaymentOptions {
    payNow(){
        return cy.get('#PayNowButtonWeb');
    }
    totalAmount(){
        return cy.get('#PriceDetailsTotal span')
    }
    invalidValidationAlert(){
        return cy.get('#invalidOptionAlert');
    }
    summaryAmount(){
        return cy.get('#PriceDetailsTotal span');
    }
    radioBox(){
        return cy.get("input[type='radio']");
    }
    payUsingWallet(){
        return cy.get('#walletlang');
    }
    payUsingBnpl(){
        return cy.get('#bnpllang');
    }
    payUsingCredit(){
        return cy.get('#creditcardlang');
    }
    payUsingCrypto(){
        return cy.get('#cryptolangDirect');
    }
    payCod(){
        return cy.get('#CodDirect > #atmlangDirect');
    }
    payDirectBankTransfer(){
        return cy.get('#directbanktransferlangDirect');
    }
    paymentFailedMessage(){
        return cy.get('.failedMessage');
    }
    tryAgain(){
        return cy.get('#failpoplang2');
    }
    failedMessage(){
        return cy.get('#failpoplang');
    }
    verifyQRcode(){
        return cy.get('img#qrcode-image');
    }
    imageUpload(){
        return cy.get('#uploadimg');
    }
    enterRecipientName(){
        return cy.get('#recipientnameweb');
    }

}

export default PaymentOptions;