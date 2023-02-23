const leftButton = document.querySelector(".slider__button-left");
const rightButton = document.querySelector(".slider__button-right");
const slideGallery = document.querySelector(".slider__slider-box-line");
const sliderDots = document.querySelectorAll(".slider__dot");
const sliderBox = document.querySelector(".slider__wrapper");
const sliderImages = document.querySelectorAll(".slider__slider-box-image");
const sliderDotsSet = document.querySelector(".slider__dots-set");
let count = 0;

//Фунцкция для смены класса у активной точки
function dotsActiveClassChange(count) {
    sliderDots.forEach((item) => item.classList.remove("active-dot"));
    sliderDots[count].classList.add("active-dot");
}

//Функция для слайда изображнеий вправо с помощью кнопки
function handlerSlideRight() {
    count = +count + 1;
    if (count > sliderImages.length - 1) {
        count = 0;
    }
    slideGallery.style.transform = `translateX(${
        -count * sliderBox.offsetWidth
    }px)`;
    dotsActiveClassChange(count);
}

//Функция для слайда изображнеий влево с помощью кнопки
function handlerSlideLeft() {
    count = +count - 1;
    if (count < 0) {
        count = sliderImages.length - 1;
    }
    slideGallery.style.transform = `translateX(${
        -count * sliderBox.offsetWidth
    }px)`;
    dotsActiveClassChange(count);
}

//Функция для слайда изображнеий с помощью точек
function handlerChangeSlideByDots(event) {
    if (event.target.className === "slider__dot" && "slider__dot active-dot") {
        count = event.target.id;
        dotsActiveClassChange(count);
        slideGallery.style.transform = `translateX(${
            -count * sliderBox.offsetWidth
        }px)`;
    }
}

rightButton.addEventListener("click", handlerSlideRight);
leftButton.addEventListener("click", handlerSlideLeft);
sliderDotsSet.addEventListener("click", handlerChangeSlideByDots);

let positionXstart = 0;
let positionYstart = 0;

//Функция для определения начального положения касания дисплея
function handlerTouchStart(event) {
    const swipeStartPosition = event.touches[0];
    positionXstart = swipeStartPosition.clientX;
    positionYstart = swipeStartPosition.clientY;
}

//Функция для смены изображения, в зависимости от направления свайпа
function handlerTouchMove(event) {
    if (!positionXstart || !positionYstart) {
        return false;
    }
    const swipeEndPosition = event.touches[0];
    let positionXend = swipeEndPosition.clientX;
    let positionYend = swipeEndPosition.clientY;
    let Xshift = positionXstart - positionXend;
    let Yshift = positionYstart - positionYend;

    if (Math.abs(Xshift) > Math.abs(Yshift)) {
        if (Xshift > 0) {
            handlerSlideRight();
        } else {
            handlerSlideLeft();
        }
    }
    positionXstart = 0;
    positionYstart = 0;
}

slideGallery.addEventListener("touchstart", handlerTouchStart);
slideGallery.addEventListener("touchmove", handlerTouchMove);
