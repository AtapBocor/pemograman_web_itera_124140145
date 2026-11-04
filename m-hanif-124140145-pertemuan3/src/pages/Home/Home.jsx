import { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

function Home() {
  const { books } = useBooks();

  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.penulis.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'semua' || book.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleEdit = (book) => {
    setSelectedBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setSelectedBook(null);
  };

  return (
    <main className="home-page">
      <section className="home-header">
        <h1>Manajemen Buku Pribadi</h1>
        <p>Kelola koleksi buku dan pantau aktivitas membacamu.</p>
      </section>

      <BookForm
        selectedBook={selectedBook}
        onCancel={handleCancelEdit}
      />

      <BookFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      <BookList
        books={filteredBooks}
        onEdit={handleEdit}
      />
    </main>
  );
}

export default Home;