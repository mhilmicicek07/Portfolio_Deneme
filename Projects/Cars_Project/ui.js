//! Arayüz İşlemleri
function UI() {}

UI.prototype._placeholderDataUrl = function () {
  // Basit, küçük bir SVG placeholder (data URL)
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='160' height='90'>
      <rect width='100%' height='100%' fill='#6c757d'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='#fff'>
        Görsel yok
      </text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

UI.prototype._createRow = function (car) {
  const tr = document.createElement("tr");
  tr.dataset.id = car.id;

  // Görsel hücresi
  const tdImg = document.createElement("td");
  const img = document.createElement("img");
  img.className = "img-fluid img-thumbnail";
  img.style.maxWidth = "160px";
  img.style.maxHeight = "90px";
  img.loading = "lazy";
  img.src = car.url;
  const fallback = this._placeholderDataUrl();
  img.onerror = () => (img.src = fallback);
  tdImg.appendChild(img);

  // Başlık
  const tdTitle = document.createElement("td");
  tdTitle.textContent = car.title;

  // Fiyat
  const tdPrice = document.createElement("td");
  tdPrice.textContent = car.price;

  // İşlemler
  const tdActions = document.createElement("td");
  const delBtn = document.createElement("a");
  delBtn.href = "#";
  delBtn.className = "btn btn-danger delete-car";
  delBtn.innerHTML = `<i class="fa-solid fa-xmark"></i> Aracı Sil`;
  tdActions.appendChild(delBtn);

  tr.appendChild(tdImg);
  tr.appendChild(tdTitle);
  tr.appendChild(tdPrice);
  tr.appendChild(tdActions);

  return tr;
};

UI.prototype.addCarToUI = function (newCar) {
  const carList = document.getElementById("cars");
  const tr = this._createRow(newCar);
  carList.appendChild(tr);
};

UI.prototype.displayMessages = function (message, type) {
  // type: 'success' | 'danger' | 'warning' | 'info' ...
  const cardBody = document.querySelector(".card-body");
  const div = document.createElement("div");
  div.className = `alert alert-${type} mt-3`;
  div.textContent = message;
  cardBody.prepend(div);
  setTimeout(() => div.remove(), 2000);
};

UI.prototype.loadAllCars = function (cars) {
  const carList = document.getElementById("cars");
  const frag = document.createDocumentFragment();
  cars.forEach((car) => {
    frag.appendChild(this._createRow(car));
  });
  carList.appendChild(frag);
};

UI.prototype.deleteCarFromUI = function (element) {
  const tr = element.closest("tr");
  if (tr) tr.remove();
};

UI.prototype.clearAllCarsFromUI = function () {
  const carList = document.getElementById("cars");
  carList.innerHTML = "";
};
