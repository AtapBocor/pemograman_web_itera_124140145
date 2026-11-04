// js/latihan4.js

const rupiah = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(n);

// ----------------------------
// groupBy memakai reduce
// ----------------------------
// keyOrFn bisa berupa nama properti ("kategori") atau fungsi (item => ...)
const groupBy = (array, keyOrFn) =>
  array.reduce((acc, item) => {
    const key = typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];
    (acc[key] ||= []).push(item); // ubah acc yang sama, tidak menyalin ulang
    return acc;
  }, {});

// ----------------------------
// Rata-rata dari array of objects
// ----------------------------
const rataRata = (array, key) =>
  array.length === 0
    ? 0
    : array.reduce((total, item) => total + item[key], 0) / array.length;

export function jalankanLatihan4(addOutput) {
  const produk = [
    { nama: "Laptop", kategori: "tech", harga: 15000000 },
    { nama: "Keyboard", kategori: "tech", harga: 850000 },
    { nama: "Kursi", kategori: "furniture", harga: 2200000 },
    { nama: "Meja", kategori: "furniture", harga: 1800000 },
    { nama: "Buku", kategori: "buku", harga: 90000 }
  ];

  // Latihan A: groupBy
  const perKategori = groupBy(produk, "kategori");
  const perMahal = groupBy(produk, p => (p.harga >= 1000000 ? "mahal" : "murah"));

  const namaPerGrup = (grup) =>
    Object.entries(grup)
      .map(([k, items]) => `${k}: ${items.map(i => i.nama).join(", ")}`)
      .join("\n");

  addOutput("Latihan Array 4.1: groupBy", "Dikelompokkan dengan reduce",
`Berdasarkan kategori:
${namaPerGrup(perKategori)}

Berdasarkan fungsi (harga >= 1 juta):
${namaPerGrup(perMahal)}`);

  // Latihan B: rata-rata array of objects
  const siswa = [
    { nama: "Budi", nilai: 80 },
    { nama: "Sari", nilai: 90 },
    { nama: "Andi", nilai: 70 }
  ];

  const rataPerKategori = Object.entries(perKategori)
    .map(([k, items]) => `${k}: ${rupiah(rataRata(items, "harga"))}`)
    .join("\n");

  addOutput("Latihan Array 4.2 Rata-rata", "Array of objects, per properti dan per grup",
`Rata-rata nilai siswa: ${rataRata(siswa, "nilai")}
Array kosong: ${rataRata([], "nilai")}

Rata-rata harga per kategori:
${rataPerKategori}`);

  // Latihan C: struktur bersarang menjadi flat
  const perusahaan = [
    {
      divisi: "Engineering",
      tim: [
        { nama: "Frontend", anggota: ["Budi", "Sari"] },
        { nama: "Backend", anggota: ["Andi"] }
      ]
    },
    {
      divisi: "Design",
      tim: [{ nama: "UI", anggota: ["Dewi", "Rina"] }]
    }
  ];

  const flat = perusahaan.flatMap(d =>
    d.tim.flatMap(t =>
      t.anggota.map(nama => ({ divisi: d.divisi, tim: t.nama, nama }))
    )
  );

  addOutput("Latihan Array 4.3: Flatten", "Bersarang 3 level menjadi 1 level",
`${flat.map(r => `${r.divisi} / ${r.tim} / ${r.nama}`).join("\n")}
Jumlah baris: ${flat.length}
flat(Infinity): ${JSON.stringify([1, [2, [3, [4]]]].flat(Infinity))}`);

  // Latihan D: filter + map + reduce
  const pesanan = [
    { id: 1, pelanggan: "Budi", status: "selesai", item: "Laptop", qty: 1, harga: 15000000 },
    { id: 2, pelanggan: "Sari", status: "selesai", item: "Keyboard", qty: 2, harga: 850000 },
    { id: 3, pelanggan: "Budi", status: "batal", item: "Kursi", qty: 1, harga: 2200000 },
    { id: 4, pelanggan: "Andi", status: "selesai", item: "Buku", qty: 5, harga: 90000 },
    { id: 5, pelanggan: "Sari", status: "selesai", item: "Meja", qty: 1, harga: 1800000 }
  ];

  const totalPerPelanggan = pesanan
    .filter(p => p.status === "selesai")              // buang pesanan batal
    .map(p => ({ ...p, total: p.qty * p.harga }))     // hitung total per baris
    .reduce((acc, p) => {                             // jumlahkan per pelanggan
      acc[p.pelanggan] = (acc[p.pelanggan] ?? 0) + p.total;
      return acc;
    }, {});

  const urut = Object.entries(totalPerPelanggan).sort((a, b) => b[1] - a[1]);
  const omzet = urut.reduce((t, [, nilai]) => t + nilai, 0);

  addOutput("Latihan Array 4.4: Analisis Data", "filter -> map -> reduce",
`${urut.map(([nama, total], i) => `${i + 1}. ${nama}: ${rupiah(total)}`).join("\n")}
Total omzet: ${rupiah(omzet)}
Pelanggan teratas: ${urut[0][0]}`);
}