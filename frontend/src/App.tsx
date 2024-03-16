import { useState, useEffect } from "react"
import { NewBookForm } from "./NewBookForm"
import { BookList } from "./BooksList"
import { Book } from './types'
import { MyBooksList } from "./MyBooksList"
import { 
  getBooks as getBooksAPI,
  addBook as addBookAPI, 
  buyBook as buyBookAPI, 
  deleteBook as deleteBookAPI 
} from './api'

// TODO: Implement better types throughout frontend, remove all any types

function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [myBooks, setMyBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getBooksAPI();
        // Check if the response is an array and not empty
        if (Array.isArray(fetchedBooks) && fetchedBooks.length > 0) {
          const availableBooks = fetchedBooks
            .filter(book => book.status !== 'bought')
            .map(book => ({
              id: book.isbn,
              title: book.title,
              isChecked: false
            }));
          
          const boughtBooks = fetchedBooks
            .filter(book => book.status === 'bought')
            .map(book => ({
              id: book.isbn, 
              title: book.title,
              isChecked: false
            }));
  
          setBooks(availableBooks);
          setMyBooks(boughtBooks);
        } else {
          // If fetchedBooks is not an array or is empty, set both states to empty arrays
          setBooks([]);
          setMyBooks([]);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
    fetchBooks();
  }, []);

  const addBook = async (title: string) => {
    try {
      const addedBook = await addBookAPI(title);
      setBooks(currentBooks => [...currentBooks, addedBook]);
    } catch (error) {
      console.error('Failed to add book', error);
    }
  }
  // Turn this into a wishlist toggle, if check, then move to wishlist
  function toggleBook(checkedBookId: string, isChecked: boolean) {
    setBooks(currentBooks => {
      return currentBooks.map(book => {
        if (book.id === checkedBookId) {
          return { ...book, isChecked }
        }
        return book
      }).sort((a, b) => {
        if (a.isChecked) return 1
        if (b.isChecked) return -1
        return 0
      })
    }) 
    setMyBooks(currentBooks => {
      return currentBooks.map(book => {
        if (book.id === checkedBookId) {
          return { ...book, isChecked }
        }
        return book
      }).sort((a, b) => {
        if (a.isChecked) return 1
        if (b.isChecked) return -1
        return 0
      })
    }) 
  }

  const buyBook = async (bookId: string) => {
    try {
      const response = await buyBookAPI(bookId)
      const responseBookId = response[0].isbn
      const responseBookTitle = response[0].title
      const tempBoughtBookShape = { id: responseBookId, title: responseBookTitle, isChecked: false }
      setMyBooks(prevMyBooks => [...prevMyBooks, tempBoughtBookShape]) 
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
    } catch (error) {
      console.error('Failed to buy book', error)
    }
  }

  const deleteBook = async (bookId: string) => {
    try {
      await deleteBookAPI(bookId)
      setBooks(currentBooks => currentBooks.filter(book => book.id !== bookId))
      setMyBooks(currentBooks => currentBooks.filter(book => book.id !== bookId))
    } catch (error) {
      console.error('Failed to delete book', error)
    }
  }

  return (
  <>
    <h1 className="header"> Book Exchange </h1>
    <NewBookForm onSubmit={addBook}/>
    <h2 className="second-header">Available Books</h2>
    <BookList books={books} toggleBook={toggleBook} deleteBook={deleteBook} buyBook={buyBook}/>
    <h2 className="third-header">My Books</h2>
    <MyBooksList myBooks={myBooks} toggleBook={toggleBook} deleteBook={deleteBook} />
  </>
  )
}

export default App
