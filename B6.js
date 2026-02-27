//KIta bikin daftar produknya dulu dalam bentuk variabel object
const daftarProduk = {
  // === VOUCHER XL ===
  XL_3GB_1H: 7000,
  XL_3GB_3H: 10000,
  XL_5GB_10H: 20000,
  XL_7GB_7H: 24000,
  XL_11GB_7H: 29000,
  XL_20GB_7H: 35000,

  // === VOUCHER AXIS ===
  AXIS_4GB_1H: 7000,
  AXIS_5GB_2H: 10000,
  "AXIS_2.5GB_3H": 11000,
  AXIS_5GB_3H: 13000,
  AXIS_12GB_3H: 18000,
  AXIS_6GB_5H: 17000,
  AXIS_13GB_5H: 23000,
  AXIS_25GB_5H: 28000,
  AXIS_8GB_15H: 30000,
  AXIS_6GB_30H: 32000,

  // === VOUCHER SMARTFREN ===
  SMART_4GB_3H: 11000,
  SMART_4GB_14H: 20000,
  SMART_14GB_7H: 30000,
  SMART_6GB_30H: 40000,
  "SMART_1GB/H_30H": 78000,
  "SMART_2GB/H_30H": 93000,

  // === VOUCHER IM3 ===
  IM3_2GB_1H: 6000,
  IM3_5GB_2H: 10000,
  IM3_4GB_5H: 15000,
  IM3_8GB_5H: 20000,
  IM3_11GB_7H: 25000,
  IM3_19GB_7H: 31000,
  IM3_8GB_30H: 33000,

  // === VOUCHER THREE (3) ===
  "TRI_2.5GB_1H": 7000,
  TRI_6GB_2H: 10000,
  TRI_5GB_3H: 13000,
  TRI_10GB_5H: 23000,
  TRI_12GB_7H: 26000,
  TRI_10GB_28H: 35000,

  // === VOUCHER TELKOMSEL ===
  TSEL_4GB_1H: 7000,
  TSEL_5GB_2H: 10000,
  TSEL_2GB_3H: 11000,
  "TSEL_3.5GB_5H": 14000,
  TSEL_4GB_5H: 16000,
  TSEL_10GB_7H: 30000,

  // === MINUMAN ===
  GOLDA: 5000,
  KOPIABC: 5000,
  AIRMINERAL: 4000,
  NIPISMADU: 5000,
  PUCUK: 4000,
  TEBS: 5000,
  FLORIDINA: 4000,

  // === KABEL DATA ===
  TYPE_C_15K: 15000,
  TYPE_C_20K: 20000,
  TYPE_MICRO_15K: 15000,
  TYPE_MICRO_20K: 20000,
  TYPE_IPHONE_20K: 20000,

  // === EARPHONE ===
  EARPHONE_15K: 15000,
  EARPHONE_20K: 20000,
  EARPHONE_25K: 25000,
  EARPHONE_30K: 30000,
};

//kita bikin variabel perintah agar data webnya tidak hilng waktu direfresh
let riwayatPenjualan =
  JSON.parse(localStorage.getItem("riwayatPenjualan")) || [];

//kita bikin fungsi untuk menampilkan harga otomatis dan list harga ketika menginput nama produk
function cekHarga() {
  let inputNama = document.getElementById("namaProduk"); //ini mengarah ke html input
  let nama = inputNama.value.toUpperCase(); //hasil dari inputan dan kata2nya dibikin kapital
  let hargaOtomatis = daftarProduk[nama]; //alurnya itu, setelah menginput, muncul otomatis harganya. [] itu artinya buka laci dari daftar produk dan input yang dimasukkan

  //logika jika nama produk sdh diinput dan harganya otomatis muncul, dan sebaliknya, jika nama tidak diinput atau tidak ada didaftar produk, harga otomatis tidak ada
  if (hargaOtomatis) {
    document.getElementById("nominal").value = hargaOtomatis;
  }
}

