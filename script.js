const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => { //добавляем слушатель события .addEventListener для #time-list и ожидаем клик
    if (event.target.classList.contains('time-btn')) { //эта запись означает, что если у элемента timeList есть класс time-btn, то это означает, что это и есть кнопка и вы кончоль выведется значение event.target
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++; //для подсчета сделанных кликов
        event.target.remove(); //удаляем кружочек при клике на него
        createRandomCircle(); //кружочек заново появляется на поле после удаления
    }
});


function startGame() {
    setInterval(decreaseTime, 1000);
    setTime(time); // функцию decreaseTime помещаем в setInterval и вызываем через каждую секунду
    createRandomCircle();
    // timeEl.innerHTML = `00:${time}`;
}

function decreaseTime() { //вызываем функцию для изменения time на одну секунду и помещаем в setInterval   
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`; //выносим в функцию повторяющиеся элементы timeEL
}

function finishGame() {
    timeEl.parentNode.remove(); //удаляем h3 в после завершения раунда
    board.innerHTML = `<h1>Счет:<span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect(); //getBoundingClientRect содержит разные координаты и в частности размеры поля(500*500)
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) { //функция для получения размеров circle в динамическом диапазоне, в эту функцию мы будем получать мин и макс значение с помощью Math.random и округляем с помощью Math.round, а после возвращаем через return
    return Math.round(Math.random() * (max - min) + min);
}