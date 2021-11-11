function load(img) {
    const url = img.getAttribute('lazy-src');
    img.setAttribute('src', url);
}

function ready() {
    if('IntersectionObserver' in window) {
        var lazyImg = document.querySelectorAll('[lazy-src]');

        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    load(entry.target);
                }
            })
        });

        lazyImg.forEach(img => {
            observer.observe(img);
        })
    }
}

document.addEventListener('DOMContentLoaded', ready);