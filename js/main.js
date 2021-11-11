function add(element, activeClass) {  
    element.classList.add(activeClass);
}
function remove(element, activeClass) { 
    element.classList.remove(activeClass);
}
function scrollToPos(distance) { 
    window.scrollTo({
        top: distance,
        behavior: 'smooth'
    })
}

var html = document.querySelector('html')

function ready() {
    // Scroll to Top Btn
    let bttBtn = document.querySelector('.bttBtn');
    let fixedBtn = document.querySelector('.fixedBtn');

    bttBtn.onclick = _ => scrollToPos(-window.scrollY);
    fixedBtn.onclick = _ => scrollToPos(-window.scrollY);


    // active Fixed Btn
    let header = document.querySelector('.header').offsetHeight;
    let offTopNews = document.querySelector('.news-section').offsetTop;

    add(fixedBtn, 'activeBtn');
    function activeFixedBtn() {
        if(window.scrollY > header && window.scrollY < offTopNews)
            add(fixedBtn, 'activeBtn');
        else
            remove(fixedBtn, 'activeBtn');
    }
    window.addEventListener('scroll', activeFixedBtn);


    // Scroll active menu item
    let li = document.querySelectorAll('.menu-nav li');
    let idTop = document.querySelectorAll('[id]');
    let arrTop = [];

    idTop.forEach(top => arrTop.push(top.offsetTop));
    window.addEventListener('scroll',  _ => {
        let temp = 0;
        // Scroll to section range then active menu item
        arrTop.forEach((_, index) => {
            if(window.scrollY >= arrTop[index] &&
                window.scrollY < arrTop[index + 1]) {
                add(li[index], 'activeHover');
                temp = index;
            } else 
                remove(li[temp], 'activeHover');
            temp += 1;
            if(window.scrollY >= arrTop[arrTop.length - 1]) 
                add(li[arrTop.length - 1], 'activeHover');
        })   
        //Lang options scroll to hide
        langOptions.classList.remove('activeDs');
    });
    // Click on menu item to scroll to section
    li.forEach((item, index) =>
        item.onclick = _ => scrollToPos(arrTop[index] + 1));


    // Lang options
    let lang = document.querySelector('.lang__langPart');
    let langOptions = document.querySelector('.options');

    lang.onclick = e => {
        e.stopPropagation();
        langOptions.classList.toggle('activeDs');
        langOptions.onclick = e => e.stopPropagation();
        // click on html to hide lang options
        html.onclick = _ => remove(langOptions, 'activeDs');
    }

    let spanLang = document.querySelector('.lang__langPart span');
    let langOptionsLi = document.querySelectorAll('.options li');
    let arrLang = [];
    let tempLang = 0;
    // On click to active color option in lang options
    langOptionsLi.forEach((li, i) => {
        arrLang.push(li);
        spanLang.innerHTML = arrLang[tempLang].innerHTML;  
        add(arrLang[tempLang], 'activeColor');  
        
        arrLang[i].onclick = _ => {
            remove(langOptions, 'activeDs');
            remove(arrLang[tempLang], 'activeColor');  
            spanLang.innerHTML = li.innerText;
            add(li, 'activeColor');
            tempLang = i;
        }
    })


    //Play video - quality section
    let playBtn = document.querySelectorAll('.playBtn');
    let closeVideo = document.querySelector('.closeBtn');
    let playVideo = document.querySelector('.quality-playVideo');
    let playVideoInner = document.querySelector('.quality-playVideo__video');
    const videoCode = ['1K14uLv8ViU', '8IdbMapO4iQ', 'mvjHOgGVnXM'];

    playBtn.forEach((btn, index) => {
        btn.onclick = _ => {
            add(playVideo, 'activeBlock');
            playVideoInner.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${videoCode[index]}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
                <div class="closeBtn">X</div> 
            `;
            // document.cookie = "Set-Cookie: flavor=choco; SameSite=None; Secure";
        }
        closeVideo.onclick = _ =>  remove(playVideo, 'activeBlock');
        playVideo.onclick = _ => {
            remove(playVideo, 'activeBlock');
            playVideoInner.innerHTML = '';
        }
    })

    
    // Sliderrrrrrr
    let dots = document.querySelectorAll('.number-paging__dots li');
    let numberPaging = document.querySelector('.number-paging__number');
    let arrDots = [];
    let tempDot = 0;
    
    dots.forEach((dot, index) => {
        arrDots.push(dot);
        add(arrDots[tempDot], 'active')

        dot.onclick = _ => {
            remove(arrDots[tempDot], 'active')
            add(arrDots[index], 'active');
            remove(arrSlider[tempDot], 'activeSlider');
            add(arrSlider[index], 'activeSlider');
            numberPaging.innerHTML = (index+1).toString().padStart(2, '0');
            tempDot = index;
        }
    });

    let sliderItem = document.querySelectorAll('.slider__item');
    let nextBtn = document.querySelector('.--next');
    let prevBtn = document.querySelector('.--prev');
    let clickTime = 0;
    let arrSlider = [];

    sliderItem.forEach(item => arrSlider.push(item));
    add(arrSlider[clickTime], 'activeSlider');

    function sliderNextBtn() {
        if(clickTime < arrSlider.length - 1) {
            remove(arrSlider[clickTime], 'activeSlider');
            remove(arrDots[clickTime], 'active')
            add(arrSlider[clickTime + 1], 'activeSlider');
            add(arrDots[clickTime + 1], 'active')
            clickTime++;
            numberPaging.innerHTML = (clickTime + 1).toString().padStart(2, '0');
        } else {
            remove(arrSlider[clickTime], 'activeSlider');
            remove(arrDots[clickTime], 'active')
            clickTime = 0;
            add(arrDots[clickTime], 'active');
            add(arrSlider[clickTime], 'activeSlider');
            numberPaging.innerHTML = (clickTime + 1).toString().padStart(2, '0');
        }
    }

    function sliderPrevBtn() {
        if(clickTime > 0) {
            remove(arrSlider[clickTime], 'activeSlider');
            remove(arrDots[clickTime], 'active')
            add(arrSlider[clickTime - 1], 'activeSlider');
            add(arrDots[clickTime - 1], 'active')
            clickTime--;
            numberPaging.innerHTML = (clickTime + 1).toString().padStart(2, '0');
        } else {
            remove(arrSlider[clickTime], 'activeSlider');
            remove(arrDots[clickTime], 'active')
            clickTime = arrSlider.length - 1;
            add(arrDots[clickTime], 'active');
            add(arrSlider[clickTime], 'activeSlider');
            numberPaging.innerHTML = (clickTime + 1).toString().padStart(2, '0');
        }
    }
    // On click dot to change slider
    nextBtn.addEventListener('click', sliderNextBtn);
    prevBtn.addEventListener('click', sliderPrevBtn);
 

    // Menu Responsive
    let menuResBtn = document.querySelector('.lang__menuRes');
    let pop = document.querySelector('.menu-pop-up');
    let closePop = document.querySelector('.close-menu')
    let liPop = document.querySelectorAll('.menu-pop-up ul li')

    menuResBtn.onclick = function() {
        html.style.overflowY = 'hidden';
        add(pop, 'activeMenuRes')
    }
    closePop.onclick = function() {
        html.style.overflowY = 'auto';
        remove(pop, 'activeMenuRes')
    }
    liPop.forEach((item, index) => 
        item.onclick = _ => {
            html.style.overflowY = 'auto';
            remove(pop, 'activeMenuRes')
            scrollToPos(arrTop[index] + 1);
    })


    // Menu toggle
    let navBar = document.querySelector('.header-nav');
    let prevY = 0;

    function fixedNav() {
        let currentY = window.pageYOffset;
        if(!x.matches) {
            if(window.scrollY <= 1) {
                navBar.style.position = 'absolute';
                navBar.style.background = 'transparent';
                navBar.style.height = '85px';
            } else {
                if(prevY > currentY)
                    navBar.style.height = '85px';
                else {
                    navBar.style.position = 'fixed';
                    navBar.style.background = 'black'; //#4b4b4b
                    navBar.style.height = '50px';
                }
            }
        } else {
            // Responsive code
            if(window.scrollY <= 1) {
                navBar.style.position = 'absolute';
                navBar.style.background = 'transparent';
            } else {
                navBar.style.position = 'fixed';
                navBar.style.background = 'black'; //#4b4b4b
                navBar.style.height = '50px';
            }
        }
        prevY = currentY;
    }
    // Responsive
    var x = window.matchMedia("(max-width: 767px)");
    fixedNav(x) // Call listener function at run time
    x.addEventListener('change', fixedNav);
    // On scroll menu height
    window.addEventListener('scroll', fixedNav);
}

document.addEventListener('DOMContentLoaded', ready);


// Flickity Lib
var elem = document.querySelector('.showPic-section .main-carousel');
var flkty = new Flickity( elem, {
  // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    freeScroll: true,
    prevNextButtons: false,
    pageDots: false, 
});

// var elem2 = document.querySelector('.news-section .main-carousel');
// var flkty = new Flickity( elem2, {
//   // options
//     cellAlign: 'left',
//     contain: true,
//     wrapAround: true,
//     freeScroll: true,
//     prevNextButtons: false,
//     pageDots: false, 
// });


// AOS Lib
let prdFur = document.querySelector('.product__furniture');
let prdDecor = document.querySelector('.product__decor');

function setAttributes(ele, attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
        ele.setAttribute(key, value)
        console.log(key, "-", value, "of", ele.className);
    }); 
}

setAttributes(prdFur, {
    'data-aos': 'fade-right', 'data-aos-duration': '1000',
    'data-aos-delay': '50',
})
setAttributes(prdDecor, {
    'data-aos': 'fade-left', 'data-aos-duration': '1000',
    'data-aos-delay': '50',
})

AOS.init({
    once: true,
});
AOS.refresh();