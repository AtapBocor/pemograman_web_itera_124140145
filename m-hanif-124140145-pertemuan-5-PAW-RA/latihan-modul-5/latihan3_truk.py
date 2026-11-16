
class Kendaraan:
    def __init__(self, merk, tahun):
        self.merk = merk
        self.tahun = tahun

    def deskripsi(self):
        return f"Kendaraan {self.merk}, tahun {self.tahun}"


class Truk(Kendaraan):
    def __init__(self, merk, tahun, kapasitas_maksimal_ton):
        super().__init__(merk, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0

    def muat_barang(self, berat_ton):
        if berat_ton <= 0:
            print("Berat barang harus lebih dari 0 ton!")
        elif self.muatan_saat_ini + berat_ton <= self.kapasitas_maksimal_ton:
            self.muatan_saat_ini += berat_ton
            print(f"Berhasil memuat {berat_ton} ton barang.")
        else:
            print("Gagal! Muatan melebihi kapasitas maksimal truk.")

    def deskripsi(self):
        return (
            f"Truk {self.merk}, tahun {self.tahun}\n"
            f"Kapasitas maksimal: {self.kapasitas_maksimal_ton} ton\n"
            f"Muatan saat ini: {self.muatan_saat_ini} ton"
        )


truk1 = Truk("Mitsubishi Fuso", 2022, 10)

print("=== INFORMASI TRUK ===")
print(truk1.deskripsi())

print("\n=== PROSES PEMUATAN BARANG ===")
truk1.muat_barang(4)
truk1.muat_barang(3)
truk1.muat_barang(5)

print("\n=== KONDISI AKHIR TRUK ===")
print(truk1.deskripsi())
