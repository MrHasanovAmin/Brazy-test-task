import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Transactions from '../pages/Transactions/Transactions'

// Необходимости настраивать роуты не было, добавил его как базовую настройку App.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
