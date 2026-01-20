import { MOCK_TRANSACTIONS } from './data.js'

const getRandomDelay = () => {
  return 500 + Math.random() * 300
}

export const fetchTransactions = () => {
  const delay = getRandomDelay()
  const willFail = Math.random() < 0.1

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willFail) {
        reject(new Error('Не удалось загрузить транзакции. Попробуйте позже.'))
      } else {
        resolve(MOCK_TRANSACTIONS)
      }
    }, delay)
  })
}