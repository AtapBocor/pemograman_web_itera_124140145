# Aplikasi Manajemen Buku Pribadi

## Deskripsi
Aplikasi Manajemen Buku Pribadi merupakan aplikasi berbasis React yang digunakan untuk mengelola koleksi buku. Pengguna dapat menambahkan, mengedit, menghapus, mencari, dan mengelompokkan buku berdasarkan statusnya.

## Fitur Aplikasi
- Menambahkan buku dengan judul, penulis, dan status.
- Mengedit informasi buku.
- Menghapus buku.
- Mencari buku berdasarkan judul atau nama penulis.
- Memfilter buku berdasarkan status.
- Menampilkan statistik koleksi buku.
- Menyimpan data secara otomatis menggunakan Local Storage.

## Teknologi yang Digunakan
- React.js
- JavaScript
- React Router DOM
- Context API
- React Hooks
- PropTypes
- CSS
- React Testing Library

## Instalasi dan Menjalankan Aplikasi

1. Clone atau download repository.
2. Masuk ke folder proyek.
3. Instal seluruh dependency:

   ```bash
   npm install
   ```

4. Jalankan aplikasi:

   ```bash
   npm start
   ```

5. Buka browser pada:

   `http://localhost:3000`

## Menjalankan Pengujian

Gunakan perintah:

```bash
npm test -- --watchAll=false
```

Pengujian dilakukan menggunakan Jest dan React Testing Library.

## Struktur Proyek

```text
src/
├── components/
│   ├── BookForm/
│   ├── BookList/
│   └── BookFilter/
├── context/
│   └── BookContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useBookStats.js
├── pages/
│   ├── Home/
│   └── Stats/
├── App.js
├── App.css
├── App.test.js
├── index.js
└── index.css
```

## Implementasi Konsep React

1. **useState:** Mengelola state formulir, pencarian, filter, dan buku yang sedang diedit.
2. **useEffect:** Mengelola efek samping, termasuk sinkronisasi data Local Storage.
3. **Reusable Components:** BookForm, BookList, dan BookFilter digunakan untuk memisahkan tampilan berdasarkan fungsi.
4. **Context API:** BookContext digunakan untuk membagikan data dan fungsi pengelolaan buku ke berbagai komponen.
5. **React Router:** Mengatur navigasi antara halaman Beranda dan Statistik.
6. **Custom Hooks:** useLocalStorage digunakan untuk penyimpanan data, sedangkan useBookStats digunakan untuk menghitung statistik buku.
7. **PropTypes:** Memvalidasi tipe props yang diterima komponen.

## Penyimpanan Data

Data buku disimpan menggunakan Local Storage browser sehingga data tetap tersedia ketika halaman dimuat ulang pada browser yang sama.

## Dokumentasi Tampilan

Tambahkan screenshot aplikasi pada bagian berikut:

- Tampilan halaman Beranda.
- Formulir tambah buku.
- Daftar buku.
- Fitur pencarian dan filter.
- Halaman Statistik.
- Hasil pengujian unit test.

## Pengembang

- Nama: M. Hanif
- NIM: 124140145
- Proyek: Pertemuan 3
