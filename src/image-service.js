export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    const url = `https://pixabay.com/api/?key=30307966-ea2e6055e88053146b4d64f93&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=5`;
    return fetch(url)
      .then(r => {
        if (!r.ok) {
          throw new Error(mistake);
        }
        return r.json();
      })
      .then(data => {
        this.page += 1;
        return data;
      });
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
