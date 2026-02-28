const daftarProduk = {
  XL_3GB_1H: 7000,
  XL_3GB_3H: 10000,
  XL_5GB_10H: 20000,
  XL_7GB_7H: 24000,
  XL_11GB_7H: 29000,
  XL_20GB_7H: 35000,
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
  SMART_4GB_3H: 11000,
  SMART_4GB_14H: 20000,
  SMART_14GB_7H: 30000,
  SMART_6GB_30H: 40000,
  "SMART_1GB/H_30H": 78000,
  "SMART_2GB/H_30H": 93000,
  IM3_2GB_1H: 6000,
  IM3_5GB_2H: 10000,
  IM3_4GB_5H: 15000,
  IM3_8GB_5H: 20000,
  IM3_11GB_7H: 25000,
  IM3_19GB_7H: 31000,
  IM3_8GB_30H: 33000,
  "TRI_2.5GB_1H": 7000,
  TRI_6GB_2H: 10000,
  TRI_5GB_3H: 13000,
  TRI_10GB_5H: 23000,
  TRI_12GB_7H: 26000,
  TRI_10GB_28H: 35000,
  TSEL_4GB_1H: 7000,
  TSEL_5GB_2H: 10000,
  TSEL_2GB_3H: 11000,
  "TSEL_3.5GB_5H": 14000,
  TSEL_4GB_5H: 16000,
  TSEL_10GB_7H: 30000,
  GOLDA: 5000,
  KOPIABC: 5000,
  AIRMINERAL: 4000,
  NIPISMADU: 5000,
  PUCUK: 4000,
  TEBS: 5000,
  FLORIDINA: 4000,
  TYPE_C_15K: 15000,
  TYPE_C_20K: 20000,
  TYPE_MICRO_15K: 15000,
  TYPE_MICRO_20K: 20000,
  TYPE_IPHONE_20K: 20000,
  EARPHONE_15K: 15000,
  EARPHONE_20K: 20000,
  EARPHONE_25K: 25000,
  EARPHONE_30K: 30000,
};

//kita bikin variabel untuk nyimpen data/memori
let riwayatPenjualan =
  //json.parse itu ngubah text/string polosan menjadi menjadi sedia kala(punya kita kan objek dan bisa bergerak).
  //localstorage.getitem itu kita ngambil data dari label riwayatpenjualan, misalnya kyk xl 3gb 3h
  // || [] itu artinya kalau gk ada. maksudnya kalau lemari kosong, kita mulai dari daftar kosong. kalo gaada tanda itu mlh error karena komputer bakal nyari data yang gaada.
  // intinya, tanpa variabel ini tiap refresh web, semua data bakal hilang/ikut kehapus
  JSON.parse(localStorage.getItem("riwayatPenjualan")) || [];

