const addListButton = document.getElementById("add-list");
const listDialog = document.querySelector(".form-container");

const submitDialog = document.getElementById("submit-dialog");
const listNameInput = document.getElementById("list-name");
const listItemsInput = document.getElementById("list-items");

// equalize Cards Heights with max card height
function rqualizeCardsHeight() {
  const cardsNodeList = document.querySelectorAll(".card");
  const cards = Array.from(cardsNodeList);

  // Assign an array with cards height values
  const cardsHeights = cards.map((card) => {
    const height = card.offsetHeight;
    return height;
  });

  // Assign max card height value
  const maxHeight = Math.max(...cardsHeights);

  cards.forEach((card) => {
    card.style.height = `${maxHeight + 10}px`;
  });
}

rqualizeCardsHeight();

addListButton.addEventListener("click", () => {
  listDialog.showModal();
});

window.addEventListener("click", (e) => {
  if (e.target === listDialog) {
    listDialog.close();
  }
});

class Lists {
  constructor(name, items, id) {
    this.name = name;
    this.items = items;
    this.id = crypto.randomUUID();
  }

  splitItems() {
    const listItems = this.items.split(",");
    return listItems;
  }
}
class ListBoard {
  static lists = [];

  static addList(list) {
    this.lists.push(list);
  }

  static removeList() {}
  static editList() {}
  static displayLists() {}
}

submitDialog.addEventListener("click", (e) => {
  e.preventDefault();

  const list = new Lists(`${listNameInput.value}`, `${listItemsInput.value}`);
  // Convert textarea value to an array
  list.items = list.splitItems();
  ListBoard.addList(list);
  listDialog.close();
});

console.log(ListBoard.lists);
