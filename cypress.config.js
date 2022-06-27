const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'cfqa7j',
  pageLoadTimeout:30000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/examples/*.js'
  },
  env:{
    "url" : "https://www.stage-page.chaiport.io/2AZX3ENuQMlYlNBlXfr7dcI5ngS"
  },
});
