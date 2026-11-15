
from password_gen import buat_password_acak

password = buat_password_acak()

print("=== GENERATOR PASSWORD ACAK ===")
print(f"Password yang dihasilkan: {password}")

password_baru = buat_password_acak(12)
print(f"Password dengan panjang 12 karakter: {password_baru}")
