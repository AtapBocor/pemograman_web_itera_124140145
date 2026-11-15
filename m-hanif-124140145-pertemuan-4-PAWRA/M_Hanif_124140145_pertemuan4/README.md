# LAPORAN PRAKTIKUM DASAR PEMROGRAMAN PYTHON
## Pertemuan 4

### Identitas Mahasiswa
- **Nama:** M. Hanif
- **NIM:** 124140145
- **Program Studi:** Teknik Informatika

---

## 1. Tujuan Praktikum

Pada praktikum kali ini, saya mempelajari beberapa konsep dasar Python dan mencoba menerapkannya ke dalam program sederhana. Materi yang dikerjakan meliputi percabangan, perulangan, penggunaan list dan dictionary, pembuatan fungsi, serta penggunaan module.

## 2. Hasil dan Pembahasan

### 2.1 Tugas 1 – Program Perhitungan BMI

**File:** `tugas1_bmi.py`

Pada tugas pertama, saya membuat program untuk menghitung BMI berdasarkan berat dan tinggi badan yang dimasukkan oleh pengguna.

Program meminta pengguna memasukkan berat badan dalam kilogram dan tinggi badan dalam meter. Setelah itu, kedua nilai digunakan untuk menghitung BMI dengan rumus berat badan dibagi tinggi badan kuadrat.

Hasil perhitungan kemudian diperiksa menggunakan `if`, `elif`, dan `else` untuk menentukan kategori berat badan. Kategori yang ditampilkan terdiri dari berat badan kurang, normal, berlebih, dan obesitas.

Dari tugas ini, saya belajar menggunakan input untuk menerima data dari pengguna, melakukan operasi matematika, dan menerapkan percabangan untuk menentukan hasil berdasarkan kondisi tertentu.

**Dokumentasi hasil running:**

![Hasil Running Program BMI](screenshot/Screenshot%202026-11-15%20145621.png)

### 2.2 Tugas 2 – Program Pengolahan Nilai Mahasiswa

**File:** `tugas2_nilai_mahasiswa.py`

Pada tugas kedua, saya membuat program untuk mengolah nilai dari lima mahasiswa. Setiap mahasiswa memiliki data berupa nama, NIM, nilai UTS, nilai UAS, dan nilai tugas.

Data tersebut disimpan menggunakan list dan dictionary. Program kemudian menghitung nilai akhir setiap mahasiswa berdasarkan bobot yang sudah ditentukan, yaitu UTS sebesar 30%, UAS sebesar 40%, dan tugas sebesar 30%.

Setelah nilai akhir didapatkan, program menentukan grade menggunakan percabangan. Hasilnya ditampilkan dalam bentuk tabel agar data setiap mahasiswa lebih mudah dibaca.

Selain itu, program juga mencari mahasiswa dengan nilai tertinggi dan terendah menggunakan `max()` dan `min()`.

Dari tugas ini, saya belajar bagaimana menyimpan beberapa data dalam satu struktur, mengolah data menggunakan perulangan, dan mencari nilai tertentu dari sekumpulan data.

**Dokumentasi hasil running:**

![Hasil Running Program Nilai Mahasiswa](screenshot/Screenshot%202026-11-15%20145704.png)

### 2.3 Tugas 3 – Membuat dan Menggunakan Module

**File:** `math_operations.py` dan `main.py`

Pada tugas ketiga, saya membuat dua file Python yang saling berhubungan. File `math_operations.py` berisi kumpulan fungsi untuk melakukan perhitungan matematika, sedangkan `main.py` digunakan untuk menjalankan fungsi-fungsi tersebut.

Fungsi yang dibuat mencakup perhitungan luas dan keliling persegi, persegi panjang, serta lingkaran. Selain itu, terdapat juga fungsi untuk mengubah suhu dari Celsius ke Fahrenheit dan Kelvin.

Agar fungsi dari `math_operations.py` bisa digunakan di `main.py`, saya menerapkan dua cara import, yaitu `import math_operations` dan `from math_operations import ...`.

Dengan cara ini, fungsi yang sudah dibuat pada satu file bisa dipanggil dari file lain tanpa harus menuliskan ulang rumusnya.

Dari tugas ini, saya memahami bahwa module membantu memisahkan kode berdasarkan kegunaannya. Program juga menjadi lebih rapi karena fungsi perhitungan tidak semuanya ditulis dalam satu file.

**Dokumentasi hasil running:**

![Hasil Running Program Module Matematika](screenshot/Screenshot%202026-11-15%20145741.png)

## 3. Kesimpulan

Setelah menyelesaikan praktikum ini, saya mulai memahami bagaimana konsep dasar Python digunakan dalam pembuatan program. Setiap tugas memberikan latihan yang berbeda, mulai dari menghitung BMI, mengolah data nilai mahasiswa, sampai membuat fungsi yang bisa digunakan melalui module.

Saya juga memahami bahwa pemilihan struktur data, penggunaan fungsi, dan pemisahan kode ke dalam module dapat membantu program menjadi lebih teratur dan mudah dikembangkan.

---

**Praktikum Dasar Pemrograman Python – Pertemuan 4**