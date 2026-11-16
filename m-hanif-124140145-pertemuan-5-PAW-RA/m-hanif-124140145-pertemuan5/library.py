
from library_item import LibraryItem


class Library:
    """Class untuk mengelola koleksi item perpustakaan."""

    def __init__(self, nama_perpustakaan):
        """Menginisialisasi nama dan koleksi perpustakaan."""
        self.nama_perpustakaan = nama_perpustakaan
        self.__koleksi = []

    def tambah_item(self, item):
        """Menambahkan item baru ke dalam koleksi."""
        if not isinstance(item, LibraryItem):
            print("Gagal: Item harus berupa LibraryItem.")
            return False

        for koleksi in self.__koleksi:
            if koleksi.id_item == item.id_item:
                print(f"Gagal: ID {item.id_item} sudah digunakan.")
                return False

        self.__koleksi.append(item)
        print(f"Item '{item.judul}' berhasil ditambahkan.")
        return True

    def tampilkan_katalog(self):
        """Menampilkan semua item yang tersedia."""
        print(f"\n=== KATALOG {self.nama_perpustakaan.upper()} ===")

        tersedia = [
            item for item in self.__koleksi
            if not item.is_dipinjam
        ]

        if not tersedia:
            print("Tidak ada item yang tersedia.")
            return

        for item in tersedia:
            print("-" * 35)
            print(item.get_detail())

        print("-" * 35)
        print(f"Total item tersedia: {len(tersedia)}")

    def cari_item(self, kata_kunci):
        """Mencari item berdasarkan ID atau judul."""
        kata_kunci = str(kata_kunci).lower()

        for item in self.__koleksi:
            if (
                kata_kunci == item.id_item.lower()
                or kata_kunci in item.judul.lower()
            ):
                print("\n=== HASIL PENCARIAN ===")
                print(item.get_detail())
                return item

        print(f"Item dengan kata kunci '{kata_kunci}' tidak ditemukan.")
        return None
