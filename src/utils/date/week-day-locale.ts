export default function weekDayLocale(date: Date, locale?: string) {
  return date.toLocaleString(locale, { weekday: 'long' })
}