//kita bikin fungsi untuk tombol cetak struk sekalian alert jika input kosong
function tambahTransaksi() {
  let inputNama = document.getElementById("namaProduk");
  let nama = inputNama.value.toUpperCase();
  let inputNominal = document.getElementById("nominal"); // mengarah ke input html
  let inputAdmin = document.getElementById("admin");
  let nominal = parseInt(inputNominal.value) || 0; //dibikin parseint supaya hasil inputannya ga berubah jadi text, ttp pure angka. apa itu || 0, itu adalah pembatas, takutnya hasil inputannya kosong, jadinya ga keluar hasilnya
  let admin = parseInt(inputAdmin.value) || 0;
  let struk = document.getElementById("struk");

  //kita bikin logika jika kosong kasih alert, dan jika ada kita total, masukin ke object dan masukin ke array sekaligus nampilin struk
  if (nama === "" || nominal <= 0 || admin <= 0) {
    alert(`Isi Data Lengkapnya!`);
  } else {
    let total = nominal + admin;
    let dataTransaksi = { nama, nominal, admin, total };
    riwayatPenjualan.push(dataTransaksi);
    tampilkanRiwayat();
    inputNama.value = "";
    inputNominal.value = "";
    inputAdmin.value = "";
    struk.innerHTML = `Total Bayar = Rp${total.toLocaleString("id-ID")}`;
    // Di dalem 'else' fungsi tambahTransaksi:
    struk.style.display = "block"; // Tambahin ini biar box hijaunya muncul
    struk.innerHTML = `✅ Berhasil! Total Bayar = Rp${total.toLocaleString(
      "id-ID"
    )}`;
  }

  console.log(`Berhasil!`);
  console.log(riwayatPenjualan);
}

//kita bikin fungsi buat nampilin riwayat transaksi di web
function tampilkanRiwayat() {
  let wadah = document.getElementById("riwayatTransaksi");
  let untungSeharian = 0;

  // 1. Kita rakit dulu SEMUA isinya di dalam variabel 'html'
  let html = `
    <h3>Daftar Transaksi:</h3>
    <table border="1" style="width:100%; border-collapse: collapse; min-width: 400px;">
      <tr style="background-color: #3498db; color: white;">
        <th style="padding: 10px;">Produk</th>
        <th style="padding: 10px;">Total</th>
        <th style="padding: 10px;">Profit</th>
        <th style="padding: 10px;">Aksi</th>
      </tr>
  `;

  riwayatPenjualan.forEach((item, index) => {
    untungSeharian += item.admin;
    html += `
      <tr style="text-align: center; border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">${item.nama.replaceAll("_", " ")}</td>
        <td style="padding: 8px;">Rp${item.total.toLocaleString("id-ID")}</td>
        <td style="padding: 8px;">Rp${item.admin.toLocaleString("id-ID")}</td>
        <td style="padding: 8px;">
        <button class="btn-hapus" onclick="hapusSatu(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });

  html += `</table>`; // Tutup tabelnya

  // 2. BARU DEH, kita masukin sekaligus ke wadah (biar nggak numpuk)
  wadah.innerHTML = html;

  // 3. Update total profit
  document.getElementById("totalCuan").innerHTML = `
  <div class="profit-card">
    Total Profit Seharian: Rp${untungSeharian.toLocaleString("id-ID")}
  </div>
`;

  simpanData();
}

//kita membuat fungsi utnuk menampilan daftar harga
function muatDaftarHarga() {
  let produk = document.getElementById("tampilanHarga");
  let listSaran = document.getElementById("saranProduk");

  for (let namaProduk in daftarProduk) {
    let hargaBarang = daftarProduk[namaProduk];
    let namaBersih = namaProduk.replaceAll("_", " ");

    produk.innerHTML += `<div class="item">${namaBersih}: Rp${hargaBarang.toLocaleString(
      "id-ID"
    )}</div>`;
    listSaran.innerHTML += `<option value="${namaProduk}">${namaBersih}</option>`;
  }
}

//kita bikin fungsi untuk mereset datanya
function resetData() {
  riwayatPenjualan = [];
  tampilkanRiwayat();
}

//kita bikin fungsi untuk menyimpan datanya ke web agar tidak hilang
function simpanData() {
  let dataText = JSON.stringify(riwayatPenjualan);
  localStorage.setItem("riwayatPenjualan", dataText);
}

//kita buat fungsi untuk menghapus salah satu transaksi jika diperlukan nanti
function hapusSatu(index) {
  riwayatPenjualan.splice(index, 1);
  tampilkanRiwayat();
}

muatDaftarHarga();
tampilkanRiwayat();
