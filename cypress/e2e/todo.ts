// @ts-nocheck
import spok from 'cy-spok'

export const TodoMVC = {
  beTodoItem: spok({
    title: 'Feed the cat',
    completed: false,
    id: spok.test(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    ),
  }),
}
