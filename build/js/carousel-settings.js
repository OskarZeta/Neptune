$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    items: 1,
    center: true,
    dots: true,
    dotsClass: 'slider__nav-dots',
    dotClass: 'slider__nav-dot',
    nav: true,
    navContainerClass: 'slider__nav-arrows',
    navClass: ['slider__prev', 'slider__next']
  });
  let dots = document.querySelector('.slider__nav-dots');
  let arrows = document.querySelector('.slider__nav-arrows');
  let dotsWidth = -($('.slider__nav-dots').width());
  let arrowsWidth = -($('.slider__nav-arrows').width());
  dots.style.marginLeft = dotsWidth/2;
  arrows.style.marginLeft = arrowsWidth/2;
  ////function to dynamically update arrow buttons' position on screen while resizing browser
  $(window).resize(function () {
    arrowsWidth = -($('.slider__nav-arrows').width());
    arrows.style.marginLeft = arrowsWidth/2;
  });
});