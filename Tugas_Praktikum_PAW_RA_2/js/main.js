// js/main.js
// Pengendali antarmuka: menghubungkan DOM dengan DashboardApp.

import { DashboardApp } from "./DashboardApp.js";

const app = new DashboardApp();

// ----------------------------
// Elemen & state UI
// ----------------------------
const $ = (selector) => document.querySelector(selector);

const els = {
  today: $("#todayLabel"),
  weather: $("#weatherBox"),
  quote: $("#quoteBox"),
  quoteBtn: $("#quoteBtn"),
  stats: $("#statsBox"),
  progressBar: $("#progressBar"),
  progressTrack: $("#progressTrack"),
  form: $("#taskForm"),
  formTitle: $("#formTitle"),
  formError: $("#formError"),
  title: $("#taskTitle"),
  course: $("#taskCourse"),
  deadline: $("#taskDeadline"),
  priority: $("#taskPriority"),
  submitBtn: $("#submitBtn"),
  cancelBtn: $("#cancelBtn"),
  filterBar: $("#filterBar"),
  search: $("#searchInput"),
  clearDone: $("#clearDoneBtn"),
  list: $("#taskList")
};

const ui = { filter: "semua", query: "", editingId: null };

const PRIORITY_STYLE = {
  tinggi: "bg-red-100 text-red-700",
  sedang: "bg-amber-100 text-amber-700",
  rendah: "bg-green-100 text-green-700"
};

// ----------------------------
// Template (template literals)
// ----------------------------
// Semua teks dari pengguna/API di-escape sebelum masuk ke innerHTML
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const statTemplate = ({ label, value, color = "text-slate-800" }) => `
  <div class="rounded-lg bg-slate-50 py-2">
    <div class="text-2xl font-bold ${color}">${value}</div>
    <div class="text-xs text-slate-500">${label}</div>
  </div>`;

const taskTemplate = ({ id, title, course, priority, done, deadlineLabel, isOverdue }) => `
  <li class="task-item flex items-start gap-3 border rounded-lg p-3 ${done ? "task-done bg-slate-50" : "bg-white"} ${isOverdue ? "border-red-300" : "border-slate-200"}"
      data-id="${escapeHtml(id)}">
    <input type="checkbox" data-action="toggle" ${done ? "checked" : ""} class="mt-1 h-4 w-4 accent-indigo-600"
           aria-label="Tandai selesai: ${escapeHtml(title)}">
    <div class="flex-1 min-w-0">
      <div class="task-title font-medium break-words">${escapeHtml(title)}</div>
      <div class="mt-1 flex flex-wrap items-center gap-2 text-xs">
        <span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">${escapeHtml(course)}</span>
        <span class="px-2 py-0.5 rounded-full ${PRIORITY_STYLE[priority]}">${priority}</span>
        <span class="${isOverdue ? "text-red-600 font-semibold" : "text-slate-500"}">${deadlineLabel}</span>
      </div>
    </div>
    <div class="flex gap-2 text-xs shrink-0">
      <button type="button" data-action="edit" class="text-indigo-600 hover:underline">Edit</button>
      <button type="button" data-action="delete" class="text-red-600 hover:underline">Hapus</button>
    </div>
  </li>`;

const emptyTemplate = (filtered) => `
  <li class="text-center text-sm text-slate-400 py-8">
    ${filtered ? "Tidak ada tugas yang cocok." : "Belum ada tugas. Tambahkan tugas pertamamu di atas!"}
  </li>`;

// ----------------------------
// Render
// ----------------------------
const renderStats = () => {
  const { total, done, active, overdue, percent } = app.stats;
  els.stats.innerHTML = [
    { label: "Total", value: total },
    { label: "Aktif", value: active, color: "text-indigo-600" },
    { label: "Selesai", value: done, color: "text-green-600" },
    { label: "Terlambat", value: overdue, color: overdue > 0 ? "text-red-600" : "text-slate-800" }
  ].map(statTemplate).join("");

  els.progressBar.style.width = `${percent}%`;
  els.progressTrack.setAttribute("aria-valuenow", String(percent));
};

const renderList = () => {
  const visible = app.getVisibleTasks(ui);
  const filtered = ui.filter !== "semua" || ui.query.trim() !== "";
  els.list.innerHTML = visible.length ? visible.map(taskTemplate).join("") : emptyTemplate(filtered);

  els.filterBar.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.filter === ui.filter);
  });
  els.clearDone.hidden = app.stats.done === 0;
};

