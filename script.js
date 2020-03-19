//Активное состояние элементов навигации и выбор при скролле
document.addEventListener('scroll', function (e) {

    const position = window.scrollY;
    const blocks = document.querySelectorAll('.block-wrapper');
    const menuItem = document.querySelectorAll('.header__nav-item-link');

    blocks.forEach(wrap => {
        if (wrap.offsetTop - 100 <= position) {
            menuItem.forEach(link => {
                link.classList.remove('header__nav-item-link--active');
                if (wrap.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('header__nav-item-link--active');
                }
            });
        }

        if (position > 2600) {
            menuItem.forEach(link => {
                link.classList.remove('header__nav-item-link--active');
                if (wrap.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('header__nav-item-link--active');
                }
            });
        }
    });
});

const menuItem = document.querySelectorAll('.header__nav-item-link');
menuItem.forEach(link => {
    link.onclick = function () {
        menuItem.forEach(btn => {
            btn.classList.remove('header__nav-item-link--active');
        });
        this.classList.add('header__nav-item-link--active');
    };
});



//Реализация табов портфолио
const portfolioBtn = document.querySelectorAll('.portfolio__filter-btn');

const portfolioWorks = document.querySelector('.portfolio__works');
const portfolioItem = document.querySelectorAll('.portfolio__works-item');

portfolioBtn.forEach(btn => {
    btn.addEventListener('click', function (e) {
        portfolioBtn.forEach(active => {
            active.classList.remove('portfolio__filter-btn--active');
        });
        this.classList.add('portfolio__filter-btn--active');

        let srcImgArr = [];

        portfolioItem.forEach(item => {
            srcImgArr.push(item)
        });

        shuffleWorks(srcImgArr);

        portfolioWorks.innerHTML = '';
        srcImgArr.forEach(element => {
            portfolioWorks.appendChild(element)
        });

        // portfolioItem.forEach((item, i, arr) => arr[i].setAttribute('src', srcImgArr[i]));
    });
});


//Добавляет обводку картинке при клике
portfolioItem.forEach(active => {
    active.onclick = function () {
        if (active.classList.contains('portfolio__works-item--active')) {
            active.classList.remove('portfolio__works-item--active');
        } else {
            portfolioItem.forEach(item => item.classList.remove('portfolio__works-item--active'));
            this.classList.add('portfolio__works-item--active');
        }
    }
});


//Возвращает массив с измененным порядком элементов блока portfolio
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



submitFormBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (formUserName.value == '' || formUserMail.value == '') {
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

        if (formUserSubject.value == '') {
            textSubject.textContent = 'Without subject';
        } else {
            textSubject.textContent = formUserSubject.value;
        }

        if (formUserDesc.value == '') {
            textDesc.textContent = 'Without description';
        } else {
            textDesc.textContent = formUserDesc.value;
        }

        let check = '1';

        function checkCorrectData() {
            let regName = /^[A-Za-z]{0,}$/;
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if (regName.test(formUserName.value) == false) {
                contactsForm.reset();
                formUserName.placeholder = 'Please enter your name using only letters';
                formUserName.classList.add('form__user-list-input-invalid');
                formUserMail.classList.add('form__user-list-input-invalid');
                setTimeout(() => {
                    formUserName.classList.remove('form__user-list-input-invalid');
                    formUserMail.classList.remove('form__user-list-input-invalid');
                }, 1500);

                if (reg.test(formUserMail.value) == false) {
                    contactsForm.reset();
                    formUserMail.placeholder = 'Please enter correct mail';
                    formUserName.classList.add('form__user-list-input-invalid');
                    formUserMail.classList.add('form__user-list-input-invalid');
                    setTimeout(() => {
                        formUserName.classList.remove('form__user-list-input-invalid');
                        formUserMail.classList.remove('form__user-list-input-invalid');
                    }, 1500);
                    check = false;
                }

                check = false;
            } else {
                contactsForm.appendChild(popUp);
                const globalWrapper = document.querySelector('.global-wrapper');
                globalWrapper.classList.add('global-wrapper--pop');

                okBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    contactsForm.removeChild(popUp);
                    contactsForm.reset();
                    formUserName.placeholder = 'Name (Required)';
                    formUserMail.placeholder = 'Email (Required)';
                    globalWrapper.classList.remove('global-wrapper--pop');
                });
            }
        }

        checkCorrectData();
    }
});



