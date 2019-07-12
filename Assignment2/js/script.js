const FPS = 60,
  HOLD_DELAY = 3000,
  ANIMATION_TIME = 150,
  IMAGE_WIDTH = 940,
  IMAGE_HEIGHT = 600,
  SLIDER_BUTTON_ICON_COLOR = 'white',
  SLIDEER_BUTTON_BG_COLOR = 'rgba(0,0,0,0.3)',
  INACTIVE_CAROUSEL_INDICATOR_BG_COLOR = 'rgba(255, 255, 255, 0.7)',
  ACTIVE_CAROUSEL_INDICATOR_BG_COLOR = 'rgb(0,150,255)';

/**
 * RESET MARGIN AND PADDING
 */
document.body.style.margin = `0px`;
document.body.style.padding = `0px`;
document.body.style.boxSizing = 'border-box';

let carouselContainer = document.querySelector('.carousel-container'),
  carouselImageWrapper = document.querySelector('.carousel-image-wrapper');

carouselContainer.style.display = 'none';

let imageCollection = document.querySelectorAll('.carousel-image-wrapper img');
const numOfImages = imageCollection.length;


let sliderBtnContainer = document.createElement('div'),
  prevBtn = document.createElement('i'),
  nextBtn = document.createElement('i');
/**
 * PREVIOUSE BUTTON
 */
prevBtn.setAttribute('id', '#prev-btn');
prevBtn.setAttribute('class', 'fas fa-chevron-left');
prevBtn.style.position = 'absolute';
prevBtn.style.top = '50%';
prevBtn.style.left = '0';
prevBtn.style.padding = '100px 50px'
prevBtn.style.transform = 'translate(0, -50%)';
prevBtn.style.color = SLIDER_BUTTON_ICON_COLOR;
prevBtn.style.fontSize = '30px';
prevBtn.style.background = SLIDEER_BUTTON_BG_COLOR;
prevBtn.style.border = 'none';

/**
 * NEXT BUTTON
 */
nextBtn.setAttribute('id', '#nextBtn');
nextBtn.setAttribute('class', 'fas fa-chevron-right');
nextBtn.style.position = 'absolute';
nextBtn.style.top = '50%';
nextBtn.style.right = '0';
nextBtn.style.padding = '100px 50px';
nextBtn.style.transform = 'translate(0,-50%)';
nextBtn.style.color = SLIDER_BUTTON_ICON_COLOR;
nextBtn.style.fontSize = '30px';
nextBtn.style.background = SLIDEER_BUTTON_BG_COLOR;
nextBtn.style.border = 'none';

sliderBtnContainer.appendChild(prevBtn);
sliderBtnContainer.appendChild(nextBtn);
carouselContainer.appendChild(sliderBtnContainer);

/**
 * CAROUSEL CONTAINER
 */
carouselContainer.style.width = IMAGE_WIDTH + 'px';
carouselContainer.style.height = IMAGE_HEIGHT + 'px';
carouselContainer.style.overflow = 'hidden';
carouselContainer.style.margin = '0 auto';
carouselContainer.style.position = 'relative';

/**
 * CAROUSEL IMAGE WRAPPER
 */
carouselImageWrapper.style.marginLeft = `0px`;
carouselImageWrapper.style.width = IMAGE_WIDTH * numOfImages + 'px';
carouselImageWrapper.style.height = IMAGE_HEIGHT;

/**
 * DOTS WRAPPER
 */
let dotsWrapper = document.createElement('div');
dotsWrapper.className = "dots-wrapper";
dotsWrapper.style.display = "inline-block";
dotsWrapper.style.position = "absolute";
dotsWrapper.style.left = `50%`;
dotsWrapper.style.transform = `translate(-50%, 0%)`;
dotsWrapper.style.bottom = `5px`;
dotsWrapper.margin = `0, auto`;
carouselContainer.appendChild(dotsWrapper);

for (image of imageCollection) {
  //IMAGE
  image.style.maxWidth = IMAGE_WIDTH + 'px';
  image.style.height = IMAGE_HEIGHT + 'px';
  image.style.float = 'left';

  /**
   * CAROUSEL INDICATORS
   */
  let indicator = document.createElement('div');
  indicator.className = "indicator";
  indicator.style.display = "inline-block";
  indicator.style.height = `15px`;
  indicator.style.width = `15px`;
  indicator.style.background = INACTIVE_CAROUSEL_INDICATOR_BG_COLOR;
  indicator.style.borderRadius = `50%`;
  indicator.style.marginRight = `15px`;
  indicator.style.cursor = `pointer`;
  dotsWrapper.appendChild(indicator);
}

let listOfIndicator = document.querySelectorAll('.dots-wrapper .indicator');

