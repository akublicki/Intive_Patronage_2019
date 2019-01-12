const modal = document.getElementsByClassName("modal")[0];
let heroes = {};

const openMobileNav = x => {
  x.classList.toggle("change");
  document
    .getElementsByClassName("header__navigation")[0]
    .classList.toggle("header__navigation--show");
};

const openAddHero = () => {
  document.getElementsByTagName("main")[0].innerHTML =
    "" +
    '<form class="addHero" >' +
    "<h2>Dodaj Herosa</h2>" +
    "<input " +
    'type="text" ' +
    'placeholder="Nazwa Bohatera" ' +
    'class="addHero__input addHero__name" ' +
    "/>" +
    "<input " +
    'type="text" ' +
    'placeholder="Adres/nazwa zdjęcia" ' +
    'class="addHero__input addHero__image" ' +
    "/>" +
    "<input " +
    'type="number" ' +
    'placeholder="Cena wynajmu /h" ' +
    'class="addHero__input addHero__price" ' +
    "/>" +
    "<textarea " +
    'type="text" ' +
    'placeholder="Opis Bohatera" ' +
    'class="addHero__input addHero__description" ' +
    "></textarea>" +
    '<button type="button" class="addHero__submit" onclick="addHero()">Submit</button>' +
    "</form>";
};

const addHero = () => {
  let url = "http://localhost:3000/heroes";
  let addHeroName = document.getElementsByClassName("addHero__name")[0].value;
  if (addHeroName) {
    let hero = {
      name: addHeroName,
      description: document.getElementsByClassName("addHero__description")[0].value,
      image: document.getElementsByClassName("addHero__image")[0].value,
      price: document.getElementsByClassName("addHero__price")[0].value,
      isAvailable: true
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(hero),
      headers: {
        "Content-Type": "application/json"
      }
    });
    location.reload();
  }
};

const openEditHero = () => {
  let template = "";
  let templateHeroes = "";
  let url = "http://localhost:3000/heroes";;
  fetch(url)
    .then(response => response.json())
    .then(heroes => {
      for (hero in heroes) {
        templateHeroes += '<option value="' + heroes[hero].name + '">' + heroes[hero].name + "</option>";
      }
      template = "" +
        '<form class="editHero">' +
        "<h2>Edytuj Herosa</h2>" +
        '<label class="editHero__label"> Wybierz istniejącego Heroesa </label>' +
        '<select class="editHero__select" onchange="changeHero()">' +
        "<option disabled selected>--- WYBIERZ ---</option>";
      template += templateHeroes;
      template += "" +
        "</select>" +
        '<label class="editHero__label">Adres/nazwa zdjęcia</label>' +
        '<input type="text" class="editHero__input editHero__image" />' +
        '<label class="editHero__label">Cena wynajmu /h</label>' +
        '<input type="number" class="editHero__input editHero__price" />' +
        '<label class="editHero__label">Opis Bohatera</label>' +
        '<textarea type="text" class="editHero__input editHero__description"></textarea>' +
        '<button type="button" class="editHero__submit" onclick="editHero()">Edytuj</button>' +
        "</form>";
      document.getElementsByTagName("main")[0].innerHTML = template;
    });
};

const changeHero = () => {
  let element = document.getElementsByClassName("editHero__select")[0];
  let heroName = element.options[element.selectedIndex].value;
  let url = "http://localhost:3000/heroes/" + heroName;
  fetch(url)
    .then(response => response.json())
    .then(hero => {
      document.getElementsByClassName("editHero__input editHero__image")[0].value = hero.image;
      document.getElementsByClassName("editHero__input editHero__price")[0].value = hero.price;
      document.getElementsByClassName("editHero__input editHero__description")[0].value = hero.description;
    });
 };

const editHero = () => {
  let element = document.getElementsByClassName("editHero__select")[0];
  let heroName = element.options[element.selectedIndex].value;
  let url = "http://localhost:3000/heroes/" + heroName;
  let hero = {
    description: document.getElementsByClassName("editHero__input editHero__description")[0].value,
    image: document.getElementsByClassName("editHero__input editHero__image")[0].value,
    price: document.getElementsByClassName("editHero__input editHero__price")[0].value
  };
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(hero)
    // headers: {"Content-Type": "application/json"}
  });
  location.reload();
};

