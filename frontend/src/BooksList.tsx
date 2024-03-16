import { BookItem } from "./BookItem"
import { Book } from './types'

type BookListProps = {
  books: Book[]
  toggleBook: (checkedBookId: string, isChecked: boolean) => void
  deleteBook: (id: string) => void
  buyBook: (bookId: string) => void
}

export function BookList({ books, toggleBook, deleteBook, buyBook }: BookListProps) {
  return (
    <ul className="list">
    {books.length === 0 && 'No Books'}
    {books.map(book => {
      return (  
        <BookItem 
          book={book}
          key={book.id}
          toggleBook={toggleBook}
          deleteBook={deleteBook}
          buyBook={buyBook}
        />
  )
})}
</ul>
  )
}
