/**
 * CelikFakta PdP: menerima rekod daripada laman web dan menulisnya ke Google Sheet ini.
 * Pasang: buka Sheet > Extensions > Apps Script > tampal kod ini > Deploy > New deployment >
 *         Web app > Execute as: Me > Who has access: Anyone > Deploy. Salin "Web app URL".
 */
const HEAD = ['Masa', 'ID Peserta', 'Nama', 'Jenis', 'Unit', 'Skor', 'Menguasai', 'Jawapan', 'Teks'];

// Elak teks peserta ditafsir sebagai formula
function safe(v) {
  v = v === undefined || v === null ? '' : v;
  return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v;
}

// doPost: dipanggil setiap kali laman menghantar rekod (satu atau lebih baris)
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);                       // elak dua peserta menulis serentak pada baris yang sama
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sh.getRange('A1').getValue() === '') sh.getRange(1, 1, 1, HEAD.length).setValues([HEAD]);
    const rows = (JSON.parse(e.postData.contents).rows || []).slice(0, 50);
    if (!rows.length) return ContentService.createTextOutput('ok');
    const data = rows.map(r => [
      new Date(r.masa), safe(r.id), safe(r.nama), safe(r.jenis), safe(r.unit),
      r.skor === undefined ? '' : Number(r.skor), safe(r.menguasai), safe(r.jawapan), safe(String(r.teks || '').slice(0, 2000))
    ]);
    // baris kosong pertama dalam lajur A (ringkasan di lajur K:L tidak diganggu)
    const next = sh.getRange('A:A').getValues().filter(r => r[0] !== '').length + 1;
    if (next + data.length - 1 > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), data.length + 200);
    sh.getRange(next, 1, data.length, HEAD.length).setValues(data);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

// doGet: untuk menguji bahawa deployment aktif (buka Web app URL dalam pelayar)
function doGet() {
  return ContentService.createTextOutput('CelikFakta PdP: sambungan Google Sheet aktif.');
}
