const modal = document.getElementsByClassName("modal")[0];
let heroes = {};
let basket = [];

const openMobileNav = x => {
  x.classList.toggle("change");
  document
    .getElementsByClassName("header__navigation")[0]
    .classList.toggle("header__navigation--show");
};

const showLoader = () => {
  document.getElementsByClassName("loader")[0].style.display = "block";
};

const hideLoader = () => {
  document.getElementsByClassName("loader")[0].style.display = "none";
};

const showMain = () => {
  document.getElementsByTagName("main")[0].style.display = "block";
};

const hideMain = () => {
  document.getElementsByTagName("main")[0].style.display = "none";
};

const openAddHero = () => {
  document.getElementsByTagName("main")[0].innerHTML = `
    <form class="addHero">
          <h2>Dodaj Herosa</h2>
        <input
          type="text"
          placeholder="Nazwa Bohatera"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Nazwa Bohatera'"
          class="addHero__input addHero__name"
        />
        <input
          type="text"
          placeholder="Adres/nazwa zdjęcia"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Adres/nazwa zdjęcia'"
          class="addHero__input addHero__image"
        />
        <input
          type="number"
          placeholder="Cena wynajmu /h"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Cena wynajmu /h'"
          class="addHero__input addHero__price"
        />
        <textarea
          type="text"
          placeholder="Opis Bohatera"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Opis Bohatera'"
          class="addHero__input addHero__description"
        ></textarea>
        <button type="button" class="addHero__submit">Submit</button>
      </form>`;
  document.getElementsByClassName("addHero__submit")[0].addEventListener("click", addHero);
};

const addHero = () => {
  const url = "http://localhost:3000/heroes";
  const addHeroName = document.getElementsByClassName("addHero__name")[0].value;
  if (addHeroName) {
    const hero = {
      name: addHeroName,
      description: document.getElementsByClassName("addHero__description")[0]
        .value,
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
  const url = "http://localhost:3000/heroes";
  fetch(url)
    .then(response => response.json())
    .then(heroes => {
      for (hero in heroes) {
        templateHeroes += `
          <option value="${heroes[hero].name}">
            ${heroes[hero].name}
          </option>`;
      }
      template = `
        <form class="editHero">
        <h2>Edytuj Herosa</h2>
        <label class="editHero__label"> Wybierz istniejącego Heroesa </label>
        <select class="editHero__select">
            <option disabled selected>--- WYBIERZ ---</option>
            ${templateHeroes}
        </select>
        <label class="editHero__label">Adres/nazwa zdjęcia</label>
        <input type="text" class="editHero__input editHero__image"/>
        <label class="editHero__label">Cena wynajmu /h</label>
        <input type="number" class="editHero__input editHero__price"/>
        <label class="editHero__label">Opis Bohatera</label>
        <textarea type="text" class="editHero__input editHero__description">
        </textarea>
        <button type="button" class="editHero__submit">Edytuj</button>
        </form>`;
      document.getElementsByTagName("main")[0].innerHTML = template;
      document.getElementsByClassName("editHero__select")[0].addEventListener("change", changeHero);
      document.getElementsByClassName("editHero__submit")[0].addEventListener("click", editHero);
    });
};

const changeHero = () => {
  const element = document.getElementsByClassName("editHero__select")[0];
  const heroName = element.options[element.selectedIndex].value;
  const url = "http://localhost:3000/heroes/" + heroName;
  fetch(url)
    .then(response => response.json())
    .then(hero => {
      document.getElementsByClassName(
        "editHero__input editHero__image"
      )[0].value = hero.image;
      document.getElementsByClassName(
        "editHero__input editHero__price"
      )[0].value = hero.price;
      document.getElementsByClassName(
        "editHero__input editHero__description"
      )[0].value = hero.description;
    });
};

const editHero = () => {
  const element = document.getElementsByClassName("editHero__select")[0];
  const heroName = element.options[element.selectedIndex].value;
  const url = "http://localhost:3000/heroes/" + heroName;
  const hero = {
    name: heroName,
    description: document.getElementsByClassName(
      "editHero__input editHero__description"
    )[0].value,
    image: document.getElementsByClassName("editHero__input editHero__image")[0]
      .value,
    price: document.getElementsByClassName("editHero__input editHero__price")[0]
      .value
  };
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(hero),
    headers: { "Content-Type": "application/json" }
  });
  location.reload();
};

