
import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange
}) {
  return (
    <div className="book-filter">
      <input
        type="search"
        placeholder="Cari judul atau nama penulis..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Cari buku"
      />

      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
        aria-label="Filter status buku"
      >
        <option value="semua">Semua Status</option>
        <option value="milik">Dimiliki</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>
    </div>
  );
}

BookFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default BookFilter;