//Реализация слайдера
const sliderGlobalWrapper = document.querySelector('.slider');
const sliderBgColorLine = sliderGlobalWrapper.querySelector('.color-line--slider');
const sliderPrevBtn = sliderGlobalWrapper.querySelector('.slider__btn--prev');
const sliderNextBtn = sliderGlobalWrapper.querySelector('.slider__btn--next');
const sliderBtnsSvg = sliderGlobalWrapper.querySelectorAll('path');
const sliderContentList = sliderGlobalWrapper.querySelector('.slider__content-list');
const sliderContentItem = sliderGlobalWrapper.querySelectorAll('.slider__content-list-item');
let sliderCount = 0;



sliderNextBtn.addEventListener('click', function () {
    sliderCount++;
    offDisplay();
    controlBgControl();

    if (sliderCount > sliderContentItem.length - 1) {
        sliderCount = 0;
        sliderContentList.style.marginLeft = `-${sliderContentItem[0].offsetWidth * sliderContentItem.length}px`;
        sliderContentList.style.opacity = '0';
        setTimeout(() => {
            sliderContentList.style.marginLeft = `${sliderContentItem[0].offsetWidth * sliderContentItem.length}px`; 
        }, 330);
        setTimeout(() => {
            sliderContentList.style.opacity = '1';
            sliderContentList.style.marginLeft = `0px`;
        }, 600);

    } else {
        sliderContentList.style.marginLeft = `-${sliderContentItem[sliderCount].offsetWidth * sliderCount}px`;
    }
});


sliderPrevBtn.addEventListener('click', function () {
    sliderCount--;
    offDisplay();
    controlBgControl();

    if (sliderCount < 0) {
        sliderCount = sliderContentItem.length - 1;
        sliderContentList.style.marginLeft = `${sliderContentItem[0].offsetWidth * sliderContentItem.length}px`;
        sliderContentList.style.opacity = '0';
        setTimeout(() => {
            sliderContentList.style.marginLeft = `-${sliderContentItem[0].offsetWidth * sliderContentItem.length}px`; 
        }, 300);
        setTimeout(() => {
            sliderContentList.style.opacity = '1';
            sliderContentList.style.marginLeft = `-${sliderContentItem[sliderCount].offsetWidth}px`;
        }, 600);
    } else {
        sliderContentList.style.marginLeft = `-${sliderContentItem[sliderCount].offsetWidth * sliderCount}px`;
    }
});


//Контроль цвета заднего фона
function controlBgControl() {
    if(sliderCount == 2 || sliderCount == 0) {
        sliderGlobalWrapper.style.backgroundColor = '#F06C64';
        sliderBgColorLine.style.backgroundColor ='#ea676b';

    } else {
        sliderGlobalWrapper.style.backgroundColor = 'rgb(100, 139, 240)';
        sliderBgColorLine.style.backgroundColor ='rgb(71, 109, 205)';
    }

    sliderBtnsSvg.forEach(svg => {
        if(sliderCount == 2 || sliderCount == 0) {
            svg.setAttribute('fill', '#E94348');
        } else {
            svg.setAttribute('fill', 'rgb(71, 109, 205)');
        }
    });
}


//Выключает экраны телефонов слайдера
function offDisplay() {
    const offLeftDisplay = document.createElement('div');
    offLeftDisplay.classList.add('inactive-left');

    const offRightDisplay = document.createElement('div');
    offRightDisplay.classList.add('inactive-right');

    

    if (sliderCount == 0) {
        sliderContentItem[0].appendChild(offLeftDisplay);
        sliderContentItem[0].appendChild(offRightDisplay);

        const leftDisplay = document.querySelector('.inactive-left');
        const rightDisplay = document.querySelector('.inactive-right');

        leftDisplay.onclick = function () {
            this.classList.toggle('show-display');
        }

        rightDisplay.onclick = function () {
            this.classList.toggle('show-display');
        }
    } else {
        const leftDisplay = sliderContentItem[0].querySelector('.inactive-left');
        const rightDisplay = sliderContentItem[0].querySelector('.inactive-right');
    }
}

offDisplay();
