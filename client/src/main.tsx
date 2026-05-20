import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AxiosProvider } from './api/axios-provider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AxiosProvider baseURL="https://medicalcabinet.duckdns.org">
            <App />
        </AxiosProvider>
    </StrictMode>,
)