const openDeleteHero = () => {
  let template = "";
  let templateHeroes = "";
  const url = "http://localhost:3000/heroes";
  fetch(url)
    .then(response => response.json())
    .then(heroes => {
      for (hero in heroes) {
        templateHeroes += `
          <option value="${heroes[hero].name}">
            ${heroes[hero].name}
          </option>`;
      }
      template = `
        <form class="deleteHero">
        <h2>Usuń Herosa :-(</h2>
        <label class="deleteHero__label"> Wybierz istniejącego Heroesa </label>
        <select class="deleteHero__select">
          <option disabled selected>--- WYBIERZ ---</option>
          ${templateHeroes}
        </select>
        <button type="button" class="deleteHero__submit">Usuń</button>
        </form>`;
      document.getElementsByTagName("main")[0].innerHTML = template;
      document.getElementsByClassName("deleteHero__submit")[0].addEventListener("click", deleteHero);
    });
};

const deleteHero = () => {
  const element = document.getElementsByClassName("deleteHero__select")[0];
  const url =
    "http://localhost:3000/heroes/" +
    element.options[element.selectedIndex].value;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  location.reload();
};

const openDeleteHeroes = () => {
  const url = "http://localhost:3000/heroes/";
  if (window.confirm("Czy na pewno chcesz usunąć wszystkich bohaterów?")) {
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
        template += `
          <div class="hero">
          <img src="${heroes[hero].image}" class="hero__image">
          <div class="hero__name">${heroes[hero].name}</div>
          <div class="hero__price">Cena wynajmu: ${heroes[hero].price}zł/h</div>
          <div id="${heroes[hero].name}" class="hero__click"></div>
          </div>`;
      }
      document.getElementsByClassName("heroes")[0].innerHTML = template;
    });
};

{/* <div class="hero" onclick="openModal('${heroes[hero].name}')"></div> */}

const saveToLocalStorage = () => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

const loadFromLocalStorage = () => {
  const basketFromLocalStorage = localStorage.getItem("basket");
  basket = JSON.parse(basketFromLocalStorage);
};

const openModal = (e) => {
  const heroName = e.target.id;
  console.log(e.target.id);
  const url = "http://localhost:3000/heroes/" + heroName;
  fetch(url)
    .then(response => response.json())
    .then(hero => {
      let template = "";
      template = `
        <div class="modal__close" onclick = "closeModal()">x</div>
        <div class="modal__image">
        <img src="${hero.image}">
        </div>
        <div class="modal__information">
        <h2 class="modal__name">I'M THE ${hero.name.toUpperCase()}</h2>
        <div class="modal__description">${hero.description}</div>
        <div class="modal__price">WYNAJEM: ${hero.price} ZŁ/H</div>`;
      if (hero.isAvailable) {
        template += `
          <button class="modal__submit" onclick="addToBasket('${hero.name}')">
            DODAJ DO KOSZYKA
          </button>`;
      } else {
        template += `
          <button class="modal__submit modal__submit--disabled" disabled">
            HERO ZAJĘTY
          </button>`;
      }
      template += "</div>";
      document.getElementsByClassName(
        "modal__container"
      )[0].innerHTML = template;
      modal.style.display = "block";
    });
};

const closeModal = () => {
  modal.style.display = "none";
};

const addToBasket = heroName => {
  basket.push(heroName);
  changeHeroIsAvailable(heroName, false);
  saveToLocalStorage();
  closeModal();
  location.reload();
};

const changeHeroIsAvailable = (heroName, status) => {
  const url = "http://localhost:3000/heroes/" + heroName;
  const hero = {
    name: heroName,
    isAvailable: status
  };
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(hero),
    headers: { "Content-Type": "application/json" }
  });
};

const showBasket = () => {
  let price = 0;
  let url = "";
  let template = "";
  basket.forEach(heroName => {
    url = `http://localhost:3000/heroes/${heroName}`;
    fetch(url)
      .then(response => response.json())
      .then(hero => {
        template += `
          <div class="basket__hero">
          <div class="basket__hero--width40">
          <img src="${hero.image}" class="basket__heroImage">
          </div>
          <div class="basket__hero--width60">
          <span>${hero.name}</span>
          <p class="basket__heroDescription">${hero.description}</p>
          <button type="button" class="basket__buttonDelete" onclick="deleteFromBasket('${hero.name}')">USUŃ Z KOSZYKA | x</button>
          </div>
          </div>`;
        price += Number(hero.price);
        if (price != 0) {
          document.getElementsByClassName(
            "basket__heroes"
          )[0].innerHTML = template;
          document.getElementsByClassName(
            "basket__price--colorRed"
          )[0].innerHTML = price + "zł";
        }
      });
  });
};

const deleteFromBasket = heroName => {
  basket.splice(basket.indexOf(heroName), 1);
  changeHeroIsAvailable(heroName, true);
  saveToLocalStorage();
  location.reload();
};

loadFromLocalStorage();
if (basket) {
  showHeroes();
  showBasket();
} else {
  basket = [];
  showHeroes();
}
document.getElementsByClassName("heroes")[0].addEventListener("click",openModal,false);