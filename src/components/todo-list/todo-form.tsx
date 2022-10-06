import { Button, Group, TextInput, Stack } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useMemo } from 'react'

import { Todo } from './todo-list.type'

interface Props extends Partial<Todo> {
  date: Date
  onSubmit: (todo: Todo) => void
}

const TodoForm = ({ id, date, title = '', done = false, onSubmit }: Props) => {
  const form = useForm({
    initialValues: {
      date,
      title,
    },
    validate: {
      date: (value) => (value ? null : ''),
      title: (value) => (value ? null : ''),
    },
  })
  const handleSubmit = useMemo(
    () =>
      form.onSubmit((value) => {
        onSubmit({ id: id ?? new Date().getTime(), done, ...value })
        form.setValues({ title: '' })
      }),
    [done, form, id, onSubmit],
  )

  return (
    <form onSubmit={handleSubmit}>
      <Stack align="stretch" spacing="xs">
        <TimeInput
          required
          withAsterisk={false}
          label="시간"
          format="12"
          clearable
          {...form.getInputProps('date')}
        />
        <TextInput required withAsterisk={false} label="할일" {...form.getInputProps('title')} />
        <Group position="right" mt="md">
          <Button type="submit" disabled={!form.isValid()} size="md">
            {id ? '수정' : '추가'}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

export default TodoForm
