import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { AlertProvider } from './components/Common/Alert.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AlertProvider>
      <App />
    </AlertProvider>
  </Provider>,
)
