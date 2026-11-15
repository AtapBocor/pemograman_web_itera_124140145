
import math_operations

from math_operations import (
    luas_persegi,
    keliling_persegi,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin
)

print("PROGRAM MATEMATIKA")

sisi = 5

print("PERSEGI")
print(f"Sisi             : {sisi}")
print(f"Luas             : {luas_persegi(sisi):.2f}")
print(f"Keliling         : {keliling_persegi(sisi):.2f}")

panjang = 8
lebar = 4

print("PERSEGI PANJANG")
print(f"Panjang          : {panjang}")
print(f"Lebar            : {lebar}")
print(f"Luas             : {math_operations.luas_persegi_panjang(panjang, lebar):.2f}")
print(f"Keliling         : {math_operations.keliling_persegi_panjang(panjang, lebar):.2f}")

jari_jari = 7

print("LINGKARAN")
print(f"Jari-jari        : {jari_jari}")
print(f"Luas             : {math_operations.luas_lingkaran(jari_jari):.2f}")
print(f"Keliling         : {math_operations.keliling_lingkaran(jari_jari):.2f}")

suhu = 30

print(" KONVERSI SUHU ")
print(f"Celsius          : {suhu} C")
print(f"Fahrenheit       : {celsius_ke_fahrenheit(suhu):.2f} F")
print(f"Kelvin           : {celsius_ke_kelvin(suhu):.2f} K")


print("PERHITUNGAN SELESAI")

