//! Projenin Ana JS Dosyası

const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");

// Nesneler
const ui = new UI();
const storage = new Storage();

// Eventler
function eventListeners() {
  form.addEventListener("submit", addCar);

  document.addEventListener("DOMContentLoaded", function () {
    const cars = storage.getCarsFromStorage();
    ui.loadAllCars(cars);
  });

  // Silme butonu: event delegation
  cardbody.addEventListener("click", deleteCar);

  clear.addEventListener("click", clearAllCars);
}
eventListeners();

// Yardımcı: kaba URL doğrulama
function isLikelyHttpUrl(str) {
  return /^https?:\/\//i.test(str.trim());
}

function addCar(e) {
  e.preventDefault();

  const title = titleElement.value.trim();
  const price = priceElement.value.trim();
  const url = urlElement.value.trim();

  if (!title || !price || !url) {
    ui.displayMessages("Tüm alanları doldurun!", "danger");
    return;
  }

  if (isNaN(Number(price))) {
    ui.displayMessages("Fiyat sayısal olmalı.", "warning");
    return;
  }

  if (!isLikelyHttpUrl(url)) {
    ui.displayMessages("Görsel linki http/https ile başlamalı.", "warning");
    return;
  }

  const newCar = new Car(title, price, url);

  ui.addCarToUI(newCar);
  storage.addCarToStorage(newCar);
  ui.displayMessages("Araç başarıyla eklendi!", "success");

  // Formu temizle
  form.reset();
}

function deleteCar(e) {
  const btn = e.target.closest(".delete-car");
  if (!btn) return;

  e.preventDefault();

  const tr = btn.closest("tr");
  if (!tr) return;

  const id = tr.dataset.id;
  ui.deleteCarFromUI(btn);
  storage.deleteCarFromStorageById(id);
  ui.displayMessages("Silme işlemi başarıyla gerçekleşti!", "danger");
}

function clearAllCars(e) {
  e.preventDefault();
  if (confirm("Tüm araçlar silinecek! Emin misiniz?")) {
    ui.clearAllCarsFromUI();
    storage.clearAllCarsFromStorage();
  }
}
