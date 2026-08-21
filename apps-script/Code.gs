const SPREADSHEET_ID = "1VEvJt6nS_4t3q-rpZSMSHgWuORpXqOHzhtFTEF1vlYk";
const SHEET_NAME = "LOG";

function doPost(e) {
  try {
    const name = String(e?.parameter?.name || "").trim();

    if (!name) {
      return htmlResponse("Nama wajib diisi.");
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Nama"]);
    }

    sheet.appendRow([
      new Date(),
      name
    ]);

    return htmlResponse("OK");

  } catch (error) {
    console.error(error);
    return htmlResponse("ERROR: " + error.message);
  }
}

function doGet() {
  return htmlResponse("USG Tracker aktif.");
}

function htmlResponse(message) {
  return HtmlService.createHtmlOutput(
    "<!doctype html><html><body>" +
    escapeHtml(message) +
    "</body></html>"
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
