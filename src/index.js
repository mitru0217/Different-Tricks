// const axios = require('axios');
// const BASE_URL = 'https://pixabay.com/api/';
import ImageApiService from './api-service.js';
import photoCards from './templates/photos.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const searchForm = document.querySelector('.js-search-form');
let photosContainer = document.querySelector('.js-photos-container');
const loadMoreBtn = document.querySelector('.btn');

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

const imageApiService = new ImageApiService();

function onSearch(e) {
  e.preventDefault();

  imageApiService.query = e.currentTarget.elements.query.value.trim();

  if (imageApiService.query === '') {
    return alert('Fill the field');
  }

  imageApiService.resetPage();

  imageApiService
    .fetchImages()
    .then(hits => {
      clearPhotosContainer();
      appendPhotosMarkup(hits);
    })
    .catch(error => {
      if (Array.length === 0) {
        Notify.info(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
    });
}

function onLoadMore() {
  imageApiService.fetchImages().then(appendPhotosMarkup);
}

function appendPhotosMarkup(hits) {
  photosContainer.insertAdjacentHTML('beforeend', photoCards(hits));
}
function clearPhotosContainer() {
  photosContainer.innerHTML = '';
}

function markup({
  hits: [
    { webformatURL, largeImageURL, tags, likes, views, comments, downloads },
  ],
}) {
  photosContainer.innerHTML = `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="img-item"/>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments:</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>
  `;
}

// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.

// В ответе будет массив изображений удовлетворивших критериям параметров запроса. Каждое изображение описывается объектом, из которого тебе интересны только следующие свойства:

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.
// Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
//  В таком случае показывай уведомление с текстом "Sorry, there are no images matching your search query. Please try again.". Для уведомлений используй библиотеку notiflix.
// import './css/styles.css';
// import cardsList from './templates/cards-list.hbs';
// import cards from './templates/cards.hbs';
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import 'notiflix/dist/notiflix-3.2.5.min.css';
// import fetchCountries from './fetchCountries';

// const DEBOUNCE_DELAY = 300;
// const query = document.querySelector('#search-box');
// let countryList = document.querySelector('.country-list');

// query.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
// function onInputChange(e) {
//   e.preventDefault();
//   const searchQuery = e.target.value.trim();

//   if (searchQuery != '') {
//     fetchCountries(searchQuery)
//       .then(country => {
//         if (country.length > 10) {
//           Notify.info(
//             ` Too many matches found. Please enter a more specific name.`
//           );
//           countryList.innerHTML = '';
//         } else if (country.length >= 2) {
//           countryList.innerHTML = cardsList(country);
//         } else {
//           countryList.innerHTML = cards(country);
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         Notify.failure(`❌ Oops, there is no country with that name`);
//         countryList.innerHTML = '';
//       });
//   }
//   return (countryList.innerHTML = '');
// }
