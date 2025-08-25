//! ToDo List

//? Eleman seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos = [];

//? Sayfa yüklenince kayıtlı görevleri getir

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(createItem);
}
loadItems();

//? Event listeners

function eventListeners() {
  form.addEventListener("submit", addNewItem);
  taskList.addEventListener("click", deleteItem);
  btnDeleteAll.addEventListener("click", deleteAllItems);
}
eventListeners();


//? Get Items From Local Storage

function getItemsFromLS() {
  const raw = localStorage.getItem("todos");
  return raw ? JSON.parse(raw) : [];
}

// Array → LocalStorage
function setItemsToLS(arr) {
  localStorage.setItem("todos", JSON.stringify(arr));
}

//? Set Item To Local Storage

function addItemToLS(newTodo) {
  const list = getItemsFromLS();
  list.push(newTodo.trim());
  setItemsToLS(list);
}

//? Yeni Görev Oluşturma

function createItem(newTodo) {
  const li = document.createElement("li");
  li.className =
    "list-group-item list-group-item-secondary d-flex justify-content-between align-items-center";
  li.appendChild(document.createTextNode(newTodo));

  const a = document.createElement("a");
  a.className = "delete-item float-end";
  a.href = "#";
  a.innerHTML = '<i style="color:#dc3545;" class="danger fa-solid fa-xmark"></i>';

  li.appendChild(a);
  taskList.appendChild(li);
}

//? Yeni Görev Ekleme

function addNewItem(e) {
  e.preventDefault();

  const value = input.value.trim();
  if (!value) {
    alert("Lütfen boş görev eklemeyin!");
    return;
  }

  createItem(value);
  addItemToLS(value);
  input.value = "";
}

//? Tek Bir Görevi Silme

function deleteItem(e) {
  const deleteLink = e.target.closest(".delete-item");
  if (!deleteLink) return;

  const li = deleteLink.closest("li");
  if (!li) return;

  if (confirm("Görevi silmek istediğinize emin misiniz?")) {
    li.remove();

    const text = (li.firstChild && li.firstChild.textContent
      ? li.firstChild.textContent
      : ""
    ).trim();

    let list = getItemsFromLS();
    list = list.filter(t => t.trim() !== text);

    if (list.length === 0) {
      localStorage.removeItem("todos"); 
    } else {
      setItemsToLS(list);
    }
  }
}

//? Tüm Elemanları Silme

function deleteAllItems(e) {
  e.preventDefault();

  if (confirm("Tüm görevleri silmek istediğinize emin misiniz?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.removeItem("todos");
  }
}
