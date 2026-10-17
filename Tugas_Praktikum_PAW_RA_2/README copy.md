# Kampus Planner

Aplikasi web pengelola tugas kuliah untuk mahasiswa. Semua tugas, deadline, dan prioritas dicatat dalam satu dashboard, lengkap dengan cuaca kampus ITERA dan kutipan motivasi harian.

Dibuat untuk tugas praktikum **JavaScript Next Gen (ES6+)**.

## Fitur Aplikasi

- **Tambah, edit, hapus tugas**: judul, mata kuliah, deadline, dan prioritas (tinggi / sedang / rendah).
- **Tandai selesai** dengan checkbox, dan **hapus semua yang selesai** sekaligus.
- **Penanda deadline otomatis**: "Hari ini!", "Besok", "3 hari lagi", atau "Terlambat 2 hari" (kartu bergaris merah).
- **Urutan otomatis berdasarkan urgensi**: belum selesai di atas, deadline terdekat lebih dulu, lalu prioritas.
- **Filter** (Semua / Aktif / Selesai) dan **pencarian** berdasarkan judul atau mata kuliah.
- **Statistik dan progress bar**: total, aktif, selesai, terlambat.
- **Widget cuaca** kampus ITERA (Open-Meteo) dan **kutipan harian** (DummyJSON).
- **Penyimpanan otomatis di localStorage**: data tetap ada setelah browser ditutup.
- Saat pertama dibuka, daftar diisi dari JSONPlaceholder sebagai contoh. Jika offline, dipakai data contoh bawaan.

## Screenshot

![Tampilan dashboard](screenshots/Screenshot 2026-10-17 231433.png)

## Cara Menjalankan

ES Modules tidak berjalan lewat `file://`, jadi buka lewat server lokal:

1. Buka folder `kampus-planner` di VS Code (**File > Open Folder**).
2. Klik kanan `index.html`, pilih **Open with Live Server**.
   Atau dari terminal: `npx serve`, lalu buka `http://localhost:3000`.

Perlu koneksi internet untuk Tailwind CDN dan tiga API. Tanpa internet, aplikasi tetap jalan (tanpa styling Tailwind, cuaca, dan kutipan).

## Struktur Proyek

```
kampus-planner/
├── index.html
├── css/style.css
├── js/
│   ├── TaskItem.js       # class model data satu tugas
│   ├── DashboardApp.js   # class state, localStorage, dan fetch API
│   └── main.js           # pengendali DOM dan event
└── README.md
```

## Fitur ES6+ yang Diimplementasikan

| Fitur ES6+ | File dan baris |
|---|---|
| `let` dan `const` | `const` untuk nilai yang tidak diganti, mis. `main.js:6` (`app`), `main.js:36` (`ui`), `TaskItem.js:5`. `let` hanya untuk variabel yang memang diganti ulang: `main.js:199` (`searchTimer` pada debounce pencarian). |
| **Arrow functions** (banyak) | `DashboardApp.js:27` (`fetchJson`), `:34` (`tanggalOffset`), `:40` (`describeWeather`), `:50` (`byUrgency`); `main.js:11` (`$`), `:48` (`escapeHtml`), `:84` (`renderStats`), `:97` (`renderList`), `:146` (event submit) |
| **Template literals** | `TaskItem.js:7` (id), `:34`, `:45`-`:49` (label deadline); `DashboardApp.js:148` (pencarian); `main.js:51` (`statTemplate`), `:57` (`taskTemplate`), `:76` (`emptyTemplate`), `:93`, `:220`, `:232` |
| **Async/Await** | `DashboardApp.js:27` (`fetchJson`), `:155` (`fetchWeather`), `:160` (`fetchQuote`), `:166` (`seedFromApi`), `:188` (`init`); `main.js:217` (`loadWeather`), `:228` (`loadQuote`), `:245` (`start`) |
| **`Promise.all`** | `main.js:253`, memuat tugas, cuaca, dan kutipan secara bersamaan |
| **Classes** | `TaskItem.js:9` (`class TaskItem`), `DashboardApp.js:57` (`class DashboardApp`) |
| **Getter dan static method** | `TaskItem.js:30` (`daysLeft`), `:38` (`isOverdue`), `:42` (`deadlineLabel`), `:53` (`static fromJSON`); `DashboardApp.js:65` (`tasks`), `:69` (`stats`) |
| **Private fields (`#`)** | `DashboardApp.js:58`-`:59` (`#tasks`, `#storage`), `:106` (`#commit`) |
| **Destructuring di parameter** | `TaskItem.js:11` (constructor), `DashboardApp.js:61`, `main.js:51`, `:57`, `:170`, `:191` |
| **Destructuring nested** | `DashboardApp.js:156` (`current_weather: { temperature, ... }`) |
| **Default parameters** | `TaskItem.js:11`-`:18` (nilai default tiap properti), `DashboardApp.js:61`, `:144`, `main.js:51` |
| **Spread operator** (state immutable) | `DashboardApp.js:117` (`[task, ...this.#tasks]`), `:124` (`{ ...current, ...changes }`), `:182` (`{ ...item, deadline }`) |
| **Nullish coalescing (`??`)** | `TaskItem.js:21` (`title ?? ""`) |
| **Modules (`import`/`export`)** | `DashboardApp.js:4`, `main.js:4` (import); `TaskItem.js:4`, `TaskItem.js:9`, `DashboardApp.js:57` (export) |
| **Array methods modern** | `DashboardApp.js:71`-`:72`, `:122`-`:140`, `:146`-`:150` (`filter`, `map`, `find`, `sort`, `includes`) |
| **localStorage + JSON** | `DashboardApp.js:83` (`getItem`), `:85` (`JSON.parse`), `:97` (`setItem` + `JSON.stringify`) |

## Pengelolaan Data (localStorage)

- Kunci penyimpanan: `kampusPlanner.tasks.v1`.
- Setiap perubahan (tambah, edit, hapus, centang) membuat **array baru** (immutable) lalu langsung disimpan lewat `#commit()`.
- Data dibaca kembali menjadi objek `TaskItem` lewat `TaskItem.fromJSON()`, sehingga getter seperti `deadlineLabel` tetap berfungsi.
- Data rusak atau localStorage tidak tersedia ditangani dengan `try/catch`, jadi aplikasi tidak crash.

## API Publik yang Dipakai (tanpa API key)

| Fungsi | Endpoint |
|---|---|
| Cuaca ITERA | `https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true` |
| Kutipan harian | `https://dummyjson.com/quotes/random` |
| Tugas contoh awal | `https://jsonplaceholder.typicode.com/todos?_limit=5` |

## Keamanan

Teks dari pengguna dan API di-escape (`escapeHtml`) sebelum dimasukkan ke `innerHTML`, sehingga judul tugas seperti `<script>` tidak dieksekusi.
