window.addEventListener('load', function () {
  const galleryDialog = document.querySelector('#gallery-dialog');
  const galleryDialogImage = document.querySelector('#gallery-dialog-image');

  const galleryImages = document.querySelectorAll('.gallery-image');
  galleryImages.forEach((image) => {
    image.addEventListener('click', function () {
      galleryDialogImage.src = image.src;
      disableScroll();
      galleryDialog.showModal();
    });
  });

  galleryDialog.addEventListener('click', function (event) {
    if (event.target === galleryDialog) {
      galleryDialogImage.src = '';
      galleryDialog.close();
    }
  });

  galleryDialog.addEventListener('close', () => {
    enableScroll();
    galleryDialogImage.src = '';
  });
});

function prevImage() {
  const galleryDialogImage = document.querySelector('#gallery-dialog-image');
  const galleryImages = document.querySelectorAll('.gallery-image');
  const currentImageIndex = Array.from(galleryImages).findIndex((image) => image.src === galleryDialogImage.src);
  if (currentImageIndex > 0) {
    galleryDialogImage.src = galleryImages[currentImageIndex - 1].src;
  }
}

function nextImage() {
  const galleryDialogImage = document.querySelector('#gallery-dialog-image');
  const galleryImages = document.querySelectorAll('.gallery-image');
  const currentImageIndex = Array.from(galleryImages).findIndex((image) => image.src === galleryDialogImage.src);
  if (currentImageIndex < galleryImages.length - 1) {
    galleryDialogImage.src = galleryImages[currentImageIndex + 1].src;
  }
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}