const render = () => {
  renderStats();
  renderList();
};

// ----------------------------
// Form tambah / edit
// ----------------------------
const showError = (message) => {
  els.formError.textContent = message;
  els.formError.classList.toggle("hidden", !message);
};

const resetForm = () => {
  ui.editingId = null;
  els.form.reset();
  els.formTitle.textContent = "Tambah Tugas";
  els.submitBtn.textContent = "Tambah Tugas";
  els.cancelBtn.classList.add("hidden");
  showError("");
};

const startEdit = (id) => {
  const task = app.tasks.find((t) => t.id === id);
  if (!task) return;
  ui.editingId = id;
  els.title.value = task.title;
  els.course.value = task.course;
  els.deadline.value = task.deadline;
  els.priority.value = task.priority;
  els.formTitle.textContent = "Edit Tugas";
  els.submitBtn.textContent = "Simpan Perubahan";
  els.cancelBtn.classList.remove("hidden");
  showError("");
  els.title.focus();
  els.form.scrollIntoView({ behavior: "smooth", block: "center" });
};

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = {
    title: els.title.value,
    course: els.course.value.trim() || "Umum",
    deadline: els.deadline.value,
    priority: els.priority.value
  };

  try {
    if (ui.editingId) app.updateTask(ui.editingId, fields);
    else app.addTask(fields);
    resetForm();
    render();
  } catch (error) {
    showError(error.message);
  }
});

els.cancelBtn.addEventListener("click", resetForm);

// ----------------------------
// Aksi pada daftar (event delegation)
// ----------------------------
els.list.addEventListener("click", ({ target }) => {
  const button = target.closest("[data-action]");
  const item = target.closest("[data-id]");
  if (!button || !item) return;

  const { id } = item.dataset;
  const { action } = button.dataset;

  if (action === "toggle") {
    app.toggleTask(id);
  } else if (action === "edit") {
    startEdit(id);
    return;
  } else if (action === "delete") {
    if (!confirm("Hapus tugas ini?")) return;
    app.deleteTask(id);
    if (ui.editingId === id) resetForm();
  }
  render();
});

els.filterBar.addEventListener("click", ({ target }) => {
  const { filter } = target.dataset;
  if (!filter) return;
  ui.filter = filter;
  renderList();
});

// Pencarian ditunda 200 ms setelah berhenti mengetik; `let` dipakai karena timer terus diganti
let searchTimer;
els.search.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    ui.query = els.search.value;
    renderList();
  }, 200);
});

els.clearDone.addEventListener("click", () => {
  if (!confirm("Hapus semua tugas yang sudah selesai?")) return;
  app.clearCompleted();
  render();
});

// ----------------------------
// Widget cuaca & kutipan (async/await)
// ----------------------------
const loadWeather = async () => {
  try {
    const { temperature, windspeed, description } = await app.fetchWeather();
    els.weather.innerHTML = `
      <div class="text-3xl font-bold text-slate-800">${temperature}&deg;C</div>
      <div class="text-slate-600">${escapeHtml(description)} &middot; angin ${windspeed} km/jam</div>`;
  } catch (error) {
    els.weather.textContent = "Cuaca tidak tersedia (cek koneksi internet).";
  }
};

const loadQuote = async () => {
  els.quote.textContent = "Memuat kutipan...";
  try {
    const { quote, author } = await app.fetchQuote();
    els.quote.innerHTML = `
      <p class="italic text-slate-700">&ldquo;${escapeHtml(quote)}&rdquo;</p>
      <p class="mt-1 text-xs text-slate-400">&mdash; ${escapeHtml(author)}</p>`;
  } catch (error) {
    els.quote.textContent = "Tetap semangat, satu tugas selesai lebih baik daripada seribu rencana.";
  }
};

els.quoteBtn.addEventListener("click", loadQuote);

// ----------------------------
// Mulai aplikasi
// ----------------------------
const start = async () => {
  els.today.textContent = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
  els.list.innerHTML = `<li class="text-center text-sm text-slate-400 py-8">Memuat tugas...</li>`;
  renderStats();

  // Tugas dan widget dimuat bersamaan, tidak saling menunggu
  await Promise.all([
    app.init().then(render),
    loadWeather(),
    loadQuote()
  ]);
};

start();
