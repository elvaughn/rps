const header = document.querySelector('.header');
const mainMenu = document.querySelector('.main-menu');
const sideMenu = document.querySelector('.side-menu');
const playerOverlay = document.querySelector('.player-section__overlay');
const powerBlock = document.querySelector('.powers-block');
const playerCard = Array.prototype.slice.call(
  document.querySelectorAll('.player-card')
);
const gestureImages = Array.prototype.slice.call(
  document.querySelectorAll('.player-card__inner__img')
);
const vitalBarsHp = Array.prototype.slice.call(
  document.querySelectorAll('.vital-bar__hp--inner')
);
const vitalBarsMp = Array.prototype.slice.call(
  document.querySelectorAll('.vital-bar__mp--inner')
);
const playerName = document.querySelector('#playerName');
const enemyName = document.querySelector('#enemyName');
const playerControls = document.querySelector('.control-section');

const startGameBtn = document.querySelector('#newGame');
const endGameBtn = document.querySelector('#endGame');

const warningIcon = document.querySelector('#penalty-icon');

const rockBtn = document.querySelector('#rock-choice');
const paperBtn = document.querySelector('#paper-choice');
const scissorsBtn = document.querySelector('#scissors-choice');

// Load Audio
const startGameSound = new Audio('assets/sounds/startGame.mp3');
const endGameSound = new Audio('assets/sounds/endGame.mp3');
const tickSound = new Audio('assets/sounds/tick.mp3');

let gestureTimer;

const playSound = (sound) => {
  switch (sound) {
    case 'startGame':
      startGameSound.play();
      break;
    case 'endGame':
      endGameSound.play();
      break;
    case 'tick':
      tickSound.play();
      break;
  }
};

const toggleGameUi = () => {
  // Toggle Main Menu
  if (mainMenu.classList.contains('hidden-menu')) {
    mainMenu.style.display = 'block';
    setTimeout(() => {
      mainMenu.classList.remove('hidden-menu');
    }, 100);
  } else {
    mainMenu.classList.add('hidden-menu');
    setTimeout(() => {
      mainMenu.style.display = 'none';
    }, 250);
  }

  // Toggle Player Controls
  if (playerControls.classList.contains('hidden-menu')) {
    playerControls.style.display = 'block';
    setTimeout(() => {
      playerControls.classList.remove('hidden-menu');
    }, 100);
  } else {
    playerControls.classList.add('hidden-menu');
    setTimeout(() => {
      playerControls.style.display = 'none';
    }, 250);
  }

  // Toggle Header Size
  if (header.classList.contains('header--mini')) {
    setTimeout(() => {
      header.classList.remove('header--mini');
    }, 100);
  } else {
    header.classList.add('header--mini');
  }

  // Toggle Card Animations On/Off
  if (playerCard[0].classList.contains('animated-float')) {
    playerCard[0].classList.remove('animated-float');
    playerCard[1].classList.remove('animated-float--delayed');
  } else {
    playerCard[0].classList.add('animated-float');
    playerCard[1].classList.add('animated-float--delayed');
  }

  // Toggle Overlay
  if (playerOverlay.classList.contains('player-section__overlay--extended')) {
    playerOverlay.classList.remove('player-section__overlay--extended');
  } else {
    playerOverlay.classList.add('player-section__overlay--extended');
  }

  // Toggle Player Name Color
  if (playerName.classList.contains('player-section__name--light')) {
    playerName.classList.remove('player-section__name--light');
    enemyName.textContent = '';
  } else {
    playerName.classList.add('player-section__name--light');
    randomizeEnemyName();
  }

  // Toggle side menu
  if (sideMenu.classList.contains('side-menu--extended')) {
    sideMenu.classList.remove('side-menu--extended');
  } else {
    sideMenu.classList.add('side-menu--extended');
  }

  // Toggle power block
  if (powerBlock.classList.contains('hidden')) {
    powerBlock.classList.remove('hidden');
  } else {
    powerBlock.classList.add('hidden');
  }
};
const toggleWarning = () => {
      // Toggle warning icon
  if (warningIcon.classList.contains('hidden')) {
    warningIcon.classList.remove('hidden');
  } else {
    warningIcon.classList.add('hidden');
  }
}
const randomizeEnemyName = () => {
  const enemyNames = [
    'Damiran "Vox" Landn',
    'Tamira "The Snow" Kimbr',
    'Adrihel "Crimson" Jaro',
    'Layala "The Crow" Dmi'
  ];

  const index = Math.random();
  if (index < 0.25) {
    enemyName.textContent = enemyNames[0];
  } else if (index > 0.25 && index < 0.5) {
    enemyName.textContent = enemyNames[1];
  } else if (index > 0.5 && index < 0.75) {
    enemyName.textContent = enemyNames[2];
  } else {
    enemyName.textContent = enemyNames[3];
  }
};

const updateStats = (player, stat, value) => {
    console.log('called update stats')
  if (player === 'player') {
    if (stat === 'mp') {
      vitalBarsMp[0].style.width = `${value}%`;
    } else {
        console.log('changed health value')
      vitalBarsHp[0].style.width = `${value}%`;
    }
    return;
  }
  if (stat === 'mp') {
    vitalBarsMp[1].style.width = `${value}%`;
  } else {
    vitalBarsHp[1].style.width = `${value}%`;
  }
};

const animateCardTick = () => {
  playerCard.forEach((el) => {
    if (el.classList.contains('shake-card-animation')) {
      el.classList.remove('shake-card-animation');
      setTimeout(() => {
        el.classList.add('shake-card-animation');
      }, 200);
    } else {
      el.classList.add('shake-card-animation');
    }
  });
};

const changeGestureImages = (playerImg, botImg) => {
    gestureImages[0].src = `assets/images/gestureImg-${playerImg}.png`
    gestureImages[1].src = `assets/images/gestureImg-${botImg}.png`
}
