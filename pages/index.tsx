import type { NextPage } from 'next'
import { useState } from 'react'

import { MainLayout } from '@/components/layout'
import { Calendar, useTodoListRenderDay } from '@/components/calendar'
import { TodoList, useTodoListStore } from '@/components/todo-list'

const Home: NextPage = () => {
  const [date, setDate] = useState(new Date())
  const [todos, setTodos] = useTodoListStore()
  const renderDay = useTodoListRenderDay(todos)

  return (
    <MainLayout>
      <Calendar value={date} onChange={setDate} renderDay={renderDay} />
      <TodoList date={date} todos={todos} setTodos={setTodos} />
    </MainLayout>
  )
}

export default Home
