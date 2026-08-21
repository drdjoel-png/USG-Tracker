// Paste the deployed Google Apps Script Web App URL here.
const APPS_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const params = new URLSearchParams(window.location.search);
const equipment = (params.get("equipment") || "").trim();

const equipmentName = document.getElementById("equipmentName");
const equipmentInput = document.getElementById("equipment");
const form = document.getElementById("trackerForm");
const nameInput = document.getElementById("name");
const submitButton = document.getElementById("submitButton");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

if (!equipment) {
  equipmentName.textContent = "USG";
  showError("ID USG tidak ditemukan. Gunakan QR code alat.");
  submitButton.disabled = true;
} else {
  equipmentName.textContent = equipment;
  equipmentInput.value = equipment;
}

if (APPS_SCRIPT_URL.startsWith("https://")) {
  form.action = APPS_SCRIPT_URL;
} else {
  showError("Sistem belum dikonfigurasi. Hubungi administrator.");
  submitButton.disabled = true;
}

form.addEventListener("submit", function (event) {
  const name = nameInput.value.trim();

  if (!name) {
    event.preventDefault();
    showError("Nama wajib diisi.");
    return;
  }

  if (!equipment) {
    event.preventDefault();
    showError("ID USG tidak ditemukan.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Menyimpan...";
  errorMessage.classList.add("hidden");

  // The form posts to a hidden iframe, avoiding CORS/fetch configuration.
  // The success state is shown after a short delay for a fast bedside UX.
  window.setTimeout(() => {
    successMessage.classList.remove("hidden");
    nameInput.value = "";
    submitButton.disabled = false;
    submitButton.textContent = "SUBMIT";
  }, 800);
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}
