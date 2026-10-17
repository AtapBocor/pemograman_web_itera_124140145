// js/DashboardApp.js
// Mengelola state tugas, penyimpanan localStorage, dan pemanggilan API publik.

import { TaskItem, PRIORITIES } from "./TaskItem.js";

const STORAGE_KEY = "kampusPlanner.tasks.v1";

// Endpoint publik (gratis, tanpa API key)
const ENDPOINTS = {
  weather: "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true",
  quote: "https://dummyjson.com/quotes/random",
  todos: "https://jsonplaceholder.typicode.com/todos?_limit=5"
};

const PRIORITY_RANK = { tinggi: 0, sedang: 1, rendah: 2 };

// Data cadangan bila API tidak bisa dijangkau saat pertama kali dibuka
const OFFLINE_SEED = [
  { title: "Kerjakan praktikum JavaScript Next Gen", course: "Pemrograman Web", priority: "tinggi" },
  { title: "Baca bab 3 untuk kuis", course: "Basis Data", priority: "sedang" },
  { title: "Rapikan catatan kuliah minggu ini", course: "Umum", priority: "rendah" }
];

// ----------------------------
// Helper (arrow functions)
// ----------------------------
const fetchJson = async (url) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`); // fetch tidak otomatis error di 404/500
  return res.json();
};

// "YYYY-MM-DD" menurut zona waktu lokal, dihitung dari hari ini + offset
const tanggalOffset = (hari) => {
  const d = new Date();
  d.setDate(d.getDate() + hari);
  return d.toLocaleDateString("sv-SE");
};

const describeWeather = (code) => {
  if (code === 0) return "Cerah";
  if (code <= 3) return "Berawan";
  if (code <= 48) return "Berkabut";
  if (code <= 57) return "Gerimis";
  if (code <= 67) return "Hujan";
  if (code <= 82) return "Hujan lokal";
  return "Badai petir";
};

const byUrgency = (a, b) => {
  if (a.done !== b.done) return a.done ? 1 : -1; // yang belum selesai di atas
  const da = a.deadline || "9999-12-31";          // tanpa deadline di paling bawah
  const db = b.deadline || "9999-12-31";
  return da.localeCompare(db) || PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
};

export class DashboardApp {
  #tasks = [];
  #storage;

  constructor({ storage = globalThis.localStorage } = {}) {
    this.#storage = storage;
  }

  get tasks() {
    return this.#tasks;
  }

  get stats() {
    const total = this.#tasks.length;
    const done = this.#tasks.filter((t) => t.done).length;
    const overdue = this.#tasks.filter((t) => t.isOverdue).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, active: total - done, overdue, percent };
  }

  // ----------------------------
  // localStorage
  // ----------------------------
  // Mengembalikan true jika sudah ada data tersimpan
  load() {
    try {
      const raw = this.#storage.getItem(STORAGE_KEY);
      if (raw === null) return false;
      const parsed = JSON.parse(raw);
      this.#tasks = Array.isArray(parsed) ? parsed.map((data) => TaskItem.fromJSON(data)) : [];
      return true;
    } catch (error) {
      console.warn("Data tersimpan rusak, dimulai dari awal.", error);
      this.#tasks = [];
      return false;
    }
  }

  save() {
    try {
      this.#storage.setItem(STORAGE_KEY, JSON.stringify(this.#tasks));
      return true;
    } catch (error) {
      console.warn("Gagal menyimpan ke localStorage.", error);
      return false;
    }
  }

  // Semua perubahan state lewat sini: array diganti dengan array baru (immutable), lalu disimpan
  #commit(nextTasks) {
    this.#tasks = nextTasks;
    this.save();
  }

  // ----------------------------
  // CRUD (spread untuk menjaga data immutable)
  // ----------------------------
  addTask(fields) {
    const task = new TaskItem(fields);
    if (!task.title) throw new Error("Judul tugas tidak boleh kosong.");
    this.#commit([task, ...this.#tasks]);
    return task;
  }

  updateTask(id, changes) {
    const current = this.#tasks.find((t) => t.id === id);
    if (!current) return null;
    const updated = new TaskItem({ ...current, ...changes });
    if (!updated.title) throw new Error("Judul tugas tidak boleh kosong.");
    this.#commit(this.#tasks.map((t) => (t.id === id ? updated : t)));
    return updated;
  }

  toggleTask(id) {
    const current = this.#tasks.find((t) => t.id === id);
    return current ? this.updateTask(id, { done: !current.done }) : null;
  }

  deleteTask(id) {
    this.#commit(this.#tasks.filter((t) => t.id !== id));
  }

  clearCompleted() {
    this.#commit(this.#tasks.filter((t) => !t.done));
  }

  // Filter status + pencarian teks, lalu diurutkan berdasarkan urgensi
  getVisibleTasks({ filter = "semua", query = "" } = {}) {
    const q = query.trim().toLowerCase();
    return this.#tasks
      .filter((t) => filter === "semua" || (filter === "selesai" ? t.done : !t.done))
      .filter((t) => !q || `${t.title} ${t.course}`.toLowerCase().includes(q))
      .sort(byUrgency);
  }

  // ----------------------------
  // API eksternal (async/await)
  // ----------------------------
  async fetchWeather() {
    const { current_weather: { temperature, windspeed, weathercode } } = await fetchJson(ENDPOINTS.weather);
    return { temperature, windspeed, description: describeWeather(weathercode) };
  }

  async fetchQuote() {
    const { quote, author } = await fetchJson(ENDPOINTS.quote);
    return { quote, author };
  }

  // Mengisi daftar awal. Mengembalikan "api" atau "offline" sebagai sumber datanya.
  async seedFromApi() {
    try {
      const todos = await fetchJson(ENDPOINTS.todos);
      const seeded = todos.map(({ title, completed }, i) =>
        new TaskItem({
          title,
          course: "Contoh (API)",
          priority: PRIORITIES[i % PRIORITIES.length],
          deadline: tanggalOffset(i + 1),
          done: completed
        })
      );
      this.#commit(seeded);
      return "api";
    } catch (error) {
      console.warn("API todos tidak tersedia, memakai data cadangan.", error);
      this.#commit(OFFLINE_SEED.map((item, i) => new TaskItem({ ...item, deadline: tanggalOffset(i + 2) })));
      return "offline";
    }
  }

  // Dipanggil sekali saat aplikasi dibuka
  async init() {
    if (this.load()) return "storage";
    return this.seedFromApi();
  }
}
