/*----- constants -----*/
const BABY_IMAGE = 'assets/baby.png.webp';
const CHILD_IMAGE = 'assets/child.png.webp';
const TEEN_IMAGE = 'assets/teen.png.webp';
const ADULT_IMAGE = 'assets/adult.png.webp';
const EGG_STATE = 'assets/egg.png';
const MAX_BABY_AGE = '5';
const MAX_CHILD_AGE = '12';
const MAX_TEEN_AGE = '18';
const MAX_ADULT_AGE = '100';
const HEALTH_INTERVAL = '1000';
const HUNGER_INTERVAL = '500';
const HYGIENE_INTERVAL = '1000';
const HAPPINESS_INTERVAL = '750';
const AGE_INTERVAL = '5000';
/*----- app's state (variables) -----*/
let age;
let health;
let hunger;
let hygiene;
let happiness;

/*----- cached element references -----*/
const playBtnEl = document.querySelector('.play-button');
const welcomeModalEl = document.querySelector('.modal-welcome');
const gameoverModalEl = document.querySelector('.modal-game-over');
const tamagotchiContainerEl = document.querySelector('.tamagotchi-container');
const ageEl = document.querySelector('#js-age');
const hungerEl = document.querySelector('#js-hunger');
const happinessEl = document.querySelector('#js-happiness');
const hygieneEl = document.querySelector('#js-hygiene');
const healthEl = document.querySelector('#js-health');
const petImg = document.createElement('img');
petImg.classList.add('class', 'pet-img');
const feedBtnEl = document.querySelector('.feed');
const playtimeBtnEl = document.querySelector('.playtime');
const batheBtnEl = document.querySelector('.clean');
/*----- event listeners -----*/
playBtnEl.addEventListener('click', init);
feedBtnEl.addEventListener('click', feed);
playtimeBtnEl.addEventListener('click', playtime);
batheBtnEl.addEventListener('click', bathe);

/*----- functions -----*/
function init() {
	console.log('you clicked me.');
	//Hide welcome modal
	welcomeModalEl.classList.add('hide');
	//Initialize pet's age at 0
	age = 0;
	//Set stats to 100
	health = 10;
	hunger = 10;
	happiness = 10;
	hygiene = 10;
	//Create egg and append to container
	initEgg();
	handleAgeInterval();
	hungerDecay();
	happinessDecay();
	hygieneDecay();
	healthDecay();
}

function initEgg() {
	//Create an egg div
	petImg.setAttribute('src', EGG_STATE);
	//append egg div to tamagotchi-container
	tamagotchiContainerEl.appendChild(petImg);
}

function handleAgeInterval() {
	const ageTimer = setInterval(function () {
		//update the state age data
		age++;
		//update dom with the new age
		ageEl.innerText = age;
		renderPet();
        if (health <= 0){
            clearInterval(ageTimer)
        }
	}, AGE_INTERVAL);
}

function renderPet() {
	if (age === 1) {
		//If age is 1-5: show baby
		tamagotchiContainerEl.innerHTML = '';
		petImg.setAttribute('src', BABY_IMAGE);
		tamagotchiContainerEl.appendChild(petImg);
	} else if (age <= MAX_BABY_AGE) {
		return;
	} else if (age <= MAX_CHILD_AGE) {
		//If age is 6-12: show child
		petImg.setAttribute('src', CHILD_IMAGE);
	} else if (age <= MAX_TEEN_AGE) {
		//if age is 12-18: show teen
		petImg.setAttribute('src', TEEN_IMAGE);
	} else {
		//if age is > 18: show adult
		petImg.setAttribute('src', ADULT_IMAGE);
	}
}

function hungerDecay() {
	const hungerTimer = setInterval(function () {
		if (hunger > 0) {
			hunger--;
			hungerEl.innerText = hunger;
		}
	}, HUNGER_INTERVAL);
}

function happinessDecay() {
	const happinessTimer = setInterval(function () {
		if (happiness > 0) {
			happiness--;
			happinessEl.innerText = happiness;
		}
	}, HAPPINESS_INTERVAL);
}

function hygieneDecay() {
	const hygieneTimer = setInterval(function () {
		if (hygiene > 0) {
			hygiene--;
			hygieneEl.innerText = hygiene;
		}
	}, HYGIENE_INTERVAL);
}
function healthDecay() {
	const healthTimer = setInterval(function () {
		if (hunger === 0 || happiness === 0 || hygiene === 0) {
			if (health > 0) {
				health--;
				healthEl.innerText = health;
			} else {
            clearInterval(healthTimer)
            gameoverModalEl.removeAttribute('class', '.hide')
            }
		}
	}, HEALTH_INTERVAL);
}

function feed() {
	hunger += 10;
	hungerEl.innerText = hunger;
}
function playtime() {
	happiness += 10;
	happinessEl.innerText = happiness;
}
function bathe() {
	hygiene += 10;
	hygieneEl.innerText = hygiene;
}
