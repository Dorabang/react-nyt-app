import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
});

export default instance;
