import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TransactionsProvider } from '../features/transactions/context/TransactionProvider'
import Transactions from '../pages/Transactions/Transactions'
import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <TransactionsProvider>
        <Routes>
          <Route path="/" element={<Transactions />} />
        </Routes>
      </TransactionsProvider>
    </BrowserRouter>
  )
}

export default App
