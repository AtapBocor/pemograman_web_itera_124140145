
from library_item import Book, Magazine
from library import Library


# Membuat objek perpustakaan
perpustakaan = Library("Perpustakaan Informatika")


# Membuat beberapa objek buku dan majalah
buku1 = Book(
    "B001", "Belajar Python", 2024,
    "Budi Raharjo", 250
)

buku2 = Book(
    "B002", "Dasar Pemrograman", 2023,
    "Andi Setiawan", 300
)

majalah1 = Magazine(
    "M001", "Teknologi Digital", 2025,
    "Edisi 12", "Tech Media"
)

majalah2 = Magazine(
    "M002", "Dunia Komputer", 2024,
    "Edisi 8", "Komputer Press"
)


# Menambahkan item ke perpustakaan
print("=== MENAMBAHKAN ITEM ===")
perpustakaan.tambah_item(buku1)
perpustakaan.tambah_item(buku2)
perpustakaan.tambah_item(majalah1)
perpustakaan.tambah_item(majalah2)


# Menampilkan katalog
perpustakaan.tampilkan_katalog()


# Mencari item berdasarkan ID
print("\n=== PENCARIAN BERDASARKAN ID ===")
perpustakaan.cari_item("B001")


# Mencari item berdasarkan judul
print("\n=== PENCARIAN BERDASARKAN JUDUL ===")
perpustakaan.cari_item("Teknologi Digital")


# Menguji proses peminjaman
print("\n=== PROSES PEMINJAMAN ===")
buku1.pinjam()


# Menampilkan katalog setelah peminjaman
perpustakaan.tampilkan_katalog()


# Menguji proses pengembalian
print("\n=== PROSES PENGEMBALIAN ===")
buku1.kembalikan()


# Menampilkan katalog setelah pengembalian
perpustakaan.tampilkan_katalog()
