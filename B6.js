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

let riwayatPenjualan =
  JSON.parse(localStorage.getItem("riwayatPenjualan")) || [];

function cariProduk() {
  let input = document.getElementById("namaProduk").value.toUpperCase();
  let box = document.getElementById("saranBox");
  box.innerHTML = "";

  if (input.length === 0) {
    box.display = "none";
    return;
  }

  let hasilCari = Object.keys(daftarProduk).filter((item) =>
    item.includes(input)
  );

  if (hasilCari.length > 0) {
    box.style.display = "block";
    hasilCari.forEach((item) => {
      let div = document.createElement("div");
      div.className = "saran-item";
      div.innerHTML = item.replaceAll("_", " ");
      div.onclick = function () {
        document.getElementById("namaProduk").value = item;
        document.getElementById("nominal").value = daftarProduk[item];
        box.style.display = "none";
      };
      box.appendChild(div);
    });
  } else {
    box.style.display = "none";
  }
}

// Tambahin ini biar kalau klik di luar, kotak sarannya ilang
document.addEventListener("click", function (e) {
  if (e.target.id !== "namaProduk") {
    document.getElementById("saranBox").style.display = "none";
  }
});

function tambahTransaksi() {
  let nama = document.getElementById("namaProduk").value.toUpperCase();
  let nominal = parseInt(document.getElementById("nominal").value) || 0;
  let admin = parseInt(document.getElementById("admin").value) || 0;
  let struk = document.getElementById("struk");

  if (nama === "" || nominal <= 0 || admin <= 0) {
    alert("Isi Data Lengkap!");
  } else {
    let total = nominal + admin;
    riwayatPenjualan.push({ nama, nominal, admin, total });
    tampilkanRiwayat();

    document.getElementById("namaProduk").value = "";
    document.getElementById("nominal").value = "";
    document.getElementById("admin").value = "";

    struk.style.display = "block";
    struk.innerHTML = `✅ Berhasil! Total: Rp${total.toLocaleString("id-ID")}`;
  }
}

function tampilkanRiwayat() {
  let wadah = document.getElementById("riwayatTransaksi");
  let untungSeharian = 0;

  let html = `
    <tr>
      <th>Produk</th>
      <th>Total</th>
      <th>Profit</th>
      <th>Aksi</th>
    </tr>
  `;

  riwayatPenjualan.forEach((item, index) => {
    untungSeharian += item.admin;
    html += `
      <tr>
        <td>${item.nama.replaceAll("_", " ")}</td>
        <td>Rp${item.total.toLocaleString("id-ID")}</td>
        <td>Rp${item.admin.toLocaleString("id-ID")}</td>
        <td><button class="btn-hapus" onclick="hapusSatu(${index})">Hapus</button></td>
      </tr>
    `;
  });

  wadah.innerHTML = html;
  document.getElementById("totalCuan").innerHTML = `
    <div class="profit-card">Total Profit: Rp${untungSeharian.toLocaleString(
      "id-ID"
    )}</div>
  `;
  simpanData();
}

function muatDaftarHarga() {
  let produk = document.getElementById("tampilanHarga");
  let listSaran = document.getElementById("saranProduk");
  for (let key in daftarProduk) {
    let namaBersih = key.replaceAll("_", " ");
    produk.innerHTML += `<div class="item">${namaBersih}: Rp${daftarProduk[
      key
    ].toLocaleString("id-ID")}</div>`;
    listSaran.innerHTML += `<option value="${key}">${namaBersih}</option>`;
  }
}

function resetData() {
  riwayatPenjualan = [];
  tampilkanRiwayat();
}
function simpanData() {
  localStorage.setItem("riwayatPenjualan", JSON.stringify(riwayatPenjualan));
}
function hapusSatu(index) {
  riwayatPenjualan.splice(index, 1);
  tampilkanRiwayat();
}

muatDaftarHarga();
tampilkanRiwayat();