//kita bikin fungsi untuk fitur search box(input saran) yang dimana kalo kita input nama dan ketik beberapa huruf, langsung muncul kotak saran produknya di bawah
//ada 3 alasan knp fungsi ini dibuat: 1. untuk mengubah semua huruf menjadi kapital menyesuaikan daftar produk di atas
//2. untuk filter/nyaring, misal kita ngetik xl, maka muncul produk saran seperti xl 3gb 3h
//3. bikin kotak sarannya yang gaib, dan bakal muncul ketika menginput produk
function cariProduk() {
  //variabel ini mengarah ke kotak input nama produk, dan kita buat semua kata2nya kapital
  //tapi variabel ini cuma buat mengarahkan ke input dan membaca apa yang kita input
  let input = document.getElementById("namaProduk").value.toUpperCase();
  //nah ini variabel yang mengarah ke saran produknya
  let box = document.getElementById("saranBox");
  //ini ceritanya kita mengosongkan si saran produknya sembari nunggu muncul ketika ada yg menginput
  box.innerHTML = "";

  //kita bikin logika jika tidak ada yang menginput, brrti box saran tidak muncul
  //input.length === 0 itu artinya panjang huruf yang diinput sama dengan 0
  if (input.length === 0) {
    //jika panjang huruf sama dengon 0, maka tampilan/display dari boxnya tidak ada. artinya tidak ada yang diinput
    box.style.display = "none";
    //return dikoding artinya stop disini, kalo gaada return ini, dia bakal nabrak kodingan dibawah, bikin error
    return;
  }

  //kita bikin variabel pencari kata ke daftar produk dari apa yang kita input
  //object keys itu nyari label di daftar produk, misalnya kyk golda: 5000, dia ambil labelnya aja yaitu si golda
  //filter item ini semacam corong saringan, diangumpulin item2 tadi satu2, dan memfilter yang dimaksud
  let hasilCari = Object.keys(daftarProduk).filter((item) =>
    //nah ini hasilnya, dia memfilter item yang include dari yang kita input misalnya xl, semua item dari xl bakal muncul
    item.includes(input)
  );

  //kita bikin logika jika jumlah dari box saran itu lebih dari 0
  if (hasilCari.length > 0) {
    //maka memunculkan box sarannya
    box.style.display = "block";
    //foreach item itu artinya untuk setiap item dari hasil cari
    //knp menggunakan foreach? karena untuk memanggil semua item hasil input yang sudah difilter oleh hasilcari untuk melakukan sesuatu
    hasilCari.forEach((item) => {
      //kita bikin variabel untuk memunculkan box saran itu secara gaib di js, tanpa perlu html
      //createelement itu membuat sesuatu dari nol, dan yang ingin dibuat adalah div, div itu semacam baris baru dan lebih professional ketimbang pakai br
      //div kan pakai html, knp pakai js? karena kita gatau berapa banyak saran yang akan muncul, jika 5 maka perlu 5 div. dengan createelement, js bakal bikin div sesuai kebutuhan saat itu juga
      let div = document.createElement("div");
      //perintah ini dibuat untuk menyambungkan div tadi dengan css
      div.className = "saran-item";
      //perintah ini dibuat untuk menampilkan hasilnya(si item/isi box saran) di web tanpa underscore trus dikasih spasi
      div.innerHTML = item.replaceAll("_", " ");
      //ini adalah event handler assignment, perintah ini dibuat agar item/div tadi masing2 bisa diklik dan masuk ke input. dan tidak akan aktif kecuali terdeteksi sentuhan klik pada div tersebut
      div.onclick = function () {
        //misal kita input xl, maka kodingan ini akan memunculkan box saran seperti xl 3g 3h dan yang lainnya
        document.getElementById("namaProduk").value = item;
        //ini harganya langsung otomatis
        document.getElementById("nominal").value = daftarProduk[item];
        //dan setelah diklik, box saran menghilng
        box.style.display = "none";
      };
      //dan setelah semuanya sudah diatur(semua diatas itu adalah rumus), maka kodingan ini lh yg memunculkan hasil akhirnya
      //box adalah box saran, appendchild adalah dom(document object model), elemen2 web disusun/dibuat seperti pohon yang memiliki hubungan orang tua(parent) dan anak(child)
      //menempelkan(append)/menampilkan child/anak
      box.appendChild(div);
    });
  } else {
    box.style.display = "none";
  }
}

// Tambahin ini biar kalau klik di luar, kotak sarannya ilang
// document itu seluruh halaman web, addEventListener itu kayak masang kuping/sensor
// 'click' artinya dia dengerin kalau ada yang nge-klik apa pun di layar
document.addEventListener("click", function (e) {
  // if (e.target.id !== "namaProduk") artinya: kalau yang diklik BUKAN kotak input nama
  if (e.target.id !== "namaProduk") {
    // maka laci saran kita tutup (display: none), biar gak nyampah di layar
    document.getElementById("saranBox").style.display = "none";
  }
});

//kita bikin fungsi untuk menambahkan transaksi
function tambahTransaksi() {
  // Ambil data-data dari inputan HTML (Nama, Harga Asli, dan Admin)
  let nama = document.getElementById("namaProduk").value.toUpperCase();
  // parseInt itu paksa jadi angka, || 0 itu jaga-jaga kalau kosong biar gak error (dianggap nol)
  let nominal = parseInt(document.getElementById("nominal").value) || 0;
  let admin = parseInt(document.getElementById("admin").value) || 0;
  let struk = document.getElementById("struk");

  // Logika validasi: kalau ada yang kosong atau nol, kasih peringatan (alert)
  if (nama === "" || nominal <= 0 || admin <= 0) {
    alert("Isi Data Lengkap!");
  } else {
    // Rumus total: harga produk ditambah biaya admin
    let total = nominal + admin;
    // Push itu masukin data baru ke keranjang riwayatPenjualan (formatnya objek)
    riwayatPenjualan.push({ nama, nominal, admin, total });
    // Panggil fungsi buat nampilin daftar yang baru di layar
    tampilkanRiwayat();

    // Reset/kosongin lagi kotak inputnya biar siap buat transaksi berikutnya
    document.getElementById("namaProduk").value = "";
    document.getElementById("nominal").value = "";
    document.getElementById("admin").value = "";

    // Munculin notif berhasil di bawah tombol
    struk.style.display = "block";
    struk.innerHTML = `✅ Berhasil! Total: Rp${total.toLocaleString("id-ID")}`;
  }
}

