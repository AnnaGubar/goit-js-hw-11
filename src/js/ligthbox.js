import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function makeLightbox() {
  new SimpleLightbox('.gallery a', {
    navText: ['←', '→'],
    overlayOpacity: 0.6,

    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}
