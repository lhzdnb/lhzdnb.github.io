document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling effect
    const links = document.querySelectorAll('a[href^="#"]');
    for (let link of links) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const topOffset = document.querySelector('header').offsetHeight; // 导航栏的高度
                const scrollToPosition = target.offsetTop - topOffset;
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Navigation menu toggle effect
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu');
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Scroll to top functionality
    const scrollTopButton = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
