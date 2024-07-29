window.addEventListener('load', function () {
  const galleryDialog = document.querySelector('#gallery-dialog');
  const galleryDialogImage = document.querySelector('#gallery-dialog-image');

  const galleryImages = document.querySelectorAll('.gallery-image');
  galleryImages.forEach((image) => {
    image.addEventListener('click', function () {
      galleryDialogImage.src = image.src;
      disableScroll();
      galleryDialog.showModal();
      handleDialogImageChanged();
    });
  });

  galleryDialog.addEventListener('click', function (event) {
    if (event.target === galleryDialog) {
      galleryDialogImage.src = '';
      galleryDialog.close();
    }
  });

  galleryDialog.addEventListener('close', enableScroll);
});

function prevImage() {
  const galleryDialogImage = document.querySelector('#gallery-dialog-image');
  const galleryImages = document.querySelectorAll('.gallery-image');
  const currentImageIndex = Array.from(galleryImages).findIndex((image) => image.src === galleryDialogImage.src);
  if (currentImageIndex > 0) {
    galleryDialogImage.src = galleryImages[currentImageIndex - 1].src;
  }
  handleDialogImageChanged();
}

function nextImage() {
  const galleryDialogImage = document.querySelector('#gallery-dialog-image');
  const galleryImages = document.querySelectorAll('.gallery-image');
  const currentImageIndex = Array.from(galleryImages).findIndex((image) => image.src === galleryDialogImage.src);
  if (currentImageIndex < galleryImages.length - 1) {
    galleryDialogImage.src = galleryImages[currentImageIndex + 1].src;
  }
  handleDialogImageChanged();
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}

function fitButtons() {
  const galleryDialogImage = document.querySelector('#gallery-dialog-image');

  const prevButton = document.querySelector('#gallery-dialog-prev');
  if (prevButton) {
    prevButton.style.left = `${galleryDialogImage.offsetLeft}px`;
  }

  const nextButton = document.querySelector('#gallery-dialog-next');
  if (nextButton) {
    nextButton.style.right = `${galleryDialogImage.offsetLeft}px`;
  }

  const closeButton = document.querySelector('#gallery-dialog-close');
  if (closeButton) {
    closeButton.style.right = `${galleryDialogImage.offsetLeft}px`;
    closeButton.style.top = `${galleryDialogImage.offsetTop}px`;
  }
}

function centerImage() {
  const galleryDialog = document.querySelector('#gallery-dialog');
  const galleryDialogImage = document.querySelector('#gallery-dialog-image');
  galleryDialogImage.style.marginTop = `${(galleryDialog.clientHeight - galleryDialogImage.clientHeight) / 2}px`;
}

function handleDialogImageChanged() {
  centerImage();
  fitButtons();
}
