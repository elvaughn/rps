
// Load UI
cardImgs = Array.prototype.slice.call(document.querySelectorAll('.player-card__inner__img'))
healthIcons = Array.prototype.slice.call(document.querySelectorAll('.health-block__icon'))

playerHp = document.querySelector('.player-section__hp')
playerImg = cardImgs[0]
botImg = cardImgs[1]

header = document.querySelector('.header')
headerH1 = document.querySelector('.header__h1')

// Load Audio

const tickSound = new Audio('assets/sounds/tick.wav')
const winSound = new Audio('assets/sounds/win.wav')
const drawSound = new Audio('assets/sounds/draw.wav')
const loseSound = new Audio('assets/sounds/loss.wav')