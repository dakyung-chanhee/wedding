window.addEventListener('load', function () {
  const gallery = document.querySelector('section.gallery');
  imagesLoaded(gallery, function () {
    const masonry = new Masonry(gallery, {
      itemSelector: 'img',
    });
  });
});
