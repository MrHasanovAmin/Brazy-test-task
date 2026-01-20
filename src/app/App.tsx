import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TransactionsProvider } from '../features/transactions/context/TransactionProvider'
import Transactions from '../pages/Transactions/Transactions'
import './App.scss'

// Необходимости настраивать роуты не было, добавил его как базовую настройку App.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <TransactionsProvider>
            <Transactions />
          </TransactionsProvider>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
