//! Car İşlemleri
function Car(title, price, url) {
  this.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  this.title = title;
  this.price = price;
  this.url = url;
}
