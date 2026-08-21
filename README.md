# USG Tracker

Sistem sederhana untuk mencatat **pengguna terakhir USG** di PICU.

## Alur

QR USG → GitHub Pages → isi nama → Google Apps Script → Google Sheet

## Struktur

- `index.html` — halaman mobile-first
- `style.css` — tampilan
- `app.js` — membaca `equipment` dari URL dan mengirim data
- `apps-script/Code.gs` — endpoint pencatat ke Google Sheet

## Setup Google Sheet

Buat spreadsheet, lalu buka **Extensions → Apps Script**.

1. Salin isi `apps-script/Code.gs` ke Apps Script.
2. Pastikan `ALLOWED_EQUIPMENT` berisi ID alat yang digunakan.
3. Jalankan fungsi `setup()` sekali untuk membuat sheet `LOG`.
4. Deploy sebagai **Web app**.
5. Pilih **Execute as: Me**.
6. Pilih akses yang memungkinkan pengguna mengirim data tanpa membuka Sheet.
7. Salin URL `/exec`.
8. Masukkan URL tersebut ke `APPS_SCRIPT_URL` di `app.js`.

## GitHub Pages

Aktifkan GitHub Pages dari repository settings dan gunakan branch `main` sebagai source.

Contoh URL QR:

```text
https://USERNAME.github.io/USG-Tracker/?equipment=USG-01
```

Untuk USG lain, ubah parameter:

```text
?equipment=USG-02
?equipment=USG-03
```

## Log

Sheet `LOG` menyimpan:

| Timestamp | Equipment ID | User |
|---|---|---|

Pengguna dengan timestamp terbaru untuk masing-masing USG adalah **last user**.

## Prinsip desain

- Tidak ada login user.
- Tidak ada foto/video.
- Tidak ada status atau catatan tambahan.
- Tidak ada database eksternal.
- Tidak ada API key di GitHub.
- Fokus pada pencatatan cepat di bedside.
