// import ImageApiService from './api-service.js';
import ImageApiService from './axiosApiService.js';
import photoCards from './templates/photos.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    clearPhotosContainer();
    return alert('Fill the field');
  }

  imageApiService.resetPage();

  imageApiService.fetchImages().then(({ totalHits, hits }) => {
    if (hits.length === 0) {
      Notify.failure(
        `❌Sorry, there are no images matching your search query. Please try again.`
      );
    }
    Notify.info(`Hooray! We found ${totalHits} images.`);
    console.log(hits);
    clearPhotosContainer();
    appendPhotosMarkup(hits);
  });
}

function onLoadMore() {
  lightbox.refresh();
  imageApiService.fetchImages().then(appendPhotosMarkup);
}

function appendPhotosMarkup(hits) {
  photosContainer.insertAdjacentHTML('beforeend', photoCards(hits));

  let lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function clearPhotosContainer() {
  photosContainer.innerHTML = '';
}

// .then(response => {
//   return response;
// })
// .then(({ data: { total, totalHits, hits } }) => {
//   this.page += 1;
//   if (totalHits === 0) {
//     Notify.failure(
//       `❌Sorry, there are no images matching your search query. Please try again.`
//     );
//   } else {
//     Notify.info(`Hooray! We found ${totalHits} images.`);
//   }

//   return hits;
