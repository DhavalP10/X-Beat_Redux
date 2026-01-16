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
        <ProductProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ProductProvider>
      </SearchProvider>
  </BrowserRouter>
)
