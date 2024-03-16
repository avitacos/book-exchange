import { BookItem } from "./BookItem"
import { Book } from './types'

type MyBookListProps = {
  myBooks: Book[]
  toggleBook: (checkedBookId: string, isChecked: boolean) => void
  deleteBook: (id: string) => void
}

export function MyBooksList({ myBooks, toggleBook, deleteBook }: MyBookListProps) {
  return (
    <ul className="list">
    {myBooks.length === 0 && 'No Books'}
    {myBooks.map(book => {
      return (  
        <BookItem 
          book={book}
          key={book.id}
          toggleBook={toggleBook}
          deleteBook={deleteBook}
        />
  )
})}
</ul>
  )
}
