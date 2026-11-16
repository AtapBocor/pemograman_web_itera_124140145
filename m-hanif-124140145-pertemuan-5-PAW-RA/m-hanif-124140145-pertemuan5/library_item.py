
from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract class sebagai dasar semua item perpustakaan."""

    def __init__(self, id_item, judul, tahun_terbit):
        """Menginisialisasi data dasar item perpustakaan."""
        self._id_item = id_item
        self._judul = judul
        self._tahun_terbit = tahun_terbit
        self.__dipinjam = False

    @property
    def id_item(self):
        """Mengambil ID item."""
        return self._id_item

    @property
    def judul(self):
        """Mengambil judul item."""
        return self._judul

    @property
    def is_dipinjam(self):
        """Mengambil status peminjaman item."""
        return self.__dipinjam

    def pinjam(self):
        """Mengubah status item menjadi dipinjam."""
        if self.__dipinjam:
            print(f"Item '{self._judul}' sedang dipinjam.")
            return False

        self.__dipinjam = True
        print(f"Item '{self._judul}' berhasil dipinjam.")
        return True

    def kembalikan(self):
        """Mengubah status item menjadi tersedia."""
        if not self.__dipinjam:
            print(f"Item '{self._judul}' tidak sedang dipinjam.")
            return False

        self.__dipinjam = False
        print(f"Item '{self._judul}' berhasil dikembalikan.")
        return True

    @abstractmethod
    def get_detail(self):
        """Method abstract yang wajib dibuat oleh subclass."""
        pass


class Book(LibraryItem):
    """Subclass untuk menyimpan informasi buku."""

    def __init__(self, id_item, judul, tahun_terbit, penulis, jumlah_halaman):
        super().__init__(id_item, judul, tahun_terbit)
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman

    def get_detail(self):
        """Menampilkan informasi lengkap buku."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"

        return (
            f"[BUKU]\n"
            f"ID             : {self.id_item}\n"
            f"Judul          : {self.judul}\n"
            f"Tahun Terbit   : {self._tahun_terbit}\n"
            f"Penulis        : {self.penulis}\n"
            f"Jumlah Halaman : {self.jumlah_halaman}\n"
            f"Status         : {status}"
        )


class Magazine(LibraryItem):
    """Subclass untuk menyimpan informasi majalah."""

    def __init__(self, id_item, judul, tahun_terbit, edisi, penerbit):
        super().__init__(id_item, judul, tahun_terbit)
        self.edisi = edisi
        self.penerbit = penerbit

    def get_detail(self):
        """Menampilkan informasi lengkap majalah."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"

        return (
            f"[MAJALAH]\n"
            f"ID           : {self.id_item}\n"
            f"Judul        : {self.judul}\n"
            f"Tahun Terbit : {self._tahun_terbit}\n"
            f"Edisi        : {self.edisi}\n"
            f"Penerbit     : {self.penerbit}\n"
            f"Status       : {status}"
        )
