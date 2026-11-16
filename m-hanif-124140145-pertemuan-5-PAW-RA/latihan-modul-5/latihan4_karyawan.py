
class Karyawan:
    def __init__(self, nama, jabatan, gaji_pokok):
        self.nama = nama
        self.jabatan = jabatan
        self.__gaji_pokok = 3200000
        self.gaji_pokok = gaji_pokok

    @property
    def gaji_pokok(self):
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, gaji_baru):
        if not isinstance(gaji_baru, (int, float)):
            raise TypeError("Gaji harus berupa angka!")

        if gaji_baru < 3200000:
            raise ValueError("Gaji pokok tidak boleh kurang dari Rp3.200.000!")

        self.__gaji_pokok = gaji_baru

    def hitung_gaji_bersih(self, pajak_persen):
        if not 0 <= pajak_persen <= 100:
            raise ValueError("Persentase pajak harus antara 0 sampai 100!")

        pajak = self.__gaji_pokok * pajak_persen / 100
        gaji_bersih = self.__gaji_pokok - pajak

        return gaji_bersih


if __name__ == "__main__":
    karyawan1 = Karyawan("Ahmad", "Programmer", 5000000)

    print("=== DATA KARYAWAN ===")
    print("Nama        :", karyawan1.nama)
    print("Jabatan     :", karyawan1.jabatan)
    print(f"Gaji Pokok  : Rp{karyawan1.gaji_pokok:,.0f}")

    print("\n=== PERHITUNGAN GAJI ===")
    pajak = 5
    print("Pajak       :", pajak, "%")
    print(f"Gaji Bersih : Rp{karyawan1.hitung_gaji_bersih(pajak):,.0f}")

    print("\n=== UJI VALIDASI GAJI ===")
    try:
        karyawan1.gaji_pokok = 2500000
    except ValueError as err:
        print("Validasi:", err)

    print(f"Gaji Pokok Saat Ini: Rp{karyawan1.gaji_pokok:,.0f}")
