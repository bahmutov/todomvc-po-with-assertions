import 'cypress-map'
import 'cypress-plugin-steps'

// define a simple custom command to add a todo via UI
Cypress.Commands.add('addTodo', (text: string) => {
  cy.get('.new-todo').type(text + '{enter}')
  // check when the new todo appears in the list
  cy.contains('.todo-list li', text)
})