const openDeleteHero = () => {
  let template = "";
  let templateHeroes = "";
  let url = "http://localhost:3000/heroes";
  fetch(url)
    .then(response => response.json())
    .then(heroes => {
      for (hero in heroes) {
        templateHeroes +='<option value="' + heroes[hero].name + '">' + heroes[hero].name + "</option>";
      }
      template =
        "" +
        '<form class="deleteHero">' +
        "<h2>Usuń Herosa :-(</h2>" +
        '<label class="deleteHero__label"> Wybierz istniejącego Heroesa </label>' +
        '<select class="deleteHero__select">' +
        "<option disabled selected>--- WYBIERZ ---</option>";
      template += templateHeroes;
      template += "" + "</select>" + '<button type="button" class="deleteHero__submit" onclick="deleteHero()">Usuń</button>' + "</form>";
      document.getElementsByTagName("main")[0].innerHTML = template;
    });
};

const deleteHero = () => {
    let element = document.getElementsByClassName("deleteHero__select")[0];
    let url = "http://localhost:3000/heroes/" + element.options[element.selectedIndex].value;
    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    location.reload();
};

const openDeleteHeroes = () => {
  let url = "http://localhost:3000/heroes/";
  if(window.confirm("Czy na pewno chcesz usunąć wszystkich bohaterów?")){
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    location.reload();
  }
};

const showHeroes = () => {
  fetch("http://localhost:3000/heroes")
    .then(response => response.json())
    .then(heroes => {
      let template = "";
      for (hero in heroes) {
        template +=
          "" +
          '<div class="hero" onclick="openModal(' +
          "'" +
          heroes[hero].name +
          "'" +
          ')"> ' +
          '<img src="' +
          heroes[hero].image +
          '" class="hero__image">' +
          '<div class="hero__name">' +
          heroes[hero].name +
          "</div>" +
          '<div class="hero__price">Cena wynajmu: ' +
          heroes[hero].price +
          "zł/h</div>" +
          "</div>";
      }
      document.getElementsByClassName("heroes")[0].innerHTML = template;
    });
};

const saveToLocalStorage = () => {
  localStorage.setItem("heroes", JSON.stringify(heroes));
};

const loadFromLocalStorage = () => {
  let heroesFromLocalStorage = localStorage.getItem("heroes");
  heroes = JSON.parse(heroesFromLocalStorage);
};

const openModal = heroName => {
  let url = "http://localhost:3000/heroes/" + heroName;
  fetch(url)
    .then(response => response.json())
    .then(hero => {
      let template = "";
      template =
        "" +
        '<div class="modal__close" onclick = "closeModal()">x</div>' +
        '<div class="modal__image">' +
        '<img src="' +
        hero.image +
        '">' +
        "</div>" +
        '<div class="modal__information">' +
        '<h2 class="modal__name">I' +
        "'" +
        "M THE " +
        hero.name.toUpperCase() +
        "</h2>" +
        '<div class="modal__description">' +
        hero.description +
        "</div>" +
        '<div class="modal__price">WYNAJEM: ' +
        hero.price +
        " ZŁ/H</div>";
      if (hero.isAvailable) {
        template +=
          '<button class="modal__submit" onclick="addToBasket(' +
          "'" +
          hero.name +
          "'" +
          ')">DODAJ DO KOSZYKA</button>';
      } else {
        template +=
          '<button class="modal__submit modal__submit--disabled" disabled)">HERO ZAJĘTY</button>';
      }
      template += "</div>";
      document.getElementsByClassName("modal__container")[0].innerHTML = template;
      modal.style.display = "block";
    });
};

const closeModal = () => {
  modal.style.display = "none";
};

const addToBasket = heroName => {
  heroes[heroName].isAvailable = false;
  saveToLocalStorage();
  closeModal();
  location.reload();
};

const showBasket = () => {
  let price = 0;
  let template = "";
  for (hero in heroes) {
    if (!heroes[hero].isAvailable) {
      template +=
        "" +
        '<div class="basket__hero">' +
        '<div class="basket__hero--width40">' +
        "<img src=" +
        heroes[hero].image +
        ' class="basket__heroImage">' +
        "</div>" +
        '<div class="basket__hero--width60">' +
        "<span>" +
        heroes[hero].name +
        "</span>" +
        '<p class="basket__heroDescription">' +
        heroes[hero].description +
        "</p>" +
        '<button type="button" class="basket__buttonDelete" onclick="deleteFromBasket(' +
        "'" +
        heroes[hero].name +
        "'" +
        ')">USUŃ Z KOSZYKA | x</button>' +
        "</div>" +
        "</div>";
      price += Number(heroes[hero].price);
    }
  }
  if (price != 0) {
    document.getElementsByClassName("basket__heroes")[0].innerHTML = template;
    document.getElementsByClassName("basket__price--colorRed")[0].innerHTML =
      price + "zł";
  }
};

const deleteFromBasket = heroName => {
  heroes[heroName].isAvailable = true;
  saveToLocalStorage();
  location.reload();
};

loadFromLocalStorage();
if (heroes) {
  showHeroes();
  showBasket();
} else {
  heroes = {};
}
