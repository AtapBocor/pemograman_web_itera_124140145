
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Pengujian Aplikasi Manajemen Buku', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('menampilkan halaman utama', () => {
    render(<App />);

    expect(
      screen.getByText('Manajemen Buku Pribadi')
    ).toBeInTheDocument();
  });

  test('menampilkan formulir buku', () => {
    render(<App />);

    expect(screen.getByLabelText('Judul Buku')).toBeInTheDocument();
    expect(screen.getByLabelText('Nama Penulis')).toBeInTheDocument();
  });

  test('menampilkan pesan error ketika formulir kosong', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(
      screen.getByText('Judul dan penulis wajib diisi!')
    ).toBeInTheDocument();
  });

  test('berhasil menambahkan buku', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Judul Buku'), {
      target: { value: 'Laskar Pelangi' }
    });

    fireEvent.change(screen.getByLabelText('Nama Penulis'), {
      target: { value: 'Andrea Hirata' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
  });

  test('menampilkan daftar buku kosong', () => {
    render(<App />);

    expect(screen.getByText('Belum Ada Buku')).toBeInTheDocument();
  });
});
