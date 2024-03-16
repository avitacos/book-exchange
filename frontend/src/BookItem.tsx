import { Book } from './types'

type BookItemProps = {
  book: Book
  toggleBook: (checkedBookId: string, isChecked: boolean) => void
  deleteBook: (id: string) => void
  buyBook?: (bookId: string) => void
}

export function BookItem({ book, toggleBook, deleteBook, buyBook }: BookItemProps) {
  return (
    <li>
      <label htmlFor="">
        <input type="checkbox" checked={book.isChecked} onChange={e => {
          toggleBook(book.id, e.target.checked)} 
        }/>
        {book.title}
      </label>
      {buyBook && 
        <button onClick={()=> buyBook(book.id)} className="btn">Buy Book</button>
      }

      <button onClick={()=> deleteBook(book.id)} className="btn btn-danger">delete</button>
    </li>
  )
}