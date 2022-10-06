import { AppShell, Container, SimpleGrid, SimpleGridProps } from '@mantine/core'

interface Props {
  children: React.ReactNode
}

const breakpoints: SimpleGridProps['breakpoints'] = [
  { maxWidth: 801, cols: 2, spacing: 'md' },
  { maxWidth: 800, cols: 1, spacing: 'sm' },
]

const MainLayout = ({ children }: Props) => {
  return (
    <AppShell>
      <Container size="lg">
        <SimpleGrid cols={2} spacing="xl" breakpoints={breakpoints}>
          {children}
        </SimpleGrid>
      </Container>
    </AppShell>
  )
}

export default MainLayout
