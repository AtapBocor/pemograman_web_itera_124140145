
kontak = {
    "Hanif": "081234567890",
    "Andi": "082345678901",
    "Budi": "083456789012"
}

while True:
    print("\n=== KATALOG KONTAK ===")
    print("1. Tambahkan Kontak")
    print("2. Cari Nomor Telepon")
    print("3. Tampilkan Semua Kontak")
    print("4. Keluar")

    pilihan = input("Pilih menu (1-4): ")

    if pilihan == "1":
        nama = input("Masukkan nama kontak: ")
        nomor = input("Masukkan nomor telepon: ")

        kontak[nama] = nomor
        print("Kontak berhasil ditambahkan!")

    elif pilihan == "2":
        nama = input("Masukkan nama yang dicari: ")
        nomor = kontak.get(nama, "Kontak tidak ditemukan")

        print(f"Nomor telepon {nama}: {nomor}")

    elif pilihan == "3":
        print("\n=== DAFTAR KONTAK ===")

        for nama, nomor in kontak.items():
            print(f"Nama: {nama} | Nomor: {nomor}")

    elif pilihan == "4":
        print("Terima kasih telah menggunakan katalog kontak!")
        break

    else:
        print("Pilihan tidak valid!")
