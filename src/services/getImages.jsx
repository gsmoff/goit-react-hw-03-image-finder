// import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33296635-0af8ec3a9521ccdc47f44affa';

export function getImages(searchText, page) {
    return fetch(
        `${BASE_URL}?q=${searchText}&key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
}
