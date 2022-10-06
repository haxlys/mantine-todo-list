import { Button, Checkbox, Group, Text, Tooltip } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import dayjs from 'dayjs'
import { useCallback } from 'react'

import { Todo as TodoType } from './todo-list.type'

export interface TodoProps {
  todo: TodoType
  onModify: (todo: TodoType) => void
  onRemove: (id: TodoType['id']) => void
  onDone: (id: TodoType['id'], done: TodoType['done']) => void
}

const Todo = ({ todo, onModify, onRemove, onDone }: TodoProps) => {
  const openRemoveModal = useCallback(
    () =>
      openConfirmModal({
        title: '선택하신 할일을 삭제하시겠습니까?',
        centered: true,
        labels: { confirm: '삭제', cancel: '취소' },
        confirmProps: { color: 'red' },
        onConfirm: () => onRemove(todo.id),
      }),
    [onRemove, todo.id],
  )

  return (
    <Group noWrap>
      <Checkbox checked={todo.done} onChange={(e) => onDone(todo.id, e.currentTarget.checked)} />
      <Text style={{ flexShrink: '0' }}>{dayjs(todo.date).format('h:mm A')}</Text>
      <Tooltip label={todo.title} position="bottom">
        <Text
          strikethrough={todo.done}
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {todo.title}
        </Text>
      </Tooltip>
      <Group position="right" style={{ flexShrink: '0' }} ml="auto">
        <Button size="xs" onClick={() => onModify(todo)}>
          수정
        </Button>
        <Button size="xs" color="red" onClick={openRemoveModal}>
          삭제
        </Button>
      </Group>
    </Group>
  )
}

export default Todo
