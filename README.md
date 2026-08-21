# USG Tracker

Sistem sederhana untuk mencatat **pengguna terakhir USG** di PICU.

## Alur

QR USG → GitHub Pages → isi nama → Google Apps Script → Google Sheet

## Struktur

- `index.html` — halaman mobile-first
- `style.css` — tampilan
- `app.js` — mengirim nama ke Google Apps Script
- `apps-script/Code.gs` — endpoint pencatat ke Google Sheet

## Setup Google Sheet

Buat spreadsheet, lalu buka **Extensions → Apps Script**.

1. Salin isi `apps-script/Code.gs` ke Apps Script.
2. Pastikan `SPREADSHEET_ID` menunjuk ke Google Sheet yang benar.
3. Deploy sebagai **Web app**.
4. Pilih **Execute as: Me**.
5. Pilih akses yang memungkinkan pengguna mengirim data.
6. Pastikan URL `/exec` yang digunakan di `app.js` adalah deployment terbaru.

Sheet `LOG` akan dibuat otomatis jika belum ada.

## GitHub Pages

Aktifkan GitHub Pages dari repository settings dan gunakan branch `main` sebagai source.

URL QR cukup:

```text
https://USERNAME.github.io/USG-Tracker/
```

Tidak ada parameter Equipment ID karena sistem hanya digunakan untuk satu USG.

## Log

Sheet `LOG` menyimpan:

| Timestamp | Nama |
|---|---|

Nama dengan timestamp terbaru adalah **pengguna terakhir**.

## Prinsip desain

- Satu USG.
- Tidak ada login user.
- Tidak ada foto/video.
- Tidak ada status atau catatan tambahan.
- Tidak ada database eksternal.
- Fokus pada pencatatan cepat di bedside.
