const modal = document.getElementsByClassName('modal')[0];
let heroes = {};

const openAddHero = () => {
    document.getElementsByTagName('main')[0].innerHTML = ''
    +    '<form class="addHero" >'
    +        '<h2>Dodaj Herosa</h2>'
    +        '<input '
    +            'type="text" '
    +            'placeholder="Nazwa Bohatera" '
    +            'class="addHero__input addHero__name" '
    +        '/>'
    +        '<input '
    +            'type="text" '
    +            'placeholder="Adres/nazwa zdjęcia" '
    +            'class="addHero__input addHero__image" '
    +        '/>'
    +        '<input '
    +            'type="number" '
    +            'placeholder="Cena wynajmu /h" '
    +            'class="addHero__input addHero__price" '
    +        '/>'
    +        '<textarea '
    +            'type="text" '
    +            'placeholder="Opis Bohatera" '
    +            'class="addHero__input addHero__description" '
    +        '></textarea>'
    +        '<button type="button" class="addHero__submit" onclick="addHero()">Submit</button>'
    +  '</form>';
};

const addHero = () => {
    let addHeroName = document.getElementsByClassName("addHero__name")[0].value;
    let addHeroImage = document.getElementsByClassName("addHero__image")[0].value;
    let addHeroPrice = document.getElementsByClassName("addHero__price")[0].value;
    let addHeroDescription = document.getElementsByClassName("addHero__description")[0].value;
    if(addHeroName){
        heroes[addHeroName] = {
            name: addHeroName,
            image: addHeroImage,
            description: addHeroDescription,
            price: addHeroPrice,
            isAvailable: true
        };
        saveToLocalStorage();
        location.reload();
    }
};

const showHeroes = () => {
    let template = '';
    for(hero in heroes){
        template += ''
            +'<div class="hero" onclick="openModal('+"'"+heroes[hero].name+"'"+')"> '
            +'<img src="'+heroes[hero].image+'" class="hero__image">'
            +    '<div class="hero__name">'+heroes[hero].name+'</div>'
            +    '<div class="hero__price">Cena wynajmu: '+heroes[hero].price+'zł/h</div>'
            +'</div>'
    }
    document.getElementsByTagName('main')[0].innerHTML = template;
}

const saveToLocalStorage = () => {
    localStorage.setItem("heroes",JSON.stringify(heroes));
};

const loadFromLocalStorage = () => {
    let heroesFromLocalStorage = localStorage.getItem("heroes");
    heroes = JSON.parse(heroesFromLocalStorage);
    console.log(heroes);
}

const openModal = (heroName) => {
    modal.style.display = 'block';
};

const closeModal = () => {
    modal.style.display = 'none';
};

const addToBasket = heroName => {
//   heroes[heroName].isAvailable = false;
  closeModal();
};

loadFromLocalStorage();
if(heroes){
    showHeroes();
}else{heroes = {};
};