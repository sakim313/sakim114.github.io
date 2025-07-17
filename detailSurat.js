const query = new URLSearchParams(window.location.search);
const nomorSurat = query.get('nomor');

// Fungsi konversi angka ke angka Arab
function toArabicNumber(number) {
  const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  return number.toString().split('').map(d => arabicDigits[parseInt(d)]).join('');
}

fetch(`https://equran.id/api/surat/${nomorSurat}`)
  .then(res => res.json())
  .then(data => {
    // Header Surat
    document.getElementById('header-surat').innerHTML = `
      <h3>${data.nama_latin} (${data.arti})</h3>
      <p><em>${data.deskripsi}</em></p>
      <div class="text-center my-4">
      </div>
    `;

    const isiContainer = document.getElementById('isi-surat');

    // Tambahkan Basmalah jika bukan surat ke-9
    if (parseInt(nomorSurat) !== 9) {
      const basmalahCard = document.createElement('div');
      basmalahCard.className = 'card mb-3 text-center border border-2 border-dark';
      basmalahCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title" dir="rtl" style="font-size: 1.5rem;">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </h5>
        </div>
      `;
      isiContainer.appendChild(basmalahCard);
    }

    // Tampilkan ayat-ayat dengan waqaf dan angka Arab
    data.ayat.forEach(ayat => {
      const card = document.createElement('div');
      card.className = 'card mb-3 border border-2 border-dark';

      const nomorArab = toArabicNumber(ayat.nomor);
      const teksArab = `${ayat.ar} ۝${nomorArab}`;

      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title text-end" dir="rtl" style="font-size: 1.5rem;">
            ${teksArab}
          </h5>
          <p class="card-text"><strong>Arti:</strong> ${ayat.idn}</p>
        </div>
      `;
      isiContainer.appendChild(card);
    });
  })