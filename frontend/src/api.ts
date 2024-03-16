import axios from 'axios'

export const getBooks = async () => {
  try {
    const response = await axios.get('/api/getBooks')
    return response.data
  } catch (error) {
    console.error('Error getting bookss:', error)
    throw error
  }
}
export const addBook = async (title: string) => {
  try {
    const response = await axios.post('/api/addBook', { title })
    return response.data
  } catch (error) {
    console.error('Error adding book:', error)
    throw error
  }
}

export const buyBook = async (bookId: string) => {
  try {
    const response = await axios.post(`api/books/buy`, { id: bookId })
    return response.data
  } catch (error) {
    console.error('Error buying book:', error)
    throw error
  }
}

export const deleteBook = async (bookId: string) => {
  try {
    const response = await axios.delete(`api/books/${bookId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting book:', error)
    throw error
  }
}
