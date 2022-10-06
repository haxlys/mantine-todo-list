import { Indicator } from '@mantine/core'
import { isSameDate } from '@mantine/dates'
import { CalendarSharedProps } from '@mantine/dates/lib/components/CalendarBase/CalendarBase'
import { useMemo } from 'react'

import { Todo } from '../todo-list/todo-list.type'

type RenderDay = Required<CalendarSharedProps>['renderDay']

const todoListRenderDay: (todos: Todo[]) => RenderDay = (todos) => {
  const renderDay: RenderDay = (renderDate) => {
    return (
      <Indicator
        size={6}
        color="red"
        offset={8}
        disabled={todos.every((todo) => !isSameDate(renderDate, todo.date))}>
        <div>{renderDate.getDate()}</div>
      </Indicator>
    )
  }
  return renderDay
}

const useTodoListRenderDay = (todos: Todo[]) => {
  return useMemo(() => todoListRenderDay(todos), [todos])
}

export default useTodoListRenderDay
