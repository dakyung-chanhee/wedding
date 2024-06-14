window.addEventListener('load', function () {
  const gallery = document.querySelector('section.gallery');
  console.log('gallery:', gallery);
  imagesLoaded(gallery, function () {
    console.log('All images are loaded');
    const masonry = new Masonry(gallery, {
      itemSelector: 'img',
    });
  });
});
