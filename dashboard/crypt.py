from Crypto.Cipher import AES
import hashlib


def make_key(hash_k, password):
    return hashlib.pbkdf2_hmac('sha256', (hash_k + password).encode(), b'PasswordManager', 1000).decode('ISO-8859-1')


def encrypt(key, password):

    hashed_key = hashlib.sha256(key.encode()).digest()
    cipher = AES.new(hashed_key, AES.MODE_ECB)

    password = password + (' '*(16-len(password) % 16))
    password = password.encode()
    return cipher.encrypt(password).decode('ISO-8859-1').replace("\x00", "\uFFFD")


def decrypt(key, encrypted_password):

    hashed_key = hashlib.sha256(key.encode()).digest()
    cipher = AES.new(hashed_key, AES.MODE_ECB)

    return cipher.decrypt(encrypted_password.replace("\uFFFD", "\x00").encode('ISO-8859-1')).decode('ISO-8859-1').strip()
