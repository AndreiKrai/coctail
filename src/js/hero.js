import * as API from '../servises/cocktails-api';
import crateImageMarkUp from './murk-up';
import { wichDataToUse, numberOfCards } from './random';

const ulContainer = document.querySelector('.hero-list');
const renderContainer = document.querySelector('.main__flex');
const errorContainer = document.querySelector('.sorry');

ulContainer.addEventListener('click', onClickBtn);

export default async function onClickBtn(event) {
  const value = event.target.dataset.value.toLowerCase();
  if (event.target.nodeName !== 'LI') {
    return;
  }
  try {
    const responseData = await API.fetchGetData(value);

    wichDataToUse(numberOfCards, responseData.drinks);

    const markup = crateImageMarkUp(responseData.drinks);

    errorContainer.classList.add('error-hidden');
  } catch (error) {
    renderContainer.innerHTML = '';
    errorContainer.classList.remove('error-hidden');
  }
}
