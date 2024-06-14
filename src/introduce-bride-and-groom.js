window.addEventListener('load', function () {
  transformIntroductionHorizontally();
  presentIntroductionDescription();
});

window.addEventListener('scroll', function () {
  transformIntroductionHorizontally();
  presentIntroductionDescription();
});

// for mobile
window.addEventListener('touchmove', function () {
  transformIntroductionHorizontally();
  presentIntroductionDescription();
});

function transformIntroductionHorizontally() {
  const section = document.querySelector('section.who');
  const imageContainer = document.querySelector('section.who .who-image-container');
  const firstImage = document.querySelector('section.who img:first-child');
  const lastImage = document.querySelector('section.who img:last-child');

  // 현재 스크롤 위치
  const scrollY = document.documentElement.scrollTop || window.scrollY;

  // 스크롤 시작 지점: 첫 번째 이미지가 중앙에 위치
  const scrollStartX = firstImage.offsetLeft + firstImage.offsetWidth / 2 - window.innerWidth / 2;

  // 스크롤 끝 지점: 마지막 이미지가 중앙에 위치
  const scrollEndX = lastImage.offsetLeft + lastImage.offsetWidth / 2 - window.innerWidth / 2;

  // 현재 위치가 섹션 위에 있는 경우
  if (scrollY < section.offsetTop) {
    imageContainer.style.transform = `translateX(${-scrollStartX}px)`;
    return;
  }

  // 현재 위치가 섹션 아래에 있는 경우
  if (scrollY > section.offsetTop + section.offsetHeight - window.innerHeight) {
    imageContainer.style.transform = `translateX(${-scrollEndX}px)`;
    return;
  }

  // 스크롤 비율에 따라 갤러리 이동
  const scrollRatio = (scrollY - section.offsetTop) / (section.offsetHeight - window.innerHeight);
  const nextX = scrollStartX + scrollRatio * (scrollEndX - scrollStartX);
  imageContainer.style.transform = `translateX(${-nextX}px)`;
}

function presentIntroductionDescription() {
  const section = document.querySelector('section.who');

  const descriptions = document.querySelectorAll('section.who .who-description');
  const descriptionCount = descriptions.length;

  const scrollY = document.documentElement.scrollTop || window.scrollY;
  const scrollStartY = section.offsetTop;
  const scrollEndY = section.offsetTop + section.offsetHeight - window.innerHeight;
  const scrollRatio = (scrollY - scrollStartY) / (scrollEndY - scrollStartY);

  let showingIndex = Math.floor(scrollRatio * descriptionCount);

  for (let i = 0; i < descriptionCount; i++) {
    const description = descriptions[i];
    description.style.visibility = i === showingIndex ? 'visible' : 'hidden';
  }
}
