// 1. DAFTAR PRODUK (PASTIKAN SEMUA PAKAI FORMAT {harga, untung})
// Di sini lo simpan "ingatan" harga modal & untung.
// Kalau mau nambah produk baru, tinggal contek formatnya di sini.
const daftarProduk = {
  XL_3GB_1H: { harga: 7000, untung: 1000 },
  XL_3GB_3H: { harga: 11000, untung: 1000 },
  XL_5GB_10H: { harga: 20000, untung: 2000 },
  XL_7GB_7H: { harga: 24000, untung: 2000 },
  XL_11GB_7H: { harga: 29000, untung: 2000 },
  XL_20GB_7H: { harga: 35000, untung: 2500 },
  AXIS_5GB_1H: { harga: 8000, untung: 1000 },
  AXIS_5GB_2H: { harga: 10000, untung: 1000 },
  "AXIS_3.5GB_3H": { harga: 11000, untung: 1500 },
  AXIS_5GB_3H: { harga: 13000, untung: 1500 },
  AXIS_13GB_3H: { harga: 18000, untung: 2000 },
  AXIS_6GB_5H: { harga: 17000, untung: 2000 },
  AXIS_13GB_5H: { harga: 25000, untung: 2000 },
  AXIS_25GB_5H: { harga: 30000, untung: 2000 },
  AXIS_9GB_15H: { harga: 30000, untung: 2000 },
  AXIS_6GB_30H: { harga: 32000, untung: 2500 },
  SF_4GB_3H: { harga: 11000, untung: 1000 },
  SF_4GB_14H: { harga: 21000, untung: 2000 },
  SF_10GB_6H: { harga: 22000, untung: 2000 },
  SF_21GB_7H: { harga: 32000, untung: 2500 },
  "SF_1GB/H_30H": { harga: 78000, untung: 3000 },
  "SF_2GB/H_30H": { harga: 93000, untung: 4000 },
  IM3_2GB_1H: { harga: 6000, untung: 1000 },
  IM3_5GB_2H: { harga: 11000, untung: 1500 },
  IM3_4GB_5H: { harga: 15000, untung: 2000 },
  IM3_8GB_5H: { harga: 20000, untung: 2000 },
  IM3_11GB_7H: { harga: 25000, untung: 2000 },
  IM3_19GB_7H: { harga: 31000, untung: 2500 },
  IM3_8GB_30H: { harga: 33000, untung: 2500 },
  "TRI_2.5GB_1H": { harga: 8000, untung: 1000 },
  TRI_6GB_2H: { harga: 11000, untung: 1500 },
  TRI_5GB_3H: { harga: 14000, untung: 2000 },
  TRI_10GB_5H: { harga: 23000, untung: 2000 },
  TRI_12GB_7H: { harga: 26000, untung: 2000 },
  TRI_10GB_28H: { harga: 35000, untung: 2500 },
  TSEL_4GB_1H: { harga: 8000, untung: 1000 },
  TSEL_5GB_2H: { harga: 12000, untung: 1000 },
  TSEL_2GB_3H: { harga: 11000, untung: 1500 },
  "TSEL_3.5GB_5H": { harga: 14000, untung: 2000 },
  TSEL_4GB_5H: { harga: 16000, untung: 2000 },
  TSEL_10GB_7H: { harga: 30000, untung: 2000 },
};

// 2. SISTEM MEMORI (LOCAL STORAGE)
// Baris ini tugasnya "manggil ingatan" dari browser pas web dibuka.
// Kalau kosong, dia bikin array baru [].
let riwayatPenjualan =
  JSON.parse(localStorage.getItem("riwayatPenjualan")) || [];

// 3. FITUR SEARCH / AUTOCOMPLETE
function cariProduk() {
  let input = document.getElementById("namaProduk").value.toUpperCase();
  let box = document.getElementById("saranBox");
  box.innerHTML = ""; // Bersihin kotak saran lama

  if (input.length === 0) {
    // Kalau input kosong, kotak saran sembunyi
    box.style.display = "none";
    return;
  }

  // Cek apakah nama yang diketik pas banget sama kunci di kamus
  if (daftarProduk[input]) {
    document.getElementById("nominal").value = daftarProduk[input].harga;
  }

  // Cari nama produk yang mengandung huruf yang diketik (filter)
  let hasilCari = Object.keys(daftarProduk).filter((item) =>
    item.includes(input)
  );

  if (hasilCari.length > 0) {
    box.style.display = "block"; // Munculin kotak kalau ada hasil
    hasilCari.forEach((item) => {
      let div = document.createElement("div");
      div.className = "saran-item";
      div.innerHTML = item.replaceAll("_", " "); // Ubah garis bawah jadi spasi biar enak dibaca

      // Kalau saran diklik, otomatis ngisi kotak input & harga
      div.onclick = function () {
        document.getElementById("namaProduk").value = item;
        document.getElementById("nominal").value = daftarProduk[item].harga;
        box.style.display = "none";
      };
      box.appendChild(div);
    });
  } else {
    box.style.display = "none";
  }
}

