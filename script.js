//Активное состояние элементов навигации
const headerBlock = document.querySelector('.header');
const headerLink = document.querySelectorAll('.header__nav-item-link');


headerLink.forEach(btn => {
    btn.addEventListener('click', function (e) {
        headerLink.forEach(del => del.classList.remove('header__nav-item-link--active'));
        this.classList.add('header__nav-item-link--active');
    });
});



//Реализация слайдера
const globalSliderBlock = document.querySelector('.slider');
const sliderBtns = document.querySelectorAll('.slider__btn');
const prevSliderBtn = document.querySelector('.slider__btn--prev');
const nextSliderBtn = document.querySelector('.slider__btn--next');
const sliderContent = document.querySelector('.slider__content');
const sliderDownLine = document.querySelector('.color-line--slider');
let sliderCount = 0;

const sliderImages = [
    'slider-image.png',
    'slider-image-2.png'
];

const sliderBgColor = [
    '#F06C64',
    '#648BF0'
];

const sliderBgLine = [
    '#E94348',
    '#476DCD'
];




nextSliderBtn.addEventListener('click', function () {
    sliderCount++;
    sliderContent.style.backgroundImage = `url(assets/${sliderImages[sliderCount]})`;
    sliderContent.style.animationName = 'animateSlideRight';
    setTimeout(() => {
        sliderContent.style.animationName = '';
    }, 600);
    globalSliderBlock.style.backgroundColor = sliderBgColor[sliderCount];
    sliderDownLine.style.backgroundColor = sliderBgLine[sliderCount];

    sliderBtns.forEach(btn => {
        const svgColor = btn.querySelector('path');
        svgColor.setAttribute('fill', sliderBgLine[sliderCount]);
    });


    if (sliderCount >= sliderImages.length) {
        sliderCount = 0;
        sliderContent.style.backgroundImage = `url(assets/${sliderImages[sliderCount]})`;
        globalSliderBlock.style.backgroundColor = sliderBgColor[sliderCount];
        sliderDownLine.style.backgroundColor = sliderBgLine[sliderCount];

        sliderBtns.forEach(btn => {
            const svgColor = btn.querySelector('path');
            svgColor.setAttribute('fill', sliderBgLine[sliderCount]);
        });
    }
    offDisplay();
});


prevSliderBtn.addEventListener('click', function () {
    sliderCount--;
    sliderContent.style.backgroundImage = `url(assets/${sliderImages[sliderCount]})`;
    sliderContent.style.animationName = 'animateSlideLeft';
    setTimeout(() => {
        sliderContent.style.animationName = '';
    }, 600);
    globalSliderBlock.style.backgroundColor = sliderBgColor[sliderCount];
    sliderDownLine.style.backgroundColor = sliderBgLine[sliderCount];

    sliderBtns.forEach(btn => {
        const svgColor = btn.querySelector('path');
        svgColor.setAttribute('fill', sliderBgLine[sliderCount]);
    });


    if (sliderCount < 0) {
        sliderCount = sliderImages.length - 1;
        sliderContent.style.backgroundImage = `url(assets/${sliderImages[sliderCount]})`;
        globalSliderBlock.style.backgroundColor = sliderBgColor[sliderCount];
        sliderDownLine.style.backgroundColor = sliderBgLine[sliderCount];

        sliderBtns.forEach(btn => {
            const svgColor = btn.querySelector('path');
            svgColor.setAttribute('fill', sliderBgLine[sliderCount]);
        });
    }
    offDisplay();
});

function offDisplay() {
    const offLeftDisplay = document.createElement('div');
    offLeftDisplay.classList.add('inactive-left');

    const offRightDisplay = document.createElement('div');
    offRightDisplay.classList.add('inactive-right');

    if (sliderCount == 0) {
        sliderContent.appendChild(offLeftDisplay);
        sliderContent.appendChild(offRightDisplay);

        const leftDisplay = document.querySelector('.inactive-left');
        const rightDisplay = document.querySelector('.inactive-right');

        leftDisplay.onclick = function () {
            this.classList.toggle('show-display');
        }

        rightDisplay.onclick = function () {
            this.classList.toggle('show-display');
        }
    } else {
        const left = document.querySelector('.inactive-left');
        const right = document.querySelector('.inactive-right');
        sliderContent.removeChild(left);
        sliderContent.removeChild(right);
    }
}
offDisplay();


