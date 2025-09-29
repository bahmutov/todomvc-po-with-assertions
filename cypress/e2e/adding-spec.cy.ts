// https://github.com/bahmutov/cy-spok
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
  })

  it('stores todo in the local storage', () => {
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
      .its('id')
      .should(
        'match',
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      )
  })

  it('stores todo in the local storage', () => {
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

  it('adds a new todo (page object)', () => {
    TodoMVC.addTodo('Feed the cat')
    TodoMVC.getTodos().should('read', ['Feed the cat'])
  })

  it('adds a new todo (check the data)', () => {
    TodoMVC.addTodo('Feed the cat')
    TodoMVC.getTodos().should('read', ['Feed the cat'])

    cy.step('check local storage')
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'react-todos')
      .apply(JSON.parse)
      .should('have.length', 1)
      .its(0)
      .should(TodoMVC.beTodoItem)
  })

  it('adds a new todo and checks the DOM', () => {
    cy.get('.todoapp').within(() => {
      cy.get('header.header').within(() => {
        cy.get('h1').should('have.text', 'todos')
        cy.get('input.new-todo').should(
          'have.attr',
          'placeholder',
          'What needs to be done?',
        )
        cy.get('input.new-todo').type('Feed the cat{enter}')
      })
    })
  })

  it('checks the DOM using page object', () => {
    cy.get('.todoapp').should('look', TodoMVC.html)
  })
})
