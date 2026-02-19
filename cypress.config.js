const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
<<<<<<< HEAD
    baseUrl: "http://localhost:3000",   // URL locale de ton app React
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",  // Où sont tes tests e2e
    supportFile: "cypress/support/e2e.js",  // fichier support
    setupNodeEvents(on, config) {
      // implémentation des événements node si besoin
    },
  },
});
=======
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
>>>>>>> revert_stable
