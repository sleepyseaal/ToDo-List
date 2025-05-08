const addListButton = document.getElementById("add-list");
const listDialog = document.querySelector(".form-container");

const submitDialog = document.getElementById("submit-dialog");
const listNameInput = document.getElementById("list-name");
const listItemsInput = document.getElementById("list-items");

const cardsContainer = document.querySelector(".cards-container");

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
    this.creatCard(list);
  }

  static removeList() {}
  static editList() {}
  static creatCard(list) {
    const listCard = document.createElement("section");
    listCard.classList.add("card");
    listCard.dataset.id = `${list.id}`;
    cardsContainer.appendChild(listCard);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("card-content");
    listCard.appendChild(contentContainer);

    const iconsBox = document.createElement("div");
    iconsBox.classList.add("icons-box");
    contentContainer.appendChild(iconsBox);

    const editIcon = document.createElement("img");
    editIcon.setAttribute("src", "./edit.svg");
    editIcon.setAttribute("alt", "Edit the list");
    iconsBox.appendChild(editIcon);

    const xIcon = document.createElement("img");
    xIcon.setAttribute("src", "./x.svg");
    xIcon.setAttribute("alt", "Deleate the list");
    iconsBox.appendChild(xIcon);

    const listName = document.createElement("h3");
    listName.textContent = `${list.name}`;
    contentContainer.appendChild(listName);

    const listUL = document.createElement("ul");
    listUL.classList.add("list");
    contentContainer.appendChild(listUL);

    // loop through list items array and assign thier values to new li elements
    for (let item of list.items) {
      const listItem = document.createElement("li");
      listItem.textContent = `${item}`;
      listItem.classList.add("list-item");
      listUL.appendChild(listItem);
    }

    const cardDate = document.createElement("p");
    cardDate.classList.add("list-date");
    cardDate.textContent = "📅 12 Nov";
    listCard.appendChild(cardDate);
  }

  static displayCard() {}
}

submitDialog.addEventListener("click", (e) => {
  e.preventDefault();

  const list = new Lists(`${listNameInput.value}`, `${listItemsInput.value}`);
  // Convert textarea value to an array
  list.items = list.splitItems();
  ListBoard.addList(list);
  listDialog.close();
  equalizeCardsHeight();
});

// equalize Cards Heights with max card height
function equalizeCardsHeight() {
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
  /*  console.log(cardsNodeList);
  console.log(cards); */
  /*   console.log(maxHeight);
   */
  console.log(cards);
}

equalizeCardsHeight();
