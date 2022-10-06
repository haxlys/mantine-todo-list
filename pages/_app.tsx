import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const preferredColorScheme = useColorScheme()

  return (
    <>
      <Head>
        <title>Calendar + To Do List</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: preferredColorScheme }}>
        <ModalsProvider>
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </>
  )
}
