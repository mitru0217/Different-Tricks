

import ImageApiService from './axiosApiService.js';
import photoCards from './templates/photos.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.js-search-form');
let photosContainer = document.querySelector('.js-photos-container');
const searchBtn = document.querySelector('.search-button');
const guard = document.querySelector('.js-guard');
const input = document.querySelector('.search-input');

input.addEventListener('input', onInput);

const imageApiService = new ImageApiService();

function onInput(e) {
  e.preventDefault();
  const inputValue = input.value;
  if (inputValue === '') {
    searchBtn.disabled = true;
    clearPhotosContainer();
    imageApiService.resetPage();
    observer.unobserve(guard);
    Notify.info('Please, fill the field');
    return;
  }
  searchBtn.disabled = false;
}

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  imageApiService.query = e.currentTarget.elements.query.value.trim();

  if (imageApiService.query === '') {
    clearPhotosContainer();
    Notify.failure('Please, fill the field');
    return;
  }
  clearPhotosContainer();

  imageApiService.resetPage();

  imageApiService.fetchImages().then(({ totalHits, hits }) => {
    if (hits.length === 0) {
      clearPhotosContainer();
      Notify.failure(
        `❌Sorry, there are no images matching your search query. Please try again.`
      );
    } else {
      appendPhotosMarkup(hits);
      observer.observe(guard);
      Notify.info(`Hooray! We found ${totalHits} images.`);
    }

    const totalPages = Math.ceil(totalHits / imageApiService.perPage);
    if (imageApiService.page > totalPages) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    smoothScroll();
  
  });
}

const observeOptions = {
  root: null,
  rootMargin: '300px',
  threshhold: 1,
};

function updateGallery(entries) {
  entries.forEach(entry => {
    console.log(entries);

    if (entry.isIntersecting) {
      imageApiService.fetchImages().then(({ hits }) => {
        appendPhotosMarkup(hits);
      });
    }
  });
}
const observer = new IntersectionObserver(updateGallery, observeOptions);

function appendPhotosMarkup(hits) {
  photosContainer.insertAdjacentHTML('beforeend', photoCards(hits));

  let lightbox = new SimpleLightbox('.gallery a');
  // loading.classList.remove('show');
}

function clearPhotosContainer() {
  photosContainer.innerHTML = '';
}
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    // top: cardHeight * 1,
    behavior: 'smooth',
  });
}
