let allSurat = [];

fetch('https://equran.id/api/surat')
  .then(res => res.json())
  .then(data => {
    allSurat = data;
    renderSurat(data);
  });

function renderSurat(data) {
  const listContainer = document.getElementById('daftar-surat');
  listContainer.innerHTML = ''; // Bersihkan dulu

  data.forEach(surat => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 mb-3'; // responsif + jarak antar kartu

    const card = document.createElement('div');
    card.className = 'card surat-card h-100 border border-3 border-dark shadow-sm';
    card.style.backgroundImage = "url('img/background-card.png')";
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";

    const cardBody = `
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title fw-bold">${surat.nomor}. ${surat.nama_latin}</h5>
          <p class="card-subtitle text-muted">${surat.arti} - ${surat.jumlah_ayat} Ayat</p>
        </div>
        <div class="mt-3 d-flex justify-content-between">
        </div>
      </div>
    `;

    card.innerHTML = cardBody;
    card.onclick = () => window.location.href = `surat.html?nomor=${surat.nomor}`;

    col.appendChild(card);
    listContainer.appendChild(col);
  });
}

// Fitur pencarian
document.getElementById('searchInput').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = allSurat.filter(surat =>
    surat.nama_latin.toLowerCase().includes(keyword) ||
    surat.arti.toLowerCase().includes(keyword) ||
    surat.nomor.toString() === keyword
  );
  renderSurat(filtered);
});

