# LAPORAN PRAKTIKUM
## Sistem Manajemen Perpustakaan Sederhana

### 1. Identitas Mahasiswa

- **Nama:** M. Hanif
- **NIM:** 124140145
- **Kelas Praktikum:** [Isi kelas praktikum]
- **Nama Folder:** M-hanif-124140145-pertemuan5

### 2. Deskripsi Program

Pada praktikum ini, saya membuat program Sistem Manajemen Perpustakaan Sederhana menggunakan Python. Program ini dibuat untuk mengelola dua jenis koleksi perpustakaan, yaitu buku dan majalah.

Melalui program ini, pengguna dapat menambahkan buku atau majalah ke dalam koleksi, melihat daftar item yang tersedia, dan mencari item berdasarkan judul maupun ID. Program ini juga dilengkapi dengan fitur peminjaman dan pengembalian untuk mengubah status ketersediaan item.

Dalam pengerjaannya, saya membagi program menjadi beberapa file agar setiap bagian memiliki tugas masing-masing dan lebih mudah dipahami.

### 3. Struktur File Program

Program terdiri dari empat file utama:

```text
M-hanif-124140145-pertemuan5/
│
├── library_item.py
├── library.py
├── main.py
└── README.md
```

Penjelasan masing-masing file:

- **library_item.py:** Berisi abstract class `LibraryItem` serta dua subclass, yaitu `Book` dan `Magazine`.
- **library.py:** Berisi class `Library` yang bertugas menyimpan dan mengelola koleksi perpustakaan.
- **main.py:** Digunakan untuk menjalankan program dan menguji fitur yang sudah dibuat.
- **README.md:** Berisi dokumentasi dan laporan singkat praktikum.

### 4. Penerapan Konsep OOP

Dalam program ini, saya menerapkan empat konsep utama Object-Oriented Programming (OOP).

#### 4.1 Class

Class digunakan sebagai dasar untuk membuat objek. Pada program ini terdapat class `LibraryItem`, `Book`, `Magazine`, dan `Library`.

Contohnya, class `Book` digunakan untuk membuat objek buku yang memiliki data seperti ID, judul, tahun terbit, penulis, dan jumlah halaman. Sementara itu, class `Magazine` digunakan untuk membuat objek majalah dengan data edisi dan penerbit.

#### 4.2 Inheritance

Inheritance atau pewarisan diterapkan pada class `Book` dan `Magazine` yang mewarisi class `LibraryItem`.

Dengan cara ini, kedua class tersebut tidak perlu membuat ulang seluruh atribut dan method dasar. Keduanya cukup menggunakan `super().__init__()` untuk memanggil konstruktor dari parent class, kemudian menambahkan atribut masing-masing.

#### 4.3 Encapsulation

Encapsulation diterapkan untuk menjaga data penting agar tidak diakses secara langsung dari luar class.

Pada program ini, atribut `_id_item`, `_judul`, dan `_tahun_terbit` menggunakan protected, sedangkan `__dipinjam` dan `__koleksi` menggunakan private.

Saya juga menggunakan `@property` untuk mengakses beberapa atribut, seperti ID, judul, dan status peminjaman. Dengan begitu, data dapat dibaca melalui property tanpa harus mengakses atribut internal secara langsung.

#### 4.4 Polymorphism

Polymorphism diterapkan melalui method `get_detail()` yang dimiliki oleh class `Book` dan `Magazine`.

Kedua class menggunakan nama method yang sama, tetapi isi dan hasilnya berbeda. Ketika method tersebut dipanggil, objek buku akan menampilkan informasi buku, sedangkan objek majalah akan menampilkan informasi majalah.

### 5. Fitur yang Berhasil Dibuat

Beberapa fitur yang terdapat dalam program ini adalah:

1. **Menambahkan item:** Pengguna dapat memasukkan buku dan majalah ke dalam koleksi perpustakaan.
2. **Menampilkan katalog:** Program menampilkan item yang masih tersedia untuk dipinjam.
3. **Mencari item:** Pengguna dapat mencari koleksi berdasarkan ID atau judul.
4. **Peminjaman:** Status item berubah menjadi dipinjam ketika proses peminjaman berhasil.
5. **Pengembalian:** Status item kembali menjadi tersedia setelah dikembalikan.

Selain itu, program juga melakukan pengecekan agar ID item tidak digunakan lebih dari satu kali.

### 6. Cara Menjalankan Program

Untuk menjalankan program, buka terminal pada folder `M-hanif-124140145-pertemuan5`, kemudian ketik perintah:

```bash
python main.py
```

Setelah perintah dijalankan, program akan menampilkan proses penambahan item, katalog perpustakaan, hasil pencarian, serta proses peminjaman dan pengembalian.

### 7. Hasil Pengujian Program

Pengujian dilakukan dengan menjalankan file `main.py`. Dalam pengujian tersebut, saya memasukkan beberapa data buku dan majalah, kemudian mencoba fitur yang tersedia.

Hasil pengujian yang diharapkan:

- Buku dan majalah berhasil ditambahkan ke dalam koleksi.
- Katalog menampilkan item yang tersedia.
- Pencarian berdasarkan ID dan judul dapat menemukan item yang sesuai.
- Item yang berhasil dipinjam tidak lagi muncul dalam katalog yang tersedia.
- Setelah dikembalikan, item muncul kembali dalam katalog.

#### Dokumentasi Screenshot

**Screenshot 1. Proses Penambahan Item**

![penambahan item](screenshot/Screenshot%202026-11-16%20185615.png)

**Screenshot 2. Tampilan Katalog**

![Tampilan katalog](screenshot/Screenshot%202026-11-16%20185629.png).

**Screenshot 3. Hasil Pencarian**

![Hasil Pencarian](screenshot/Screenshot%202026-11-16%20185720.png)

**Screenshot 4. Proses Peminjaman dan Pengembalian**

![proses peminjaman](screenshot/Screenshot%202026-11-16%20185740.png)
![proses pengembalian](screenshot/Screenshot%202026-11-16%20185756.png)

### 8. Kesimpulan

Dari praktikum ini, saya memahami bahwa konsep OOP dapat digunakan untuk membuat program yang lebih terstruktur. Melalui pembuatan sistem perpustakaan ini, saya belajar menggunakan abstract class sebagai dasar pembuatan class lain, menerapkan inheritance untuk pewarisan atribut dan method, menggunakan encapsulation untuk melindungi data, serta menerapkan polymorphism melalui method yang memiliki implementasi berbeda pada setiap subclass.

Selain memahami konsep tersebut, saya juga belajar membagi program ke dalam beberapa file Python agar kode lebih rapi dan mudah dikelola.