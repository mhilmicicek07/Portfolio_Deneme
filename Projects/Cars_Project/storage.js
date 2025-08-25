//! Local Storage İşlemleri
function Storage() {}

Storage.prototype.KEY = "cars";

Storage.prototype.getCarsFromStorage = function () {
  try {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("LocalStorage JSON parse error:", e);
    return [];
  }
};

// Tek kayıt noktası: boşsa anahtarı sil, değilse güncelle
Storage.prototype._saveCars = function (cars) {
  if (!cars || cars.length === 0) {
    localStorage.removeItem(this.KEY);
  } else {
    localStorage.setItem(this.KEY, JSON.stringify(cars));
  }
};

Storage.prototype.addCarToStorage = function (newCar) {
  const cars = this.getCarsFromStorage();
  cars.push(newCar);
  this._saveCars(cars);
};

// Title ile silmek isteyenler için (senin mevcut akışına uygun)
Storage.prototype.deleteCarFromStorage = function (carTitle) {
  const needle = (carTitle || "").trim();
  const cars = this.getCarsFromStorage().filter(c => (c.title || "").trim() !== needle);
  this._saveCars(cars);
};

// ID ile silmek isteyenler için (daha güvenli)
Storage.prototype.deleteCarFromStorageById = function (id) {
  const cars = this.getCarsFromStorage().filter(c => c.id !== id);
  this._saveCars(cars);
};

Storage.prototype.clearAllCarsFromStorage = function () {
  localStorage.removeItem(this.KEY);
};