//kita bikin fungsi untuk menampilkan hasil menjadi riwayat transaksi dan tidak hilng ketika direfresh
function tampilkanRiwayat() {
  let wadah = document.getElementById("riwayatTransaksi");
  let untungSeharian = 0;

  // Kita bikin kepala tabelnya dulu pake template string (backtick)
  let html = `
    <tr>
      <th>Produk</th>
      <th>Total</th>
      <th>Profit</th>
      <th>Aksi</th>
    </tr>
  `;

  // Ngulangin setiap data di keranjang buat dijadiin baris tabel
  riwayatPenjualan.forEach((item, index) => {
    // Tambahin semua biaya admin buat tau total untung kita
    untungSeharian += item.admin;
    // Gabungin baris demi baris pake +=
    html += `
      <tr>
        <td>${item.nama.replaceAll("_", " ")}</td>
        <td>Rp${item.total.toLocaleString("id-ID")}</td>
        <td>Rp${item.admin.toLocaleString("id-ID")}</td>
        <td><button class="btn-hapus" onclick="hapusSatu(${index})">Hapus</button></td>
      </tr>
    `;
  });

  // Tampilkan semua baris yang udah dirakit ke dalam tabel HTML
  wadah.innerHTML = html;
  document.getElementById("totalCuan").innerHTML = `
    <div class="profit-card">Total Profit: Rp${untungSeharian.toLocaleString(
      "id-ID"
    )}</div>
  `;
  // Panggil fungsi simpan biar datanya masuk ke memori permanen browser (Local Storage)
  simpanData();
}

//kita bikin fungsi untuk menambahkan daftar produk di web
function muatDaftarHarga() {
  let produk = document.getElementById("tampilanHarga");
  let listSaran = document.getElementById("saranProduk");

  // for in ini buat ngebongkar daftarProduk yang di paling atas tadi
  for (let key in daftarProduk) {
    let namaBersih = key.replaceAll("_", " ");

    // Nampilin daftar harga polosan biar Bayu bisa liat-liat harga
    produk.innerHTML += `<div class="item">${namaBersih}: Rp${daftarProduk[
      key
    ].toLocaleString("id-ID")}</div>`;

    // Masukin juga ke dalam elemen <datalist> (opsional buat backup saran browser)
    listSaran.innerHTML += `<option value="${key}">${namaBersih}</option>`;
  }
}

//kita buat fungsi untuk mereset data berserta visualnya
function resetData() {
  // Kosongin semua isi keranjang (riwayat) jadi nol lagi
  riwayatPenjualan = [];
  tampilkanRiwayat();
}

//kita bikin fungsi untuk menyimpan data ke dalam localstorage
function simpanData() {
  // localstorage.setitem itu "Nitip" data ke browser biar gak ilang walau komputer mati
  // JSON.stringify itu kebalikan parse: ngubah objek jadi teks biar bisa disimpan, karena localstorage hanya menerima text
  localStorage.setItem("riwayatPenjualan", JSON.stringify(riwayatPenjualan));
}

//kita bikin fungsi untuk emnghapus data yang kita inginkan saja
function hapusSatu(index) {
  // Splice itu perintah buat buang satu barang di posisi (index) tertentu
  riwayatPenjualan.splice(index, 1);
  // Update lagi tampilannya setelah satu data dihapus
  tampilkanRiwayat();
}

// Ini perintah buat ngejalanin fungsinya pertama kali pas web baru dibuka
muatDaftarHarga();
tampilkanRiwayat();
