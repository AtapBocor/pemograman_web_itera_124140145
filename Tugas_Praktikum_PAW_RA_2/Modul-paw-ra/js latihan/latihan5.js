// js/latihan5.js

// ----------------------------
// Helper umum
// ----------------------------
const tunda = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PRE = "bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap overflow-x-auto";
const BTN = "bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-1 px-3 rounded text-sm";

function el(tag, className = "", text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// Membuat kartu langsung di #output, mengembalikan area isinya
function buatKartu(judul, subjudul) {
  const card = el("div", "bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm");
  const body = el("div", "space-y-2");
  card.append(el("h4", "font-bold text-blue-600 text-base mb-1", judul),
              el("p", "text-xs text-gray-500 mb-2", subjudul), body);
  document.getElementById("output")?.appendChild(card);
  return body;
}

// ----------------------------
// "API" tiruan (pengganti fetch)
// ----------------------------
const NAMA = ["Apel", "Anggur", "Alpukat", "Jeruk", "Mangga", "Melon", "Pisang", "Pepaya", "Semangka"];
const DATA = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, nama: `Item ${i + 1}` }));

const api = {
  async users() {
    await tunda(400);
    return [{ id: 1, name: "Budi" }, { id: 2, name: "Sari" }, { id: 3, name: "Andi" }];
  },
  async posts() {
    await tunda(700);
    return [
      { id: 1, userId: 1, title: "Belajar JS" },
      { id: 2, userId: 2, title: "Async Await" },
      { id: 3, userId: 1, title: "Promise" }
    ];
  },
  async comments() {
    await tunda(300);
    return [{ postId: 1, text: "Bagus" }, { postId: 2, text: "Mantap" }, { postId: 2, text: "Jelas" }];
  },
  async halaman(page, size = 5) {
    await tunda(400);
    return {
      items: DATA.slice((page - 1) * size, page * size),
      page,
      totalHalaman: Math.ceil(DATA.length / size)
    };
  },
  async cari(q) {
    await tunda(300 + Math.random() * 500); // jeda acak, respons bisa datang tidak berurutan
    return NAMA.filter((n) => n.toLowerCase().includes(q.toLowerCase()));
  }
};

// ----------------------------
// 1. Fetch beberapa endpoint, lalu gabungkan
// ----------------------------
async function latihanGabung() {
  const body = buatKartu("Async 1: Multi-endpoint", "Promise.all lalu digabung (join) per id");
  const pre = el("pre", PRE, "Memuat...");
  body.append(pre);

  try {
    const t0 = performance.now();
    const [users, posts, comments] = await Promise.all([api.users(), api.posts(), api.comments()]);
    const ms = Math.round(performance.now() - t0);

    const gabungan = posts.map((p) => ({
      judul: p.title,
      penulis: users.find((u) => u.id === p.userId)?.name ?? "?",
      komentar: comments.filter((c) => c.postId === p.id).length
    }));

    pre.textContent =
      gabungan.map((g) => `"${g.judul}" oleh ${g.penulis} (${g.komentar} komentar)`).join("\n") +
      `\n\nWaktu paralel: ${ms} ms (berurutan sekitar 1400 ms)`;
  } catch (e) {
    pre.textContent = `Gagal: ${e.message}`;
  }
}

// ----------------------------
// 2. Retry dengan exponential backoff
// ----------------------------
async function retry(fn, { maxPercobaan = 4, jedaAwal = 200, onGagal } = {}) {
  for (let percobaan = 1; ; percobaan++) {
    try {
      return await fn(percobaan);
    } catch (e) {
      if (percobaan >= maxPercobaan) throw e;
      const jeda = jedaAwal * 2 ** (percobaan - 1); // 200, 400, 800, ...
      onGagal?.(percobaan, e, jeda);
      await tunda(jeda);
    }
  }
}

async function latihanRetry() {
  const body = buatKartu("Async 2: Retry + Backoff", "Jeda berlipat ganda tiap percobaan gagal");
  const pre = el("pre", PRE, "Memuat...");
  body.append(pre);

  const log = [];
  const t0 = performance.now();
  const stamp = () => `[${Math.round(performance.now() - t0)} ms]`;
  const onGagal = (n, e, jeda) => {
    log.push(`${stamp()} Percobaan ${n} gagal: ${e.message}. Coba lagi ${jeda} ms lagi`);
    pre.textContent = log.join("\n");
  };

  // Kasus 1: gagal 2 kali, lalu berhasil
  let panggilan = 0;
  const tidakStabil = async () => {
    await tunda(100);
    if (++panggilan < 3) throw new Error("Server sibuk (503)");
    return "Data berhasil diambil";
  };

  log.push("Kasus 1: gagal 2 kali, lalu berhasil");
  try {
    const hasil = await retry(tidakStabil, { onGagal });
    log.push(`${stamp()} Sukses setelah ${panggilan} percobaan: ${hasil}`);
  } catch (e) {
    log.push(`${stamp()} Menyerah: ${e.message}`);
  }

  // Kasus 2: selalu gagal, berhenti di batas percobaan
  log.push("\nKasus 2: selalu gagal, maksimal 3 percobaan");
  try {
    await retry(async () => { await tunda(100); throw new Error("Koneksi putus"); },
                { maxPercobaan: 3, onGagal });
  } catch (e) {
    log.push(`${stamp()} Menyerah: ${e.message}`);
  }
  pre.textContent = log.join("\n");
}

