
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

function BookForm({ selectedBook, onCancel }) {
  const { addBook, editBook } = useBooks();

  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [status, setStatus] = useState('milik');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedBook) {
      setJudul(selectedBook.judul);
      setPenulis(selectedBook.penulis);
      setStatus(selectedBook.status);
    } else {
      setJudul('');
      setPenulis('');
      setStatus('milik');
    }

    setError('');
  }, [selectedBook]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!judul.trim() || !penulis.trim()) {
      setError('Judul dan penulis wajib diisi!');
      return;
    }

    const bookData = {
      judul: judul.trim(),
      penulis: penulis.trim(),
      status
    };

    if (selectedBook) {
      editBook(selectedBook.id, bookData);
    } else {
      addBook(bookData);
    }

    setJudul('');
    setPenulis('');
    setStatus('milik');
    setError('');

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{selectedBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>

      <div className="form-group">
        <label htmlFor="judul">Judul Buku</label>
        <input
          id="judul"
          type="text"
          placeholder="Masukkan judul buku"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className={error && !judul.trim() ? 'input-error' : ''}
        />
      </div>

      <div className="form-group">
        <label htmlFor="penulis">Nama Penulis</label>
        <input
          id="penulis"
          type="text"
          placeholder="Masukkan nama penulis"
          value={penulis}
          onChange={(e) => setPenulis(e.target.value)}
          className={error && !penulis.trim() ? 'input-error' : ''}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status Buku</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit">
          {selectedBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>

        {selectedBook && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  selectedBook: PropTypes.shape({
    id: PropTypes.number.isRequired,
    judul: PropTypes.string.isRequired,
    penulis: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired
  }),
  onCancel: PropTypes.func
};

BookForm.defaultProps = {
  selectedBook: null,
  onCancel: () => {}
};

export default BookForm;
