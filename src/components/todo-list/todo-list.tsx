import { Button, Group, Modal, Stack, Title } from '@mantine/core'

import TodoItem from './todo'
import TodoForm from './todo-form'
import { Todo } from './todo-list.type'
import useTodolist from './todo-list.hook'

import { useTodoListStore } from '.'

export interface TodoListProps {
  date: Date
  todos: Todo[]
  setTodos: ReturnType<typeof useTodoListStore>[1]
}

const TodoList = (props: TodoListProps) => {
  const {
    dateTitle,
    todos,
    addTodo,
    openRemoveAllModal,
    isFormOpen,
    closeFormModal,
    handleSubmit,
    removeTodo,
    doneTodo,
    todoForUpdate,
    setTodoForUpdate,
    doneAllTodosAsDate,
  } = useTodolist(props)

  return (
    <>
      <Stack align="stretch" spacing="xs">
        <Title order={1} suppressHydrationWarning>
          {dateTitle}
        </Title>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={removeTodo}
            onModify={setTodoForUpdate}
            onDone={doneTodo}
          />
        ))}

        <Group position="center" mt="auto" grow>
          <Button type="button" onClick={addTodo}>
            할일 추가
          </Button>
          <Button disabled={!todos.length} type="button" color="cyan" onClick={doneAllTodosAsDate}>
            전체 완료
          </Button>
          <Button disabled={!todos.length} type="button" color="red" onClick={openRemoveAllModal}>
            전체 삭제
          </Button>
        </Group>
      </Stack>

      <Modal size={400} centered title={dateTitle} opened={isFormOpen} onClose={closeFormModal}>
        {isFormOpen && <TodoForm date={props.date} {...todoForUpdate} onSubmit={handleSubmit} />}
      </Modal>
    </>
  )
}

export default TodoList
