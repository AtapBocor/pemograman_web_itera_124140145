
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import './BookList.css';

function BookList({ books, onEdit }) {
  const { deleteBook } = useBooks();

  const getStatusLabel = (status) => {
    const labels = {
      milik: 'Dimiliki',
      baca: 'Sedang Dibaca',
      beli: 'Ingin Dibeli'
    };

    return labels[status];
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Yakin ingin menghapus buku ini?');

    if (confirmed) {
      deleteBook(id);
    }
  };

  if (books.length === 0) {
    return (
      <div className="empty-books">
        <h3>Belum Ada Buku</h3>
        <p>Tambahkan buku pertamamu melalui formulir di atas.</p>
      </div>
    );
  }

  return (
    <section className="book-list">
      <h2>Daftar Buku</h2>

      <div className="book-grid">
        {books.map((book) => (
          <article className="book-card" key={book.id}>
            <div className="book-info">
              <h3>{book.judul}</h3>
              <p>Penulis: {book.penulis}</p>
              <span className={`book-status status-${book.status}`}>
                {getStatusLabel(book.status)}
              </span>
            </div>

            <div className="book-actions">
              <button
                type="button"
                className="edit-button"
                onClick={() => onEdit(book)}
              >
                Edit
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={() => handleDelete(book.id)}
              >
                Hapus
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      judul: PropTypes.string.isRequired,
      penulis: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired
};

export default BookList;
