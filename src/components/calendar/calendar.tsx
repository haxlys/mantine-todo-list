import { Calendar as MantineCalendar, CalendarProps } from '@mantine/dates'
import 'dayjs/locale/ko'

import calendarStyle from './calendar.style'

interface Props extends Omit<CalendarProps, 'onChange'> {
  onChange: (date: Date) => void
}

const Calendar = (props: Props) => {
  return (
    <MantineCalendar
      focusable
      locale="ko"
      labelFormat="YYYY/MM"
      firstDayOfWeek="sunday"
      fullWidth
      styles={calendarStyle}
      {...props}
    />
  )
}

export default Calendar
