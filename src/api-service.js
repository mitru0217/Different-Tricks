// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import 'notiflix/dist/notiflix-3.2.5.min.css';

// const BASE_URL = 'https://pixabay.com/api';
// const API_KEY = '30307966-ea2e6055e88053146b4d64f93';
// export default class ImageApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }
//   fetchImages() {
//     const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=20`;
//     return fetch(url)
//       .then(r => {
//         if (!r.ok) {
//           throw new Error(mistake);
//         }
//         return r.json();
//       })
//       .then(({ total, totalHits, hits }) => {
//         this.page += 1;
//         if (totalHits === 0) {
//           Notify.failure(
//             `❌Sorry, there are no images matching your search query. Please try again.`
//           );
//         } else {
//           Notify.info(`Hooray! We found ${totalHits} images.`);
//         }

//         return hits;
//       });
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
