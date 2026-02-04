const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const dotsContainer = document.querySelector('.carousel-dots');
const dots = Array.from(dotsContainer.children);

let currentSlide = 0;
const totalSlides = slides.length;

let autoPlayInterval;

function moveToSlide(targetIndex) {
    track.style.transform = `translateX(-${targetIndex * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[targetIndex].classList.add('active');
    
    currentSlide = targetIndex;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    moveToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    moveToSlide(prevIndex);
}

// Start auto-play
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

// Stop auto-play
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Event listeners
nextButton.addEventListener('click', () => {
    nextSlide();
    stopAutoPlay();
    startAutoPlay(); // Restart auto-play after manual interaction
});

prevButton.addEventListener('click', () => {
    prevSlide();
    stopAutoPlay();
    startAutoPlay();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        moveToSlide(index);
        stopAutoPlay();
        startAutoPlay();
    });
});

// Pause on hover
track.addEventListener('mouseenter', stopAutoPlay);
track.addEventListener('mouseleave', startAutoPlay);

// Start auto-play on page load
startAutoPlay();

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
});

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
}