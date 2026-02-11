# 🚀 Panduan Deploy Happy Birthday Risa ke Vercel

## Cara Deploy ke Vercel (Step by Step)

### Langkah 1: Push ke GitHub
Pastikan project sudah di-push ke GitHub repository.

```bash
# Jika belum ada remote, tambahkan:
git remote add origin https://github.com/USERNAME/Happy-Birthday-Risa.git

# Push ke github
git add .
git commit -m "Production ready for Vercel"
git push -u origin main
```

### Langkah 2: Buat Akun Vercel
1. Buka **[vercel.com](https://vercel.com)**
2. Klik **Sign Up** dan login dengan akun **GitHub** kamu

### Langkah 3: Import Project
1. Di dashboard Vercel, klik **"Add New..."** → **"Project"**
2. Pilih repository **Happy-Birthday-Risa** dari daftar GitHub
3. Klik **"Import"**

### Langkah 4: Konfigurasi Build
Vercel biasanya akan auto-detect Vite, tapi pastikan pengaturan berikut:

| Setting | Nilai |
|---------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Root Directory** | `./ ` (biarkan kosong/default) |

> ⚠️ **PENTING**: Jangan set environment variable `VITE_API_URL` di Vercel!
> Biarkan kosong agar app menggunakan data lokal dari `defaultData.ts`.

### Langkah 5: Deploy!
1. Klik **"Deploy"**
2. Tunggu proses build selesai (± 1-2 menit)
3. Setelah selesai, kamu akan mendapat URL seperti: `https://happy-birthday-risa.vercel.app`

---

## Cara Kerja Arsitektur

```
┌─────────────────────────────────────────┐
│           PRODUCTION (Vercel)           │
│                                         │
│  Frontend (Static)                      │
│  └── Data dari defaultData.ts           │
│  └── Tidak butuh backend!               │
│  └── URL: happy-birthday-risa.vercel.app│
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         DEVELOPMENT (Lokal)             │
│                                         │
│  Frontend (Vite, port 3005)             │
│  └── Data dari backend API              │
│  └── .env: VITE_API_URL=localhost:3001  │
│                                         │
│  Backend (Express, port 3001)           │
│  └── SQLite database                    │
│  └── Admin panel / CMS                  │
└─────────────────────────────────────────┘
```

## Jika Ingin Update Konten

Ubah data di file `defaultData.ts`, lalu push ke GitHub.
Vercel akan otomatis re-deploy setiap kali ada push baru.

## Troubleshooting

### "Page Not Found" saat refresh halaman
File `vercel.json` sudah menghandle ini dengan SPA rewrite rules.

### Build gagal di Vercel
Pastikan:
1. Tidak ada `VITE_API_URL` di environment variables Vercel
2. `node_modules` ada di `.gitignore`
3. Semua dependencies ada di `package.json`
