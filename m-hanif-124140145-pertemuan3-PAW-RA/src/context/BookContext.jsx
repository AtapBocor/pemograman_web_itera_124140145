
import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);

  const addBook = (book) => {
    const newBook = {
      id: Date.now(),
      ...book
    };

    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const editBook = (id, updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== id)
    );
  };

  return (
    <BookContext.Provider
      value={{ books, addBook, editBook, deleteBook }}
    >
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useBooks() {
  return useContext(BookContext);
}
