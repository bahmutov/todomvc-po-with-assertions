// @ts-nocheck
import spok from 'cy-spok'
import { TodoMVC } from './todo'

describe('TodoMVC', function () {
  beforeEach(() => {
    cy.visit('/')
  })

  it('adds a new todo', () => {
    cy.get('.new-todo').type('Feed the cat{enter}')
    cy.get('.todo-list li').should('read', ['Feed the cat'])

    cy.step('check local storage')
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'react-todos')
      .apply(JSON.parse)
      .should('have.length', 1)
      .its(0)
      .should('deep.include', { title: 'Feed the cat', completed: false })
      // we can write better assertions using cy-spok plugin
      .and(
        spok({
          title: 'Feed the cat',
          completed: false,
          id: spok.test(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
          ),
        }),
      )
  })

  it.only('adds a new todo (using page object assertion)', () => {
    cy.get('.new-todo').type('Feed the cat{enter}')
    cy.get('.todo-list li').should('read', ['Feed the cat'])

    cy.step('check local storage')
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'react-todos')
      .apply(JSON.parse)
      .should('have.length', 1)
      .its(0)
      .and(TodoMVC.beTodoItem)
  })
})
