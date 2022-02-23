import { Notify } from 'notiflix/build/notiflix-notify-aio';
import imgCardTpl from './templates/img-card.hbs';
import './css/styles.css';

let page = 1;
const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '25849699-edc9a69ae2fd4562ebcb7ccdf';
const searchSettings = `image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const btnLoadMoreRef = document.querySelector('.btn');

formRef.addEventListener('submit', searchHandler);
btnLoadMoreRef.addEventListener('click', loadMoreHandler);

function searchHandler(e) {
  e.preventDefault();

  let inputValue = e.currentTarget.searchQuery.value;

  fetch(`${BASE_URL}?key=${apiKey}&q=${inputValue}&${searchSettings}&page=${page}`)
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
  
  // console.log('⭐ ~ inputValue', inputValue);
  // loadMoreHandler(e,inputValue);
}


function loadMoreHandler(e, xxx) {
  e.preventDefault();
  // let inputValue = e.currentTarget.searchQuery.value;
  const x = xxx;
  // console.log('⭐ ~ inputValue', inputValue);
  // console.log("⭐ ~ x", x)
  // page += 1
  fetch(`${BASE_URL}?key=${apiKey}&q=${x}&${searchSettings}&page=2`)
    // fetch(`${BASE_URL}?key=${apiKey}&q=cat&${searchSettings}`)
    .then(res => res.json())
    .then(img => {
      console.log(img);
      galleryRef.innerHTML = imgCardTpl(img.hits)
    })
    
};

function renderImgCards(img) {
  galleryRef.innerHTML = imgCardTpl(img.hits);
}
