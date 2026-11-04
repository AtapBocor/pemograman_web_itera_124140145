import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <main className="stats-page">
      <h1>Statistik Buku</h1>
      <p className="stats-description">
        Ringkasan koleksi buku pribadimu.
      </p>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total Buku</h3>
          <p>{stats.total}</p>
        </div>

        <div className="stats-card">
          <h3>Buku Dimiliki</h3>
          <p>{stats.milik}</p>
        </div>

        <div className="stats-card">
          <h3>Sedang Dibaca</h3>
          <p>{stats.baca}</p>
        </div>

        <div className="stats-card">
          <h3>Ingin Dibeli</h3>
          <p>{stats.beli}</p>
        </div>
      </div>
    </main>
  );
}

export default Stats;