angka_rahasia = 7

while True:
    tebakan = int(input("Tebak angka (1-10):"))

    if tebakan < angka_rahasia:
        print("terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break