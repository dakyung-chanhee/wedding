window.addEventListener('load', function () {
  const galleryDialog = document.querySelector('#gallery-dialog');
  const galleryDialogImage = document.querySelector('#gallery-dialog-image');

  const galleryImages = document.querySelectorAll('.gallery-image');
  galleryImages.forEach((image) => {
    image.addEventListener('click', function () {
      galleryDialogImage.src = image.src;
      galleryDialog.showModal();
    });
  });

  galleryDialog.addEventListener('click', function (event) {
    if (event.target === galleryDialog) {
      galleryDialog.close();
    }
  });
});