// 4. GENERATOR DAFTAR HARGA
function muatDaftarHarga() {
  let produk = document.getElementById("tampilanHarga");
  let listSaran = document.getElementById("saranProduk");
  if (!produk) return; // 'Safety check' biar gak error kalau elemen HTML ilang/gaada

  produk.innerHTML = "";
  for (let key in daftarProduk) {
    let namaBersih = key.replaceAll("_", " ");
    // Gunakan optional chaining (?.) biar aman kalau datanya undefined
    let harga = daftarProduk[key]?.harga || 0;

    // Gambar daftar harga ke layar
    produk.innerHTML += `<div class="item">${namaBersih}: Rp${harga.toLocaleString(
      "id-ID"
    )}</div>`;

    // Masukin juga ke list dropdown/jatuh ke bawah (datalist)
    if (listSaran) {
      listSaran.innerHTML += `<option value="${key}">${namaBersih}</option>`;
    }
  }
}

// 5. PENCATAT & PENGHITUNG CUAN (RIWAYAT)
function tampilkanRiwayat() {
  let wadah = document.getElementById("riwayatTransaksi");
  if (!wadah) return;

  let untungSeharian = 0; // Tabungan profit yang bakal terus nambah di loop
  let html = `<tr><th>Waktu</th><th>Produk</th><th>Total</th><th>Profit</th><th>Aksi</th></tr>`;

  riwayatPenjualan.forEach((item, index) => {
    // Pastikan nilai-nilainya ada, kalau gak ada kasih 0 biar gak error toLocaleString
    let total = item.total || 0;
    let untung = item.untung || 0;
    untungSeharian += untung; // Setiap baris, untung ditambahin ke total profit

    // Susun baris tabel satu demi satu
    html += `
      <tr>
        <td>${item.jamMenit}</td>
        <td>${(item.nama || "").replaceAll("_", " ")}</td>
        <td>Rp${total.toLocaleString("id-ID")}</td>
        <td>Rp${untung.toLocaleString("id-ID")}</td>
        <td><button class="btn-hapus" onclick="hapusSatu(${index})">Hapus</button></td>
      </tr>`;
  });

  wadah.innerHTML = html; // Tempel semua baris ke tabel sekaligus

  // Update tampilan kartu Total Profit di bawah
  let totalCuanElemen = document.getElementById("totalCuan");
  let warna = untungSeharian > 5000 ? "green" : "orange";
  if (totalCuanElemen) {
    totalCuanElemen.innerHTML = `<div class="profit-card" style="border-left: 10px solid ${warna}">Total Profit: Rp${untungSeharian.toLocaleString(
      "id-ID"
    )}</div>`;
  }
  simpanData(); // Setiap ada perubahan, langsung kunci ke memori
}

// 5. FUNGSI TAMBAH TRANSAKSI
function tambahTransaksi() {
  let nama = document.getElementById("namaProduk").value.toUpperCase();
  let nominal = parseInt(document.getElementById("nominal").value) || 0; // ParseInt ubah teks jadi angka
  let admin = parseInt(document.getElementById("admin").value) || 0;
  let struk = document.getElementById("struk");

  if (nama === "" || nominal <= 0) {
    alert("Isi Data Lengkap!");
    return;
  }

  // CEK KAMUS: Kalau ada di daftarProduk pakai untung otomatis, kalau nggak ada pakai manual (admin)
  let infoKamus = daftarProduk[nama];
  let untungAkhir = infoKamus ? infoKamus.untung : admin;
  let total = nominal + admin;

  // AMBIL WAKTU: Menit dipadStart biar gak muncul "5:9" tapi "05:09"
  let waktuSekarang = new Date();
  let jamMenit = `${waktuSekarang
    .getHours()
    .toString()
    .padStart(2, "0")}:${waktuSekarang
    .getMinutes()
    .toString() // toString memaksa angka menjadi string/text
    .padStart(2, "0")}`;

  // Masukin data ke 'Keranjang' riwayat
  riwayatPenjualan.push({
    jamMenit,
    nama,
    nominal,
    admin,
    total,
    untung: untungAkhir,
  });

  tampilkanRiwayat();

  // Reset Input
  document.getElementById("namaProduk").value = "";
  document.getElementById("nominal").value = "";
  document.getElementById("admin").value = "";
  if (struk) {
    struk.style.display = "block";
    struk.innerHTML = `Berhasil! Total: Rp${total.toLocaleString("id-ID")}`;
  }

  // Bikin kursor otomatis balik ke kotak Nama Produk
  document.getElementById("namaProduk").focus();
}

