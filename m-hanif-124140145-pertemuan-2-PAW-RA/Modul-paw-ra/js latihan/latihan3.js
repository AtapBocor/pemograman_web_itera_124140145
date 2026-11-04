// js/latihan3.js

// ----------------------------
// Class, inheritance, getter & setter
// ----------------------------
const rupiah = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(n);

class Product {
  #price; // private field, hanya bisa diakses lewat getter/setter

  constructor(name, price) {
    this.name = name;
    this.price = price; // lewat setter, jadi ikut divalidasi
  }

  get price() {
    return this.#price;
  }

  set price(value) {
    if (typeof value !== "number" || value < 0) {
      throw new RangeError("Harga harus berupa angka >= 0");
    }
    this.#price = value;
  }

  get formattedPrice() {
    return rupiah(this.#price);
  }

  get priceWithTax() {
    return this.#price * 1.11; // PPN 11%
  }

  describe() {
    return `${this.name} - ${this.formattedPrice}`;
  }
}

class DigitalProduct extends Product {
  constructor(name, price, fileSizeMB) {
    super(name, price);
    this.fileSizeMB = fileSizeMB;
  }

  describe() {
    return `${super.describe()} (digital, ${this.fileSizeMB} MB)`;
  }
}

class PhysicalProduct extends Product {
  constructor(name, price, weightKg) {
    super(name, price);
    this.weightKg = weightKg;
  }

  get shippingCost() {
    return Math.ceil(this.weightKg) * 10000;
  }

  describe() {
    return `${super.describe()} (fisik, ${this.weightKg} kg, ongkir ${rupiah(this.shippingCost)})`;
  }
}

// ----------------------------
// Default parameters + destructuring
// ----------------------------
function buatPesanan(
  { produk = "Tanpa nama", jumlah = 1, kirim: { kurir = "JNE", cepat = false } = {} } = {},
  catatan = "-"
) {
  return `Produk: ${produk}, Jumlah: ${jumlah}, Kurir: ${kurir}, Cepat: ${cepat}, Catatan: ${catatan}`;
}

export function jalankanLatihan3(addOutput) {
  // Latihan 1: inheritance
  const digital = new DigitalProduct("E-Book JavaScript", 85000, 5);
  const fisik = new PhysicalProduct("Kursi Ergonomis", 2200000, 7.5);

  addOutput("Latihan 3.1: Class & Inheritance", "Product, DigitalProduct, PhysicalProduct",
`${digital.describe()}
${fisik.describe()}
digital instanceof Product: ${digital instanceof Product}
fisik instanceof DigitalProduct: ${fisik instanceof DigitalProduct}`);

  // Latihan 2: getter dan setter
  const produk = new Product("Mouse", 150000);
  produk.price = 100000; // memanggil setter
  let pesanError;
  try {
    produk.price = -5;
  } catch (e) {
    pesanError = `${e.name}: ${e.message}`;
  }

  addOutput("Latihan 3.2: Getter & Setter", "Validasi di setter, nilai turunan di getter",
`price (getter): ${produk.price}
formattedPrice: ${produk.formattedPrice}
priceWithTax: ${produk.priceWithTax}
Set harga -5: ${pesanError}
price setelah gagal: ${produk.price}`);

  // Latihan 3: computed property names
  const prefix = "produk";
  const items = ["laptop", "mouse", "keyboard"];
  const dinamis = {};
  items.forEach((item, i) => {
    dinamis[`${prefix}_${i + 1}`] = item;
  });

  const kunci = "stok";
  const gudang = {
    [kunci]: 10,
    [`${kunci}Minimum`]: 2,
    [`is${"Aktif"}`]: true
  };

  addOutput("Latihan 3.3: Computed Property Names", "Key objek dibuat dari ekspresi",
`Dari loop: ${JSON.stringify(dinamis)}
Dari literal: ${JSON.stringify(gudang)}`);

  // Latihan 4: default parameters + destructuring
  addOutput("Latihan 3.4: Default Param + Destructuring", "Parameter objek dengan nilai bawaan",
`${buatPesanan()}
${buatPesanan({ produk: "Mouse", jumlah: 2 })}
${buatPesanan({ produk: "Kursi", kirim: { cepat: true } }, "Hati-hati")}`);
}