// import ImageApiService from './api-service.js';
import ImageApiService from './axiosApiService.js';
import photoCards from './templates/photos.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.js-search-form');
let photosContainer = document.querySelector('.js-photos-container');
const searchBtn = document.querySelector('.search-button');
const toBtnTop = document.querySelector('.btn-to-top');
const loading = document.querySelector('.pulse-container');
const guard = document.querySelector('.js-guard');
// window.addEventListener('scroll', onScroll);
toBtnTop.addEventListener('click', onToTopBtn);

const imageApiService = new ImageApiService();

const observeOptions = {
  root: null,
  rootMargin: '300px',
  threshhold: 1,
};

function updateGallery(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      imageApiService.fetchImages().then(hits => {
        // lightbox.refresh();
        photoCards(hits);
        appendPhotosMarkup(hits);
      });
    }
  });
}
const observer = new IntersectionObserver(updateGallery, observeOptions);

// let simpleLightBox = null;
// let totalPics = 0;

searchForm.addEventListener('submit', onSearch);
function onSearch(e) {
  e.preventDefault();

  imageApiService.query = e.currentTarget.elements.query.value.trim();

  if (imageApiService.query === '') {
    clearPhotosContainer();
    return alert('Fill the field');
  }
  // searchBtn.disabled = false;
  // observer.unobserve(loading);

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

    // const totalPages = Math.ceil(totalHits / imageApiService.perPage);
    // if (imageApiService.page > totalPages) {
    //   Notify.warning(
    //     "We're sorry, but you've reached the end of search results."
    //   );
    // }
    // smoothScroll();
    console.log(hits);
  });
}

function appendPhotosMarkup(hits) {
  // lightbox.refresh();
  photosContainer.insertAdjacentHTML('beforeend', photoCards(hits));

  let lightbox = new SimpleLightbox('.gallery a');
  // lightbox.refresh('show.SimpleLightbox');
  // loading.classList.remove('show');
  // observer.observe(loading);
}

function clearPhotosContainer() {
  photosContainer.innerHTML = '';
}

// function showLoading() {
//   loading.classList.add('show');

//   setTimeout(loadMore, 1500);
// }

// function loadMore() {
//   if (imageApiService.page > Math.ceil(totalPics / imageApiService.perPage)) {
//     loading.classList.remove('show');
//     return;
//   }
// }
// function onScroll() {
//   const scrolled = window.pageYOffset;
//   const coords = document.documentElement.clientHeight;

//   if (scrolled > coords) {
//     toBtnTop.classList.add('btn-to-top--visible');
//   }
//   if (scrolled < coords) {
//     toBtnTop.classList.remove('btn-to-top--visible');
//   }
// }

function onToTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// function smoothScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
