/// <reference types="cypress" />

describe('Task Manager E2E simplifié', () => {
    const baseUrl = 'http://localhost:8081';

    beforeEach(() => {
        // Reinitialise la page avant chaque test
        cy.visit(baseUrl);
    });

    it('Affiche le message de bienvenue', () => {
        cy.contains('Welcome to the Task Manager API!');
    });

    it('Ajoute une tâche', () => {
        const taskDescription = 'Tâche test';

        cy.get('input[placeholder="Nouvelle tâche"]').type(taskDescription);
        cy.contains('Ajouter').click();

        // Vérifie que tache apparait dans liste
        cy.contains(taskDescription);
    });

    it('Supprime une tâche', () => {
        const taskDescription = 'Tâche à supprimer';

        // Ajoute la tache
        cy.get('input[placeholder="Nouvelle tâche"]').type(taskDescription);
        cy.contains('Ajouter').click();

        // Supprime la tâche
        cy.contains(taskDescription)
            .parent()
            .contains('Supprimer')
            .click();

        // Vérifie que la tâche a disparu
        cy.contains(taskDescription).should('not.exist');
    });
});
