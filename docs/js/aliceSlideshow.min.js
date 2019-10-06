var slides = document.querySelectorAll('.alice-application__image');
var sliderBullets = document.querySelectorAll('.slider-bullet');
var sliderLinks = document.querySelectorAll('.alice-application__advantages-item');

var sliderTimer = {
  interval: 5000,
  disabled: false,
  currentSlide: 0
};

function onSlideSelected(slideNr) {  
  for (let nr = 0; nr < slides.length; nr++) {
    let action = 'remove';
    if (nr == slideNr) {
      action = 'add';
    }
    slides[nr].classList[action]('active');
    sliderBullets[nr].classList[action]('active');
    sliderLinks[nr].classList[action]('active');
  }
}

function setOnclickEvents() {
  for (let nr = 0; nr < slides.length; nr++) {
    sliderBullets[nr].addEventListener('click', function() {
      sliderTimer.disabled = true;
      onSlideSelected(nr);
    });
    sliderLinks[nr].addEventListener('click', function() {
      sliderTimer.disabled = true;
      onSlideSelected(nr);
    });
  }
}

function runTimer() {
  let timer = setInterval(function() {
    if (sliderTimer.disabled) {
      clearInterval(timer);
    } else {
      sliderTimer.currentSlide = (sliderTimer.currentSlide + 1) % slides.length;
      onSlideSelected(sliderTimer.currentSlide);
    }
  }, sliderTimer.interval);
}

setOnclickEvents();
runTimer();
