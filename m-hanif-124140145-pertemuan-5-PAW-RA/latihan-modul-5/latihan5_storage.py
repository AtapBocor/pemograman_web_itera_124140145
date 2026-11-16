
from abc import ABC, abstractmethod


class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file, data_bytes):
        pass

    @abstractmethod
    def download_file(self, nama_file):
        pass


class LocalDiskStorage(FileStorage):
    def __init__(self):
        self.folder = {}

    def upload_file(self, nama_file, data_bytes):
        self.folder[nama_file] = data_bytes
        print(f"File '{nama_file}' berhasil disimpan di penyimpanan lokal.")

    def download_file(self, nama_file):
        if nama_file in self.folder:
            print(f"File '{nama_file}' berhasil diunduh dari penyimpanan lokal.")
            return self.folder[nama_file]
        else:
            print(f"File '{nama_file}' tidak ditemukan di penyimpanan lokal.")
            return None


class CloudStorage(FileStorage):
    def __init__(self):
        self.server_cloud = {}

    def upload_file(self, nama_file, data_bytes):
        self.server_cloud[nama_file] = data_bytes
        print(f"File '{nama_file}' berhasil diunggah ke server cloud.")

    def download_file(self, nama_file):
        if nama_file in self.server_cloud:
            print(f"File '{nama_file}' berhasil diunduh dari server cloud.")
            return self.server_cloud[nama_file]
        else:
            print(f"File '{nama_file}' tidak ditemukan di server cloud.")
            return None


if __name__ == "__main__":

    print("=== LOCAL DISK STORAGE ===")
    lokal = LocalDiskStorage()

    data_file = b"Ini adalah isi file tugas Python."

    lokal.upload_file("tugas.txt", data_file)
    hasil_lokal = lokal.download_file("tugas.txt")
    print("Isi file:", hasil_lokal)

    print("\n=== CLOUD STORAGE ===")
    cloud = CloudStorage()

    cloud.upload_file("tugas.txt", data_file)
    hasil_cloud = cloud.download_file("tugas.txt")
    print("Isi file:", hasil_cloud)
