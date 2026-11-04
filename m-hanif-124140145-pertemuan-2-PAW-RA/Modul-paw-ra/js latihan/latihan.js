// js/latihan.js
export function jalankanLatihan(addOutput, addHtmlOutput) {
  // 1. Ubah nilai const
  let hasil1;
  try {
    const PI = 3.14159;
    PI = 3.15;
  } catch (e) {
    hasil1 = `${e.name}: ${e.message}`;
  }
  addOutput("Latihan 1.1: const", "Mengubah nilai const", hasil1);

  // 2. var di dalam vs luar block
  if (true) {
    var dalamVar = "var bisa dibaca di luar blok";
    let dalamLet = "let hanya hidup di dalam blok";
  }
  addOutput("Latihan 1.2: var vs let", "Scope blok",
`dalamVar: ${dalamVar}
dalamLet: ${typeof dalamLet}`);

  // 3. Berbagai sintaks arrow function
  const tanpaParam = () => "tanpa parameter";
  const satuParam = x => x * 2;
  const duaParam = (a, b) => a + b;
  const blockBody = (a, b) => { const total = a + b; return `Total: ${total}`; };
  const returnObjek = (nama, umur) => ({ nama, umur });
  addOutput("Latihan 1.3: Arrow Function", "Berbagai sintaks",
`${tanpaParam()}
${satuParam(5)}
${duaParam(2, 3)}
${blockBody(4, 6)}
${JSON.stringify(returnObjek("Budi", 20))}`);

  // 4. HTML string dengan template literals
  const buah = ["Apel", "Jeruk", "Mangga"];
  const html = `
    <ul class="list-disc pl-6">
      ${buah.map(b => `<li>${b}</li>`).join("")}
    </ul>`;
  addHtmlOutput("Latihan 1.4: HTML Template", "Template literals + map", html);
}