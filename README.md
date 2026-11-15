# CelikFakta PdP

Modul kendiri dalam talian untuk guru: menilai kesahan, ketepatan dan bias dalam maklumat digital.

## Kandungan repo

| Fail | Fungsi |
| --- | --- |
| `index.html` | Keseluruhan laman (halaman Utama, Unit 1 hingga 3, Kit Alat, Keputusan) |
| `media/` | Tiga video unit (MP4) dan gambar muka video |
| `apps-script/Code.gs` | Kod Apps Script yang menulis rekod peserta ke Google Sheet |
| `.nojekyll` | Memberitahu GitHub Pages supaya menghidang fail seadanya |

## Terbitkan di GitHub Pages

1. Push semua fail ke cabang `main`.
2. Di GitHub: Settings > Pages > Source: "Deploy from a branch" > `main` / root > Save.
3. URL awam: `https://<nama-pengguna>.github.io/<nama-repo>/`

## Sambungkan Google Sheet

1. Buka Sheet "CelikFakta PdP – Rekod Peserta" > Extensions > Apps Script.
2. Padam kod contoh, tampal kandungan `apps-script/Code.gs`, simpan.
3. Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone > Deploy.
4. Salin "Web app URL" dan tampal ke dalam `index.html` pada baris `const SHEET_URL = '';`
5. Push semula. Uji dengan menjawab satu penilaian unit; satu baris baharu akan muncul dalam Sheet.

Rekod yang dihantar: masa, ID rawak pelayar, nama pada sijil (jika diisi), unit, skor, status menguasai, jawapan, teks refleksi.
