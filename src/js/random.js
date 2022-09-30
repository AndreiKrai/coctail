import crateImageMarkUp from './murk-up';
import fetchRandomCocktail from './fetch';
import addMurkup from './add-murk-up';
// Andrei
import * as arrayFromLStorage from './addCoctToFav'
// import {addToLocalStCoctails} from './addCoctToFav'
// Andrei

const divRef = document.querySelector('.main__flex');
console.log(divRef)

let responseDrink = '';
let allPromises = [];

// Andrei

divRef.addEventListener('click',onAddCardBtnClick)
divRef.addEventListener('click',onLearnCardBtnClick)

function onAddCardBtnClick(e)

{if(!e.target.hasAttribute('data-action')) {return}
const card = allPromises.filter(coctail=>coctail.idDrink === e.target.dataset.id)[0]
console.log(card)
addToLocalStCoctails(card)
console.log(e.targets.attribute)
}

  function onLearnCardBtnClick(e){if(!e.target.hasAttribute('data-learnmoreid')) {return}
    console.log(e.target.dataset.learnmoreid)}
  
// Andrei && e.target.hasAttribute(Add to)



const windowScreen = window.screen.width;

if (windowScreen < 768) {
  getRandomData(3);
}
if (windowScreen >= 768 && windowScreen < 1280) {
  getRandomData(6);
}
if (windowScreen >= 1280) {
  getRandomData(12);
}

//запись данных в пустой массив
function getRandomCoctails(size) {
  const promises = [];
  for (let i = 0; i < size; i++) {
    promises.push(fetchRandomCocktail());
  }
  return promises;
}

// создание и добавление разметки
function returnAllCard(primises) {
  return Promise.all(primises)
    .then(data => data)
    .catch(error => console.log(error));
}
// aунция для фильтрации
function filterData(data = []) {
  return data.filter(
    ({ idDrink }, index, array) =>
      array.findIndex(obj => obj.idDrink === idDrink) === index
  );
}

let screenWidth = 0;

window.addEventListener(`resize`, checkSize);

function checkSize(e) {
  screenWidth = e.currentTarget.innerWidth;

  if (screenWidth < 768) {
    clearContainer();
    start(3);
  }
  if (screenWidth >= 768 && screenWidth < 1280) {
    clearContainer();
    start(6);
  }
  if (screenWidth >= 1280) {
    clearContainer();
    start(12);
  }
}

function clearContainer() {
  divRef.innerHTML = '';
}

// фильтрация промисей
async function getRandomData(size) {
  // Andrei
  if(divRef.dataset.page === 'favorite-coctails')
  {allPromises = arrayFromLStorage.arrayFromLStorage
    start(size)
    return;}
    // Andrei
  const promises = await getRandomCoctails(size);
  const data = await returnAllCard(promises);
  const fData = filterData(data);
  console.log(data)

  allPromises = [...fData];
  console.log(allPromises)

  start(size);
  //   fData.forEach(item => allPromises.push(item));
  //   if (fData.length < size) {
  //     const resultSize = size - fData.length;
  //     start(resultSize, allPromises);
  //   }
  //   return allPromises.slice(0, size);
  // }
}

async function start(number) {
  const renderArray = [...allPromises];
  renderArray.splice(number, allPromises.length);
  //   console.log('allPromises :>> ', allPromises);
  const create = await crateImageMarkUp(renderArray);
  addMurkup(create);
}

// to delete!!!
export function addToLocalStCoctails({strDrink, strDrinkThumb, idDrink}) {
  const localStorageData = localStorage.getItem('FAV_COCTAILS');
  const localStorageDataRes = JSON.parse(localStorageData);
  
  if (!localStorageData || localStorageDataRes.length === 0) {
    const favCoctArray = [{'strDrink':strDrink,'strDrinkThumb':strDrinkThumb,'idDrink':idDrink}];
    localStorage.setItem('FAV_COCTAILS', JSON.stringify(favCoctArray));
  } else {
    const newLocal = localStorageDataRes.concat({'strDrink':strDrink,'strDrinkThumb':strDrinkThumb,'idDrink':idDrink});
    localStorage.setItem('FAV_COCTAILS', JSON.stringify(newLocal));
    console.log(newLocal);
  }arrayFromLStorage=localStorageData

console.log(strDrink,strDrinkThumb,idDrink)
}
// to delete!!!
