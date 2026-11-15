
import random
import string

def buat_password_acak(panjang=8):
    karakter = string.ascii_letters + string.digits
    password = ''.join(random.choice(karakter) for i in range(panjang))
    return password
