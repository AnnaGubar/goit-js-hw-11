import { Notify } from 'notiflix/build/notiflix-notify-aio';
import imgCardTpl from './templates/img-card.hbs';
import { getPictures } from './js/imgApi';
import { makeLightbox } from './js/ligthbox';
import './css/styles.css';

Notify.init({
  width: '430px',
  fontSize: '20px',
  clickToClose: true,
  borderRadius: '10px',

  info: {
    background: 'rgba(253, 253, 253,0.8)',
    textColor: '#472222',
    childClassName: 'notiflix-notify-info',
    notiflixIconColor: '#4ccca1',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
  },

  failure: {
    background: 'rgba(255, 85, 73,0.8)',
  },
});

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const btnLoadMoreRef = document.querySelector('.btn');

let page = 1;
let inputValue = '';

formRef.addEventListener('submit', searchHandler);
btnLoadMoreRef.addEventListener('click', loadMoreHandler);

function searchHandler(e) {
  e.preventDefault();
  galleryRef.innerHTML = '';

  inputValue = e.currentTarget.searchQuery.value;
  page = 1;

  getPictures(inputValue, page).then(img => {
    if (!img.totalHits) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    if (!inputValue) {
      Notify.info('You need to enter something for the search.');
      return;
    }

    Notify.info(`Hooray! We found ${img.totalHits} images.`);

    galleryRef.innerHTML = imgCardTpl(img.hits);

    makeLightbox();

    if (img.hits.length === 40) {
      btnLoadMoreRef.classList.remove('is-hidden');
    }
  });
}

function loadMoreHandler() {
  page += 1;

  getPictures(inputValue, page)
    .then(img => {
      galleryRef.insertAdjacentHTML('beforeend', imgCardTpl(img.hits));
      makeLightbox();

      if (img.hits.length < 40) {
        btnLoadMoreRef.classList.add('is-hidden');
      }

      if (page === 13) {
        Notify.info("We're sorry, but you've reached the end of search results.");
        btnLoadMoreRef.classList.add('is-hidden');
      }
    })
    .catch(error => console.log(error));
}
