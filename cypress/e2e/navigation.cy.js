/// <reference types="cypress" />

describe('Navigation utilisateur multi-pages', () => {

  beforeEach(() => {
    // Réinitialiser le localStorage avant chaque scénario
    cy.clearLocalStorage();
  });

  it('Scénario Nominal : Ajouter un utilisateur valide', () => {
    // Aller à l'accueil et vérifier 0 utilisateur
    cy.visit('http://localhost:3000/');
    cy.contains('0 utilisateur inscrit').should('be.visible');
    cy.get('ul').should('be.empty');

    // Aller au formulaire
    cy.contains('Aller au formulaire').click();

    // Remplir le formulaire
    cy.get('#firstname').type('Alice');
    cy.get('#lastname').type('Dupont');
    cy.get('#email').type('alice.dupont@example.com');
    cy.get('#birth').type('2000-01-01');
    cy.get('#city').type('Paris');
    cy.get('#postalCode').type('75000');

    // Soumettre le formulaire
    cy.get('.submit-button').click({ force: true });

    // Retourner à l'accueil
    cy.visit('http://localhost:3000/');

    // Vérifier le compteur et la liste
    cy.contains('1 utilisateur inscrit').should('be.visible');
    cy.get('ul li').first().should('contain.text', 'Alice Dupont');
  });

  it('Scénario d\'Erreur : Tentative ajout invalide', () => {
    // Préparer un utilisateur existant
    const existingUsers = [
      {
        firstName: 'Alice',
        lastName: 'Dupont',
        email: 'alice.dupont@example.com',
        birth: '2000-01-01',
        city: 'Paris',
        postalCode: '75000'
      }
    ];
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Aller à l'accueil
    cy.visit('http://localhost:3000/');
    cy.contains('1 utilisateur inscrit').should('be.visible');

    // Aller au formulaire
    cy.contains('Aller au formulaire').click();

    // Essayer d'ajouter un utilisateur invalide (email incorrect)
    cy.get('#firstname').type('Bob');
    cy.get('#lastname').type('Martin');
    cy.get('#email').type('invalid'); // email invalide
    cy.get('#birth').type('2000-01-01');
    cy.get('#city').type('Lyon');
    cy.get('#postalCode').type('69000');

    // Soumettre le formulaire
    cy.get('.submit-button').click({ force: true });

    // Vérifier que le message d'erreur affiché correspond au nouveau format
    cy.contains('Email invalide').should('be.visible');

    // Retourner à l'accueil et vérifier que la liste reste inchangée
    cy.visit('http://localhost:3000/');
    cy.contains('1 utilisateur inscrit').should('be.visible');
    cy.get('ul li').should('have.length', 1);
    cy.get('ul li').first().should('contain.text', 'Alice Dupont');
  });

});