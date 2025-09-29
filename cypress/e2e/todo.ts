// https://github.com/bahmutov/cy-spok
// @ts-nocheck
import spok from 'cy-spok'

export const TodoMVC = {
  addTodo(title: string) {
    cy.get('.new-todo').type(`${title}{enter}`)
  },

  getTodos() {
    return cy.get('.todo-list li')
  },

  beTodoItem: spok({
    title: 'Feed the cat',
    completed: false,
    id: spok.test(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    ),
  }),

  html: `<section class="todoapp">
    <div>
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" />
      </header>
    </div>
  </section>`,
}
