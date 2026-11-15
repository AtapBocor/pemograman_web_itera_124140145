def validasi_password(password):
    if len(password) >= 8 and any(karakter.isdigit() for karakter in password):
        return True
    else:
        return False
print(" Program Validator Password ")

print(validasi_password("hanifff12"))
print(validasi_password("teknikinfor24"))
print(validasi_password("if2024"))