// import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { NavBar } from "@/components/navbar";


export default function App({ Component, pageProps }) {
  
  return (
    <ClerkProvider {...pageProps} >
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <NavBar></NavBar>
      <Component {...pageProps} />

    </ClerkProvider>
  )
}