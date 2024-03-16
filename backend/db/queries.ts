import sql from './index';

export async function getBooks() {
  try {
    const books = await sql`SELECT * FROM books`;
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

export async function addBook(title: string, isbn: string) {
  try {
    const result = await sql`
      INSERT INTO books (title, isbn)
      VALUES (${title}, ${isbn})
      RETURNING *;
    `;
    return result;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
}

export async function buyBook(bookId: string) {
  try {
    const result = await sql`
      UPDATE books 
      SET status = 'bought' 
      WHERE isbn = ${bookId}
      RETURNING *;
    `;
    return result;
  } catch (error) {
    console.error('Error buying book:', error);
    throw error;
  }
}

export async function deleteBook(bookId: string) {
  try {
    const result = await sql`
      DELETE FROM books 
      WHERE isbn = ${bookId};
    `;
    return result;
  } catch (error) {
    console.error('Error buying book:', error);
    throw error;
  }
}
