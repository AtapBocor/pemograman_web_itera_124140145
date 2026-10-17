// js/TaskItem.js
// Model data untuk satu tugas kuliah.

export const PRIORITIES = ["tinggi", "sedang", "rendah"];
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const buatId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export class TaskItem {
  // Destructuring di parameter + nilai default
  constructor({
    id = buatId(),
    title,
    course = "Umum",
    deadline = "",
    priority = "sedang",
    done = false,
    createdAt = Date.now()
  } = {}) {
    this.id = id;
    this.title = String(title ?? "").trim();
    this.course = course;
    this.deadline = deadline; // format "YYYY-MM-DD" atau ""
    this.priority = PRIORITIES.includes(priority) ? priority : "sedang";
    this.done = Boolean(done);
    this.createdAt = createdAt;
  }

  // Selisih hari dari hari ini ke deadline (negatif = sudah lewat), null jika tanpa deadline
  get daysLeft() {
    if (!this.deadline) return null;
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);
    const target = new Date(`${this.deadline}T00:00:00`);
    return Math.round((target - hariIni) / MS_PER_DAY);
  }

  get isOverdue() {
    return !this.done && this.daysLeft !== null && this.daysLeft < 0;
  }

  get deadlineLabel() {
    const sisa = this.daysLeft;
    if (sisa === null) return "Tanpa deadline";
    if (this.done) return `Deadline ${this.deadline}`;
    if (sisa < 0) return `Terlambat ${Math.abs(sisa)} hari`;
    if (sisa === 0) return "Hari ini!";
    if (sisa === 1) return "Besok";
    return `${sisa} hari lagi`;
  }

  // Dipakai saat data dibaca kembali dari localStorage
  static fromJSON(data) {
    return new TaskItem(data);
  }
}