//Реализация табов портфолио
const portfolioBtn = document.querySelectorAll('.portfolio__filter-btn');

const portfolioWorks = document.querySelector('.portfolio__works');
const portfolioItem = document.querySelectorAll('.portfolio__works-item');

portfolioBtn.forEach(btn => {
    btn.addEventListener('click', function (e) {
        portfolioBtn.forEach(del => del.classList.remove('portfolio__filter-btn--active'));
        portfolioBtn.forEach(del => del.classList.add('portfolio__filter-btn'));
        this.classList.remove('portfolio__filter-btn');
        this.classList.add('portfolio__filter-btn--active');

        let srcImgArr = [];

        portfolioItem.forEach(item => {
            srcImgArr.push(item.getAttribute('src'))
        });

        shuffleWorks(srcImgArr);

        portfolioItem.forEach((item, i, arr) => arr[i].setAttribute('src', srcImgArr[i]));
    });
});

portfolioItem.forEach(active => {
    active.onclick = function () {
        if(active.classList.contains('portfolio__works-item--active')) {
            active.classList.remove('portfolio__works-item--active');
        } else {
            portfolioItem.forEach(item => item.classList.remove('portfolio__works-item--active'));
            this.classList.add('portfolio__works-item--active');
        }
    }
});


//Возвращает массив с измененным порядком элементов
function shuffleWorks(arr) {
    let j;
    let temp;

    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}


//Обработка формы

const contactsForm = document.querySelector('.form__user');
const submitFormBtn = document.querySelector('.form__user-submit');
const formUserName = document.querySelector('#user-name');
const formUserMail = document.querySelector('#user-email');
const formUserSubject = document.querySelector('#user-subject');
const formUserDesc = document.querySelector('#user-desc');



submitFormBtn.addEventListener('click', function(e) {
    e.preventDefault();

    if(formUserName.value == '' && formUserMail.value == '') {
        formUserName.classList.add('form__user-list-input-invalid');
        formUserMail.classList.add('form__user-list-input-invalid');
        setTimeout(() => {
            formUserName.classList.remove('form__user-list-input-invalid');
            formUserMail.classList.remove('form__user-list-input-invalid');
        }, 1500);
    } else {
        const popUp = document.createElement('div');
        popUp.classList.add('form__pop');

        const textSuccess = document.createElement('p');
        textSuccess.classList.add('form__pop-success');
        textSuccess.textContent = 'The letter was sent  ';
        popUp.appendChild(textSuccess);

        const textSubject = document.createElement('p');
        textSubject.classList.add('form__pop-subject');
        popUp.appendChild(textSubject);

        const textDesc = document.createElement('p');
        textDesc.classList.add('form__pop-describe');
        popUp.appendChild(textDesc);

        const okBtn = document.createElement('button');
        okBtn.classList.add('form__pop-ok-btn');
        okBtn.textContent = 'Ok';
        popUp.appendChild(okBtn);

        if(formUserSubject.value == '') {
            textSubject.textContent = 'Without subject';
        } else {
            textSubject.textContent = formUserSubject.value;
        }

        if(formUserDesc.value == '') {
            textDesc.textContent = 'Without description';
        } else {
            textDesc.textContent = formUserDesc.value;
        }

        contactsForm.appendChild(popUp);
        const globalWrapper = document.querySelector('.global-wrapper');
        globalWrapper.classList.add('global-wrapper--pop');

        okBtn.addEventListener('click', function(e) {
            e.preventDefault();
            contactsForm.removeChild(popUp);
            formUserName.value = '';
            formUserMail.value = '';
            formUserSubject.value = '';
            formUserDesc.value = '';
            globalWrapper.classList.remove('global-wrapper--pop');
        });
    }
});