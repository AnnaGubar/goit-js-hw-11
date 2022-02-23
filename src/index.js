import { Notify } from 'notiflix/build/notiflix-notify-aio';
import imgCardTpl from './templates/img-card.hbs';
import './css/styles.css';

const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '25849699-edc9a69ae2fd4562ebcb7ccdf';
const searchSettings = 'image_type=photo&orientation=horizontal&safesearch=true';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const btnLoadMoreRef = document.querySelector('.btn');

formRef.addEventListener('submit', searchHandler);
btnLoadMoreRef.addEventListener('click', loadMoreHandler);

function searchHandler(e) {
  e.preventDefault();

  let inputValue = e.currentTarget.searchQuery.value;

  fetch(`${BASE_URL}?key=${apiKey}&q=${inputValue}&${searchSettings}`)
    // fetch(`${BASE_URL}?key=${apiKey}&q=cat&${searchSettings}`)
    .then(res => res.json())
    .then(img => {
      if (!img.totalHits) {
        Notify.info('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
      if (!inputValue) {
        Notify.info('You need to enter something for the search.');
        return;
      }
      galleryRef.innerHTML = imgCardTpl(img.hits);
      btnLoadMoreRef.classList.remove('is-hidden');
    });
}

function loadMoreHandler(e) {
  e.preventDefault();
}

function renderImgCards(img) {
  galleryRef.innerHTML = imgCardTpl(img.hits);
}
