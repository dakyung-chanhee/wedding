function throttle(fn, wait) {
  let lastTime = 0;
  return function () {
    const now = new Date().getTime();
    if (now - lastTime >= wait) {
      fn();
      lastTime = now;
    }
  };
}

class Character {
  constructor(who, start) {
    this.who = who;
    this.start = start;

    this.elem = document.getElementById(`anime-${who}-character`);
    this.sequence = 1;
    this.oldScroll = 0;
  }

  nextImage() {
    this.sequence = this.sequence < 4 ? this.sequence + 1 : 1;
    this.elem.src = `assets/images/bride-and-groom-anime/${this.who}-${this.sequence}.png`;
  }

  updateXByScrollY() {
    const scrollY = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pageWidth = (document.documentElement.scrollWidth - 100) / 2;
    const nextX = (scrollY / pageHeight) * pageWidth;

    if (this.start === 'left') {
      this.elem.style.left = `${nextX}px`;
    } else {
      this.elem.style.right = `${nextX}px`;
    }
  }

  updateDirectionByScrollY() {
    const scrollDirection = window.scrollY >= this.oldScroll ? 'down' : 'up';
    if (scrollDirection === 'down') {
      this.elem.style.transform = this.start === 'left' ? 'scaleX(-1)' : 'scaleX(1)';
    } else {
      this.elem.style.transform = this.start === 'left' ? 'scaleX(1)' : 'scaleX(-1)';
    }
    this.oldScroll = window.scrollY;
  }
}

function createScrollHandler(character) {
  const throttledNextImage = throttle(() => {
    character.nextImage();
  }, 150);

  return () => {
    character.updateXByScrollY();
    character.updateDirectionByScrollY();
    throttledNextImage();
  };
}

window.addEventListener('load', function () {
  const bride = new Character('bride', 'left');
  const groom = new Character('groom', 'right');

  bride.updateXByScrollY();
  groom.updateXByScrollY();

  const handleScrollBride = createScrollHandler(bride);
  const handleScrollGroom = createScrollHandler(groom);

  window.addEventListener('scroll', () => {
    handleScrollBride();
    handleScrollGroom();
  });
});

// TODO: Groom의 이미지 추가. 현재는 양쪽다 Bride로 되어있음.
// TODO: 말풍선 추가. "스크롤을 내려서 우리를 만나게 해주세요~!"
