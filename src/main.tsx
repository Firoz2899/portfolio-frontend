import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { HelmetProvider } from 'react-helmet-async';
import './styles/index.css'
import App from './App.tsx'
import { store } from "./store.ts";
import { AlertProvider } from './components/Common/Alert.tsx';
import * as prototype from '@/prototypes'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Provider store={store}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </Provider>
  </HelmetProvider>,
)