// ----------------------------
// 3. Loading state di UI
// ----------------------------
function latihanLoading() {
  const body = buatKartu("Async 3: Loading State", "Tombol nonaktif + spinner selama proses");
  const btn = el("button", BTN, "Muat Data");
  const status = el("div", "text-sm text-gray-600 flex items-center gap-2");
  const hasil = el("pre", PRE, "Belum ada data.");
  body.append(btn, status, hasil);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    hasil.textContent = "";
    status.replaceChildren(
      el("span", "inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"),
      el("span", "", "Memuat data...")
    );
    try {
      const users = await api.users();
      hasil.textContent = users.map((u) => `${u.id}. ${u.name}`).join("\n");
    } catch (e) {
      hasil.textContent = `Gagal: ${e.message}`;
    } finally {
      status.replaceChildren(); // selalu jalan, sukses maupun gagal
      btn.disabled = false;
    }
  });
}

// ----------------------------
// 4. Error boundary untuk error async
// ----------------------------
const aman = async (fn) => {
  try {
    return { ok: true, data: await fn() };
  } catch (error) {
    return { ok: false, error };
  }
};

const denganTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout setelah ${ms} ms`)), ms))
  ]);

async function latihanErrorBoundary() {
  const body = buatKartu("Async 4: Error Boundary", "Error ditangkap di satu tempat, UI tetap hidup");
  const pre = el("pre", PRE, "Memuat...");
  body.append(pre);

  const kasus = [
    ["Sukses", () => api.users()],
    ["Error 404", async () => { await tunda(100); throw new Error("Endpoint tidak ditemukan (404)"); }],
    ["Terlalu lambat", () => denganTimeout(tunda(2000), 500)]
  ];

  const baris = [];
  for (const [nama, fn] of kasus) {
    const hasil = await aman(fn);
    baris.push(hasil.ok
      ? `${nama}: OK (${hasil.data.length} data)`
      : `${nama}: ${hasil.error.name} - ${hasil.error.message} (tampilkan fallback)`);
  }
  pre.textContent = baris.join("\n") + "\n\nSemua kasus selesai tanpa menghentikan skrip.";
}

// ----------------------------
// 5. Pagination dengan async/await
// ----------------------------
function latihanPagination() {
  const body = buatKartu("Async 5: Pagination", "Satu halaman dimuat tiap klik");
  const daftar = el("ul", "list-disc pl-6 text-sm min-h-[7rem]");
  const nav = el("div", "flex items-center gap-3");
  const prev = el("button", BTN, "Sebelumnya");
  const next = el("button", BTN, "Berikutnya");
  const label = el("span", "text-sm text-gray-600", "Memuat...");
  nav.append(prev, label, next);
  body.append(daftar, nav);

  let page = 1;
  let totalHalaman = 1;
  let sedangMuat = false;

  const aturTombol = () => {
    prev.disabled = sedangMuat || page <= 1;
    next.disabled = sedangMuat || page >= totalHalaman;
  };

  async function muat(target) {
    sedangMuat = true;
    aturTombol();
    label.textContent = "Memuat...";
    try {
      const r = await api.halaman(target);
      page = r.page;
      totalHalaman = r.totalHalaman;
      daftar.replaceChildren(...r.items.map((i) => el("li", "", i.nama)));
      label.textContent = `Halaman ${page} dari ${totalHalaman}`;
    } catch (e) {
      label.textContent = `Gagal: ${e.message}`;
    } finally {
      sedangMuat = false;
      aturTombol();
    }
  }

  prev.addEventListener("click", () => muat(page - 1));
  next.addEventListener("click", () => muat(page + 1));
  muat(1);
}

// ----------------------------
// 6. Debounced search dengan API async
// ----------------------------
const debounce = (fn, ms = 400) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

function latihanDebounce() {
  const body = buatKartu("Async 6: Debounced Search", "Ketik buah (misal: a, me, pi). API dipanggil setelah berhenti mengetik 400 ms");
  const input = el("input", "border border-gray-300 rounded px-3 py-1 text-sm w-full");
  input.placeholder = "Cari buah...";
  const info = el("p", "text-xs text-gray-500", "Ketikan: 0 | Panggilan API: 0");
  const hasil = el("ul", "list-disc pl-6 text-sm min-h-[4rem]");
  body.append(input, info, hasil);

  let ketikan = 0;
  let panggilanApi = 0;
  let idTerakhir = 0;

  const updateInfo = () => { info.textContent = `Ketikan: ${ketikan} | Panggilan API: ${panggilanApi}`; };

  async function cari(q) {
    const id = ++idTerakhir; // penanda permintaan terbaru
    if (!q.trim()) {
      hasil.replaceChildren();
      return;
    }
    panggilanApi++;
    updateInfo();
    hasil.replaceChildren(el("li", "text-gray-400", "Mencari..."));
    try {
      const data = await api.cari(q);
      if (id !== idTerakhir) return; // abaikan respons usang (race condition)
      hasil.replaceChildren(...(data.length
        ? data.map((n) => el("li", "", n))
        : [el("li", "text-gray-400", "Tidak ada hasil")]));
    } catch (e) {
      if (id === idTerakhir) hasil.replaceChildren(el("li", "text-red-500", `Gagal: ${e.message}`));
    }
  }

  const cariDebounced = debounce(cari, 400);
  input.addEventListener("input", () => {
    ketikan++;
    updateInfo();
    cariDebounced(input.value);
  });
}

// ----------------------------
// Titik masuk
// ----------------------------
export function jalankanLatihan5() {
  // Kartu dibuat berurutan (sinkron), isinya terisi sendiri-sendiri (async)
  latihanGabung();
  latihanRetry();
  latihanLoading();
  latihanErrorBoundary();
  latihanPagination();
  latihanDebounce();
}