// 7. FUNGSI PENGELOLA DATA (SIMPAN & HAPUS)
function simpanData() {
  localStorage.setItem("riwayatPenjualan", JSON.stringify(riwayatPenjualan));
}

function hapusSatu(index) {
  if (confirm("Yakin Mau Dihapus?")) {
    riwayatPenjualan.splice(index, 1); // Buang 1 data berdasarkan urutannya
    tampilkanRiwayat();
  }
}

// 8. FUNGSI RESET DATA
function resetData() {
  let yakin = confirm(
    `Yakin mau 'Buka Buku Baru'? Semua riwayat penjualan hari ini akan DIHAPUS PERMANEN.`
  );

  if (yakin) {
    localStorage.removeItem("riwayatPenjualan"); // Hapus memori di browser
    riwayatPenjualan = []; // Kosongkan variabel di kodingan
    tampilkanRiwayat(); // Update tampilan (jadi kosong)
    alert(`Buku berhasil dibersihkan! Selamat berjualan di lembaran baru. 🚀`);
  }
}

// 9. FUNGSI SALIN LAPORAN
function salinLaporan() {
  // 1. CEK KETERSEDIAAN DATA
  // Jika riwayat kosong (length === 0), stop fungsi di sini.
  // Biar kita gak nyalin laporan kosong yang isinya cuma garis-garis doang.
  if (riwayatPenjualan.length === 0) {
    alert("Belum ada penjualan, Bro!");
    return;
  }

  // 2. INISIALISASI HEADER (KEPALA LAPORAN)
  // \n adalah karakter khusus untuk 'Enter' atau baris baru.
  // Tanda bintang (*) di awal & akhir kata bikin teks jadi TEBAL di WhatsApp.
  let teks = "*LAPORAN PENJUALAN HARI INI*\n";
  teks += "--------------------------\n";

  let totalUntung = 0; // Wadah untuk menampung total cuan sambil kita ngitung

  // 3. PROSES PENYUSUNAN DAFTAR TRANSAKSI
  // Kita looping (putar) semua data yang ada di array riwayatPenjualan.
  riwayatPenjualan.forEach((item) => {
    // Ubah format nama dari "XL_3GB" jadi "XL 3GB" biar enak dibaca pembeli.
    let namaBersih = item.nama.replaceAll("_", " ");

    // Susun baris per baris: JAM | NAMA PRODUK | HARGA TOTAL
    teks += `${item.jamMenit} | ${namaBersih} | Rp${item.total.toLocaleString(
      "id-ID"
    )}\n`;

    // Tambahin untung tiap item ke variabel totalUntung.
    totalUntung += item.untung || 0;
  });

  // 4. PENYUSUNAN FOOTER (KAKI LAPORAN)
  teks += "--------------------------\n";
  teks += `*TOTAL UNTUNG: Rp${totalUntung.toLocaleString("id-ID")}*`;

  // Tambahan bumbu biar laporannya kelihatan pro (tanda miring pakai underscore _)
  teks += `\n\n_Dicatat otomatis oleh Sistem Kasir Hunter_ 🕶️`;

  // 5. PROSES COPY KE CLIPBOARD (INTI DARI SEMUANYA)
  // Navigator adalah objek bawaan browser untuk akses fitur hardware/sistem.
  // writeText(teks) bakal 'menempelkan' variabel teks kita ke memori Copy-Paste.
  navigator.clipboard
    .writeText(teks)
    .then(() => {
      // Bagian .then() akan jalan KALO proses salin berhasil.
      alert("Laporan berhasil disalin! Tinggal paste di WA.");
    })
    .catch((err) => {
      // Bagian .catch() jaga-jaga kalau browser lama gak support fitur ini.
      console.error("Gagal nyalin laporan: ", err);
      alert("Waduh, browser lo gak kasih izin buat nyalin otomatis.");
    });
}

// 8. STARTER (JALAN OTOMATIS SAAT WEB DIBUKA)
muatDaftarHarga();
tampilkanRiwayat();
