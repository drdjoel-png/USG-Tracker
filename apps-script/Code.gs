const SPREADSHEET_ID = "1VEvJt6nS_4t3q-rpZSMSHgWuORpXqOHzhtFTEF1vlYk";
const SHEET_NAME = "LOG";

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(["Timestamp", "Nama"]);

  return sheet;
}

function saveName(name) {
  name = String(name || "").trim();
  if (!name) throw new Error("Nama wajib diisi.");

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    getSheet().appendRow([new Date(), name]);
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  try {
    saveName(e && e.parameter ? e.parameter.name : "");
    return htmlResponse("OK");
  } catch (error) {
    return htmlResponse("ERROR: " + error.message);
  }
}

// Diagnostic test: open /exec?name=Zul
function doGet(e) {
  const name = e && e.parameter ? e.parameter.name : "";

  if (name) {
    try {
      saveName(name);
      return htmlResponse("OK - " + name + " tercatat.");
    } catch (error) {
      return htmlResponse("ERROR: " + error.message);
    }
  }

  return htmlResponse("USG Tracker aktif.");
}

function htmlResponse(message) {
  return HtmlService.createHtmlOutput(
    "<!doctype html><html><body>" + escapeHtml(message) + "</body></html>"
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
