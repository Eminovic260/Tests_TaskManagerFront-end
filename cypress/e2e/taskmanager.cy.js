/// <reference types="cypress" />

describe('Task Manager E2E', () => {
    const baseUrl = 'http://localhost:8081';

    beforeEach(() => {
        // Réinitialiser la page avant chaque test
        cy.visit(baseUrl);
    });

    it('Affiche le message Hello', () => {
        cy.contains('Welcome to the Task Manager API!');
    });

    it('Affiche la liste des tâches (initialement vide)', () => {
        cy.get('.task-item').should('have.length', 0);
        cy.contains('Aucune tâche pour le moment.');
    });

    it('Ajoute une nouvelle tâche', () => {
        const taskDescription = 'Tâche test e2e';

        cy.get('input[placeholder="Nouvelle tâche"]').type(taskDescription);
        cy.contains('Ajouter').click();

        // Vérifie que la tâche est ajoutée dans la liste
        cy.contains(taskDescription);
        cy.get('.task-item').should('have.length.greaterThan', 0);
    });

    it('Complète une tâche', () => {
        const taskDescription = 'Tâche à compléter';

        // Ajoute la tâche
        cy.get('input[placeholder="Nouvelle tâche"]').type(taskDescription);
        cy.contains('Ajouter').click();

        // Clique sur le bouton Compléter
        cy.contains(taskDescription)
            .parent()
            .contains('Compléter')
            .click();

        // Vérifie que la classe "completed" est appliquée
        cy.contains(taskDescription).should('have.class', 'completed');
    });

    it('Supprime une tâche', () => {
        const taskDescription = 'Tâche à supprimer';

        // Ajoute la tâche
        cy.get('input[placeholder="Nouvelle tâche"]').type(taskDescription);
        cy.contains('Ajouter').click();

        // Supprime la tâche
        cy.contains(taskDescription)
            .parent()
            .contains('Supprimer')
            .click();

        // Vérifie que la tâche a été supprimée
        cy.contains(taskDescription).should('not.exist');
    });
});
