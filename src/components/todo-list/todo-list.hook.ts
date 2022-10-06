import { useState, useMemo, useCallback } from 'react'
import { isSameDate } from '@mantine/dates'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

import weekDayLocale from '@/utils/date/week-day-locale'

import { TodoProps } from './todo'
import { Todo } from './todo-list.type'
import { TodoListProps } from './todo-list'

const todoLimit = 10

export default function useTodolist({ date, todos, setTodos }: TodoListProps) {
  const [todoForUpdate, setTodoForUpdate] = useState<Todo | null>(null)
  const [isNewTodo, setIsNewTodo] = useState(false)
  const dateTitle = useMemo(() => `${date.toLocaleDateString()} ${weekDayLocale(date)}`, [date])
  const sortedTodos = useMemo(
    () =>
      todos
        .filter((todo) => isSameDate(todo.date, date))
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [date, todos],
  )
  const removeTodo = useCallback<TodoProps['onRemove']>(
    (id) => setTodos((todos) => todos.filter((todo) => todo.id !== id)),
    [setTodos],
  )
  const doneTodo = useCallback<TodoProps['onDone']>(
    (id, done) =>
      setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, done } : todo))),
    [setTodos],
  )
  const closeFormModal = useCallback(() => {
    isNewTodo && setIsNewTodo(false)
    !!todoForUpdate && setTodoForUpdate(null)
  }, [isNewTodo, todoForUpdate])
  const handleSubmit = useCallback(
    (todo: Todo) => {
      isNewTodo && setTodos((todos) => [...todos, todo])
      if (todo) {
        setTodos((todos) => todos.map<Todo>((_todo) => (_todo.id === todo.id ? todo : _todo)))
        closeFormModal()
      }
    },
    [closeFormModal, isNewTodo, setTodos],
  )
  const addTodo = useCallback(() => {
    if (todos.length < todoLimit) {
      setIsNewTodo(true)
    } else {
      showNotification({
        title: '할일 추가 제한',
        message: `${todoLimit}개 까지만 추가할 수 있습니다.`,
      })
    }
  }, [todos.length])
  const doneAllTodosAsDate = useCallback(
    () => setTodos(todos.map((todo) => ({ ...todo, done: true }))),
    [setTodos, todos],
  )
  const removeAllTodosAsDate = useCallback(
    () => setTodos(todos.filter((todo) => !isSameDate(todo.date, date))),
    [date, setTodos, todos],
  )
  const openRemoveAllModal = useCallback(
    () =>
      openConfirmModal({
        title: `${dateTitle} 할일을 모두 삭제하시겠습니까?`,
        centered: true,
        labels: { confirm: '삭제', cancel: '취소' },
        confirmProps: { color: 'red' },
        onConfirm: () => removeAllTodosAsDate(),
      }),
    [dateTitle, removeAllTodosAsDate],
  )
  const isFormOpen = useMemo(() => !!todoForUpdate || isNewTodo, [isNewTodo, todoForUpdate])

  return {
    dateTitle,
    todos: sortedTodos,
    addTodo,
    openRemoveAllModal,
    isFormOpen,
    closeFormModal,
    handleSubmit,
    removeTodo,
    doneTodo,
    setTodoForUpdate,
    todoForUpdate,
    doneAllTodosAsDate,
  }
}
