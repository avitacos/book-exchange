import express from 'express'
import bodyParser from 'body-parser'
import { getBooks, addBook, buyBook, deleteBook } from './db/queries'

const app = express()
const port = 3001

// TODO: Implement better types throughout backend remove all any types

app.use(bodyParser.json())

app.get('/getBooks', async (req, res) =>{
  try {
    const getBooksResponse = await getBooks()
    res.json(getBooksResponse)
  } catch (error) {
    console.error('Failed to get books', error);
    res.status(500).json({ error: 'Failed to get books' });
  }
})

app.post('/addBook', async (req, res) => {
  
  const { title } = req.body;
  // Generate a unique ISBN for now
  const bookIsbn = crypto.randomUUID();
  try {
    await addBook(title, bookIsbn);
    const newBook = { id: bookIsbn, title, isChecked: false }
    res.json(newBook);
  } catch (error) {
    console.error('Failed to add book', error);
    res.status(500).json({ error: 'Failed to add book' });
  }
})

app.post('/books/buy', async (req, res) => {
  const { id } = req.body
  try {
    const boughtBook = await buyBook(id)
    res.json(boughtBook);
  } catch (error) {
    console.error('Failed to buy book', error);
    res.status(500).json({ error: 'Failed to buy book' });
  }
})

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params
  try {
    await deleteBook(id)
    res.json({ message: 'Book deleted successfully', id })
  } catch (error) {
    console.error('failed to delete book', error)
    res.status(500).json({ error: 'Failed to buy book' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
