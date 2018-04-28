"use strict";

(function () {
    let slider = document.querySelector('.slider__items');
    let sliderArrows = document.querySelector('.slider__nav-arrows');
    let sliderDots = document.querySelector('.slider__nav-dots');

    function slideArrow(e) {
        let items = [];
        [].slice.call(slider.children).map(function (item) {
            if (item.classList.contains('slider__item')) {
                items.push(item);
            }
        });
        let activeItem = slider.querySelector('.slider__item--active');
        let index = items.indexOf(activeItem);
        let target = e.target;
        while (this != target){
            // [].slice.call(sliderDots.children).map(function (item) {
            //     if (item.classList.contains('slider__nav-dot--active')){
            //         item.classList.remove('slider__nav-dot--active')
            //     }
            // });
            if (e.target.classList.contains('slider__prev')) {
                if (index > 0) {
                    items[index--].classList.remove('slider__item--active');
                    items[index++].classList.add('slider__item--active');
                    sliderDots.children[index--].classList.remove('slider__nav-dot--active');
                    sliderDots.children[index].classList.add('slider__nav-dot--active')
                }
            } else if (e.target.classList.contains('slider__next')) {
                if (index < items.length-1) {
                    items[index++].classList.remove('slider__item--active');
                    items[index--].classList.add('slider__item--active');
                    sliderDots.children[index++].classList.remove('slider__nav-dot--active');
                    sliderDots.children[index].classList.add('slider__nav-dot--active')
                }
            }
            target = target.parentNode;
        }
    }

    (function () {
        [].slice.call(slider.children).map(function (item) {
            let sliderDot = document.createElement('div');
            sliderDot.className = 'slider__nav-dot';
            sliderDots.appendChild(sliderDot);
        });
        sliderDots.children[0].classList.add('slider__nav-dot--active');
    })();

    function slideDot(e) {
        let target = e.target;
        while (this != target){
            if (target.classList.contains('slider__nav-dot')){
                [].slice.call(this.children).map(function (item, index) {
                    if (item.classList.contains('slider__nav-dot--active')){
                        item.classList.remove('slider__nav-dot--active');
                        slider.children[index].classList.remove('slider__item--active');
                    }
                });
                target.classList.add('slider__nav-dot--active');
                let index = [].slice.call(this.children).indexOf(target);
                // [].slice.call(slider.children).map(function (item) {
                //     if (item.classList.contains('slider__item--active')){
                //         item.classList.remove('slider__item--active')
                //     }
                // });
                slider.children[index].classList.add('slider__item--active');
            }
            target = target.parentNode;
        }
    }

    sliderArrows.addEventListener('click', slideArrow);
    sliderDots.addEventListener('click', slideDot);
})();