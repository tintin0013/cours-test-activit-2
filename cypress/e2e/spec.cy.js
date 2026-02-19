/// <reference types="cypress" />

describe('Home page spec', () => {

  beforeEach(() => {
    // Vider le localStorage avant chaque test pour isoler les tests
    cy.clearLocalStorage();

    // Ajouter un utilisateur initial pour le premier test
    const initialUsers = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        birth: "2000-01-01",
        city: "Paris",
        postalCode: "75000"
      }
    ];
    localStorage.setItem('users', JSON.stringify(initialUsers));
  });

  it('doit afficher 1 utilisateur déjà inscrit', () => {
    // Visiter la page principale
    cy.visit('http://localhost:3000');

    // Vérifier que le compteur affiche 1 utilisateur
    cy.contains('1 utilisateur inscrit').should('be.visible');
  });

  it('doit créer un deuxième utilisateur et mettre à jour le compteur', () => {
    // Visiter la page principale
    cy.visit('http://localhost:3000');

    // Remplir le formulaire pour ajouter Alice
    cy.get('#firstname').clear().type('Alice');
    cy.get('#lastname').clear().type('Smith');
    cy.get('#email').clear().type('alice.smith@example.com');
    cy.get('#birth').clear().type('2000-01-01');
    cy.get('#city').clear().type('Lyon');
    cy.get('#postalCode').clear().type('69000');

    // Vérifier que le bouton submit est activé
    cy.get('.submit-button').should('not.be.disabled');

    // Soumettre le formulaire
    cy.get('.submit-button').click();

    // Vérifier que le message de succès s'affiche
    cy.get('[role="alert"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Utilisateur valide');

    // Vérifier que le localStorage contient maintenant 2 utilisateurs
    cy.window().its('localStorage.users').should('exist').then((storedUsers) => {
      const usersArray = JSON.parse(storedUsers);
      expect(usersArray.length).to.equal(2);
    });

    // Vérifier que le compteur affiché est correct
    cy.contains('2 utilisateurs inscrits').should('be.visible');
  });

});