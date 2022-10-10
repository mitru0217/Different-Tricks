import axios from 'axios';
// const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30307966-ea2e6055e88053146b4d64f93';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 20;
  }
  async fetchImages() {
    const params = {
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.per_page,
    };
    try {
      const response = await axios.get(`${BASE_URL}`, { params });
      this.page += 1;
      return response.data;
    } catch (error) {}
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
// .then(r => {
//   if (!r.ok) {
//     throw new Error(mistake);
//   }
//   return r.json();
// })
