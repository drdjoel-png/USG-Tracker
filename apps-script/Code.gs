const SHEET_NAME = "LOG";

const ALLOWED_EQUIPMENT = [
  "USG-01",
  "USG-02",
  "USG-03"
];

function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Equipment ID", "User"]);
  }
}

function doPost(e) {
  try {
    const name = String(e?.parameter?.name || "").trim();
    const equipment = String(e?.parameter?.equipment || "").trim();

    if (!name) return htmlResponse("Nama wajib diisi.");

    if (!ALLOWED_EQUIPMENT.includes(equipment)) {
      return htmlResponse("Equipment ID tidak valid.");
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(5000);

    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      if (!sheet) throw new Error(`Sheet ${SHEET_NAME} tidak ditemukan.`);

      sheet.appendRow([new Date(), equipment, name]);
    } finally {
      lock.releaseLock();
    }

    return htmlResponse("OK");
  } catch (error) {
    console.error(error);
    return htmlResponse("Terjadi kesalahan.");
  }
}

function htmlResponse(message) {
  return HtmlService.createHtmlOutput(`<!doctype html><html><body>${escapeHtml(message)}</body></html>`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
