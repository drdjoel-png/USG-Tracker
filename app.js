const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxptlsKBabN5EstppI5I34bjosoZwcC0DJJi_8WTV-OeI7Z_mHOOEjl8kjtY1utZhZEg/exec";

const form = document.getElementById("trackerForm");
const nameInput = document.getElementById("name");
const submitButton = document.getElementById("submitButton");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

form.action = APPS_SCRIPT_URL;

form.addEventListener("submit", function (event) {
  const name = nameInput.value.trim();

  if (!name) {
    event.preventDefault();
    showError("Nama wajib diisi.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Menyimpan...";
  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");

  // The POST is sent to the Apps Script Web App through a hidden iframe.
  // The iframe prevents the page from navigating away from the tracker.
  window.setTimeout(() => {
    successMessage.classList.remove("hidden");
    nameInput.value = "";
    submitButton.disabled = false;
    submitButton.textContent = "SUBMIT";
  }, 1200);
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}
