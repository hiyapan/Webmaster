const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length; 
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
const playPauseButton = document.getElementById('playPause');
const playPauseImg = document.getElementById('playPauseImg');
let currentIndex = 1; 
let interval;
let isPlaying = true;
let isTransitioning = false;

// Event listener for first or last slides
slides.addEventListener('transitionend', () => {
  if (currentIndex === 0) {
    currentIndex = slideCount - 2; 
    updateSlidePosition(false); 
  } else if (currentIndex === slideCount - 1) {
    currentIndex = 1; 
    updateSlidePosition(false); 
  }
  isTransitioning = false;
});

function updateSlidePosition(transition = true) {
  slides.style.transition = transition ? 'transform 1s ease-in-out' : 'none';
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex++;
  if (currentIndex === slideCount) {
    currentIndex = 1;
  }
  updateSlidePosition();
}

function previousSlide() {
  if (isTransitioning) return; 
  isTransitioning = true;

  currentIndex--;
  if (currentIndex === -1) {
    currentIndex = slideCount - 2; 
  }
  updateSlidePosition();
}

function startSlideshow() {
  interval = setInterval(nextSlide, 4000);
  isPlaying = true;
  playPauseImg.src = './images/pausebutton.png';
}

function stopSlideshow() {
  clearInterval(interval);
  isPlaying = false;
  playPauseImg.src = './images/playbutton.png';
}

// Initialize the slideshow
function init() {
  updateSlidePosition(false);
  startSlideshow();
}

// Event listeners for navigation and controls
// Event listeners for navigation and controls
leftArrow.addEventListener('click', () => {
  currentIndex--;
  updateSlidePosition();
});

rightArrow.addEventListener('click', nextSlide);

playPauseButton.addEventListener('click', () => {
  if (isPlaying) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const hiddenElements = document.querySelectorAll('.hidden');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing after it's visible
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

  hiddenElements.forEach(element => observer.observe(element));
});


init();

/*Testimonials JS*/
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const testimonialsContainer = document.getElementById('testimonials-container');
  const testimonials = document.querySelectorAll('.testimonial');
  const totalTestimonials = testimonials.length;
  let currentIndex = 0;

  function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  testimonialsContainer.addEventListener('mousemove', (event) => {
      const containerWidth = testimonialsContainer.offsetWidth;
      const hoverX = event.clientX - testimonialsContainer.getBoundingClientRect().left;

      if (hoverX < containerWidth / 2) {
          testimonialsContainer.classList.add('left-hover');
          testimonialsContainer.classList.remove('right-hover');
          testimonialsContainer.style.cursor = 'w-resize'; 

      } else {
          testimonialsContainer.classList.add('right-hover');
          testimonialsContainer.classList.remove('left-hover');
          testimonialsContainer.style.cursor = 'e-resize'; 
      }
  });

  testimonialsContainer.addEventListener('mouseleave', () => {
      testimonialsContainer.classList.remove('left-hover', 'right-hover');
  });

  testimonialsContainer.addEventListener('click', (event) => {
      const containerWidth = testimonialsContainer.offsetWidth;
      const clickX = event.clientX - testimonialsContainer.getBoundingClientRect().left;

      if (clickX < containerWidth / 2 && currentIndex > 0) {
          currentIndex--;
      } else if (clickX >= containerWidth / 2 && currentIndex < totalTestimonials - 1) {
          currentIndex++;
      }
      updateSlider();
  });
});

//recurring animations js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
    } else{
      entry.target.classList.remove('visible');
    }
  })
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));