/**
 * INDICATES CURRENT IMAGE
 */
let currentImageIndicator = () => {
  listOfIndicator.forEach((eachIndicator, index) => {
    eachIndicator.style.background = INACTIVE_CAROUSEL_INDICATOR_BG_COLOR;
    eachIndicator.addEventListener('click', (e) => {
      listOfIndicator[currentIndex - 1].style.background = INACTIVE_CAROUSEL_INDICATOR_BG_COLOR;
      currentIndex = carouselTransition(currentIndex, index + 1);
      listOfIndicator[currentIndex - 1].style.background = ACTIVE_CAROUSEL_INDICATOR_BG_COLOR;
    });
    eachIndicator.addEventListener('mouseenter', (e) => {
      clearInterval(autoAnimate);
    });
    eachIndicator.addEventListener('mouseleave', (e) => {
      autoAnimate = setInterval(animate, HOLD_DELAY);
    })
  });

  listOfIndicator[currentIndex - 1].style.background = ACTIVE_CAROUSEL_INDICATOR_BG_COLOR;
}


let isNextImageReq, isPrevImageReq,
  marginLeft = 0,
  currentIndex = 1;

/**
 * 
 * @param {Number} currentIndex Current Image Index
 * @param {Number} nextIndex Next Image Index
 */
let carouselTransition = (currentIndex, nextIndex) => {
  let indexDiff = nextIndex - currentIndex;
  let totalMarginDistance = indexDiff * IMAGE_WIDTH;
  let transitionSpeed = totalMarginDistance / ANIMATION_TIME;
  isNextImageReq = (nextIndex > currentIndex) ? true : false;
  isPrevImageReq = (nextIndex < currentIndex) ? true : false;

  var transition = setInterval(() => {
    marginLeft -= transitionSpeed;

    carouselImageWrapper.style.marginLeft = `${marginLeft}px`;

    if (isNextImageReq && marginLeft < -(nextIndex - 1) * IMAGE_WIDTH) {
      clearInterval(transition);
      marginLeft = -(nextIndex - 1) * IMAGE_WIDTH;
      carouselImageWrapper.style.marginLeft = `${marginLeft}px`;
    }

    if (isPrevImageReq && marginLeft > -(nextIndex - 1) * IMAGE_WIDTH) {
      clearInterval(transition);
      marginLeft = -(nextIndex - 1) * IMAGE_WIDTH;
      carouselImageWrapper.style.marginLeft = `${marginLeft}px`;
    }
  }, 1)
  return currentIndex = nextIndex;

}

/**
 * ANIMATES CAROUSEL
 */
let animate = () => {
  if (currentIndex == numOfImages) {
    currentIndex = 1;
    currentIndex = carouselTransition(numOfImages, currentIndex);
  } else if (currentIndex < 1) {
    currentIndex = numOfImages;
    currentIndex = carouselTransition(1, numOfImages);
  } else {
    currentIndex = carouselTransition(currentIndex, currentIndex + 1);
  }
  currentImageIndicator();
}

/**
 * STARTS ANIMATING CAROUSEL AFTER ALL THE IMAGES ARE LOADED
 */
let autoAnimate;
window.onload = (e) => {
  carouselContainer.style.display = 'block';
  autoAnimate = setInterval(animate, HOLD_DELAY);
  currentImageIndicator();
}

/**
 * PREVIOUS BUTTON CLICK, GOES BACK TO PREVIOUS IMAGE
 */
prevBtn.addEventListener('click', (e) => {
  if (currentIndex < 2) {
    currentIndex = numOfImages;
    currentIndex = carouselTransition(1, numOfImages);
  } else {
    currentIndex = carouselTransition(currentIndex, currentIndex - 1)
  }
  currentImageIndicator();

})

/**
 * NEXT BUTTON CLICK, GOES TO NEXT SLIDE
 */
nextBtn.addEventListener('click', (e) => {
  if (currentIndex == numOfImages) {
    currentIndex = 1;
    currentIndex = carouselTransition(numOfImages, currentIndex);
  } else {
    currentIndex = carouselTransition(currentIndex, currentIndex + 1)
  }
  currentImageIndicator();
})

/**
 * PAUSE ANIMATION WHEN HOVERING ON PREV OR NEXT BUTTON
 */
prevBtn.addEventListener('mouseenter', (e) => {
  clearInterval(autoAnimate);
})

prevBtn.addEventListener('mouseleave', (e) => {
  autoAnimate = setInterval(animate, HOLD_DELAY);
})

nextBtn.addEventListener('mouseenter', (e) => {
  clearInterval(autoAnimate);
})

nextBtn.addEventListener('mouseleave', (e) => {
  autoAnimate = setInterval(animate, HOLD_DELAY);
})