'use strict';

(function () {
    let services = document.querySelector('.spa__services-list');
    let topMenuBtn = document.querySelector('.header__top-menu-mobile');
    let navMenuBtn = document.querySelector('.header__navigation-mobile');
    let upBtn = document.querySelector('.contacts__up');

    function toggleActiveService(e) {
        let target = e.target;
        let activeServ = this.querySelector('.spa__service--active');
        if (activeServ){
            activeServ.classList.remove('spa__service--active');
        }
        while (target != this){
            if (target.classList.contains('spa__service-desc')) {
                target.parentNode.classList.add('spa__service--active');
            }
            target = target.parentNode;
        }
    }
    function toggleMenu(e) {
        let menuItems = e.currentTarget.parentNode.children[1];
        menuItems.classList.toggle('visible');
    }
    function goUp() {
        let header = document.querySelector('.header');
        header.scrollIntoView({
            behavior: 'smooth'
        });
    }
    function checkScroll(e) {
        if (e.target.body.scrollTop >= e.target.body.scrollHeight/2) {
            upBtn.classList.add('contacts__up--visible');
        } else upBtn.classList.remove('contacts__up--visible');
    }

    window.addEventListener('scroll', checkScroll);
    upBtn.addEventListener('click', goUp);
    services.addEventListener('click', toggleActiveService);
    topMenuBtn.addEventListener('click', toggleMenu);
    navMenuBtn.addEventListener('click', toggleMenu);
})();