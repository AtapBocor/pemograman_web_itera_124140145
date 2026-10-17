// js/latihan2.js
export function jalankanLatihan2(addOutput) {
  // Latihan 1: destructuring objek bersarang 4 level
  const company = {
    name: "TechCorp",
    location: {
      country: "Indonesia",
      city: {
        name: "Bandar Lampung",
        district: { name: "Kedaton", zip: "35141" }
      }
    }
  };

  const {
    location: {
      country,
      city: {
        name: cityName,
        district: { name: districtName, zip }
      }
    }
  } = company;

  addOutput("Latihan 2.1: Nested Destructuring", "4 level properti",
`Negara: ${country}
Kota: ${cityName}
Kecamatan: ${districtName}
Kode pos: ${zip}`);

  // Latihan 2: rest parameters + statistik
  const statistik = (...angka) => {
    if (angka.length === 0) return null;
    return {
      min: Math.min(...angka),
      max: Math.max(...angka),
      average: angka.reduce((total, n) => total + n, 0) / angka.length
    };
  };

  addOutput("Latihan 2.2: Rest Parameters", "min, max, average",
`statistik(4, 8, 15, 16, 23, 42)
${JSON.stringify(statistik(4, 8, 15, 16, 23, 42))}`);

  // Latihan 3: merge 3 objek dengan spread, lalu override
  const defaults = { theme: "light", lang: "id", fontSize: 14 };
  const userPrefs = { theme: "dark", fontSize: 16 };
  const session = { fontSize: 18, token: "abc123" };

  const merged = { ...defaults, ...userPrefs, ...session, lang: "en" };

  addOutput("Latihan 2.3: Merge Objek", "Properti belakangan menimpa yang depan",
`defaults:  ${JSON.stringify(defaults)}
userPrefs: ${JSON.stringify(userPrefs)}
session:   ${JSON.stringify(session)}
merged:    ${JSON.stringify(merged)}`);

  // Latihan 4: destructuring di dalam for...of
  const users = [
    { id: 1, name: "Budi", address: { city: "Lampung" }, skills: ["JS", "CSS"] },
    { id: 2, name: "Sari", address: { city: "Jakarta" }, skills: ["Python", "SQL"] },
    { id: 3, name: "Andi", address: { city: "Bandung" }, skills: ["Java", "Go"] }
  ];

  const baris = [];
  for (const { id, name, address: { city }, skills: [skillUtama] } of users) {
    baris.push(`#${id} ${name} - ${city} - skill utama: ${skillUtama}`);
  }

  // Bonus: Object.entries + destructuring [key, value]
  for (const [key, value] of Object.entries(defaults)) {
    baris.push(`defaults.${key} = ${value}`);
  }

  addOutput("Latihan 2.4: Destructuring di for...of", "Objek, array, dan entries",
    baris.join("\n"));
}