const slider = $('.slider__list').bxSlider({
    pager: false,
    controls: false
});

$('.slider__arroy--left').click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
});

$('.slider__arroy--right').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
});
