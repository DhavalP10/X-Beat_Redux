// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SearchProvider } from './Components/SearchContext.jsx'
import ProductProvider  from "./context/ProductContext.jsx";
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <SearchProvider>
          <Provider store={store}>
            <App />
          </Provider>
      </SearchProvider>
  </BrowserRouter>
)
