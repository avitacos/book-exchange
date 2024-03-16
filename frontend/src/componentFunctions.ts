// Modularize the codebase by moving the component function into here and out of the increasingly bloated App.tsx file
// export const addBook = async (title: string) => {
//   try {
//     const addedBook = await addBookAPI(title);
//     setBooks(currentBooks => [...currentBooks, addedBook]);
//   } catch (error) {
//     console.error('Failed to add book', error);
//   }
// }

// export function toggleBook(checkedBookId: string, isChecked: boolean) {
//   setBooks(currentBooks => {
//     return currentBooks.map(book => {
//       if (book.id === checkedBookId) {
//         return { ...book, isChecked }
//       }
//       return book
//     }).sort((a, b) => {
//       if (a.isChecked) return 1
//       if (b.isChecked) return -1
//       return 0
//     })
//   }) 
//   setMyBooks(currentBooks => {
//     return currentBooks.map(book => {
//       if (book.id === checkedBookId) {
//         return { ...book, isChecked }
//       }
//       return book
//     }).sort((a, b) => {
//       if (a.isChecked) return 1
//       if (b.isChecked) return -1
//       return 0
//     })
//   }) 
// }

// export const buyBook = async (bookId: string) => {
//   try {
//     const response = await buyBookAPI(bookId)
//     const responseBookId = response[0].isbn
//     const responseBookTitle = response[0].title
//     const tempBoughtBookShape = { id: responseBookId, title: responseBookTitle, isChecked: false }
//     setMyBooks(prevMyBooks => [...prevMyBooks, tempBoughtBookShape]) 
//     setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
//   } catch (error) {
//     console.error('Failed to buy book', error)
//   }
// }

// export const deleteBook = async (bookId: string) => {
//   try {
//     await deleteBookAPI(bookId)
//     setBooks(currentBooks => currentBooks.filter(book => book.id !== bookId))
//     setMyBooks(currentBooks => currentBooks.filter(book => book.id !== bookId))
//   } catch (error) {
//     console.error('Failed to delete book', error)
//   }
// }
