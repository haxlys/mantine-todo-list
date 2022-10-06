import { useLocalStorage } from '@mantine/hooks'
import superjson from 'superjson'

import { Todo } from './todo-list.type'

const key = 'todos'
const defaultValue: Todo[] = []
const deserialize = (todos: string) =>
  todos === undefined ? defaultValue : superjson.parse<Todo[]>(todos)

export default function useTodoListStore() {
  return useLocalStorage<Todo[]>({
    key,
    defaultValue,
    serialize: superjson.stringify,
    deserialize,
  })
}
