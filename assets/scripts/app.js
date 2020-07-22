/**
 * * GAME OVER
 */

const STAGE_INACTIVE = 'INACTIVE';
const STAGE_ACTIVE = 'ACTIVE';
const STAGE_COUNTDOWN = 'COUNTDOWN';
const STAGE_CHOICE = 'CHOICE';
const STAGE_SHOWDOWN = 'SHOWDOWN';
const ROCK_CHOICE = 'ROCK';
const PAPER_CHOICE = 'PAPER';
const SCISSORS_CHOICE = 'SCISSORS';

let GAME_STAGE = 'INACTIVE';
let PLAYER_LIVES = 0;
let PLAYER_ERRORS = 0;
let isCounting;
let playerChoice;
let botChoice;
let timerId;
let forceHand;
let forceHandCooldown;
let score;
let multiplier;

// GAME CONTROL
const endGame = () => {
  if (GAME_STAGE !== STAGE_INACTIVE) {
    GAME_STAGE = STAGE_INACTIVE;

    if (timerId) {
      clearInterval(timerId);
      isCounting = false;
    }

    playerHp.classList.remove(`player-section__hp--${PLAYER_LIVES}`);
    header.classList.remove('header--mini');
    headerH1.classList.remove('header__h1--mini');
  }
};

const startGame = () => {
  GAME_STAGE = STAGE_ACTIVE;
  resetStats();
  gameStartSound.play()
  newRound();
  header.classList.add('header--mini');
  headerH1.classList.add('header__h1--mini');
}

const toggleGame = () => {
  if (GAME_STAGE === STAGE_INACTIVE) {
    startGame()
  } else {
    endGame();
  }
};

const newRound = () => {
  console.log(GAME_STAGE)
  if (GAME_STAGE === STAGE_INACTIVE) {
    return;
  }
  GAME_STAGE = STAGE_ACTIVE
  resetImgs();
  countdown();
};

const resetStats = () => {
  PLAYER_LIVES = 3;
  score = 0;
  multiplier = 1;
  forceHand = false
  forceHandCooldown = false
  scoreSpan.textContent = score;
  multiplierSpan.textContent = multiplier;
  playerHp.classList.add(`player-section__hp--${PLAYER_LIVES}`);
  healthIcons.forEach(el => {
    if (el.id !== 'penalty-icon') {
      el.classList.remove('hidden')
    }
  })
  penaltyIcon.classList.add('hidden')
};

const resetImgs = () => {
  playerImg.src = `assets/images/rock.png`;
  botImg.src = `assets/images/rock.png`;
};

const increaseLife = () => {
  if (PLAYER_LIVES === 3) {
    return;
  }
  healthIcons[PLAYER_LIVES].classList.remove('hidden')
  PLAYER_LIVES++;
  playerHp.classList.remove(`player-section__hp--${PLAYER_LIVES - 1}`);
  playerHp.classList.add(`player-section__hp--${PLAYER_LIVES}`);
};

const decreaseLife = () => {
  if (PLAYER_LIVES === 1) {
    gameOverSound.play()
    endGame();
  } else {
    healthIcons[PLAYER_LIVES-1].classList.add('hidden')
    PLAYER_LIVES--;
    playerHp.classList.remove(`player-section__hp--${PLAYER_LIVES + 1}`);
    playerHp.classList.add(`player-section__hp--${PLAYER_LIVES}`);
  }
};


const endRound = (outcome) => {
  if (outcome === 'win') {
    let scoreIncrement;
    winSound.play();
    increaseLife()
    if (multiplier > 1) {
      scoreIncrement = 2 * multiplier
      score += scoreIncrement
    } else {
      scoreIncrement = 2
      score += scoreIncrement
      multiplier++;
    }
  } else if (outcome === 'loss') {
    loseSound.play()
    decreaseLife()
    multiplier = 1;
  } else {
    drawSound.play()
    if (multiplier > 1) {
      multiplier--;
    }
  }
  scoreSpan.textContent = score;
  multiplierSpan.textContent = multiplier;
  if (GAME_STAGE !== STAGE_INACTIVE) {
    setTimeout(newRound, 1000)
  }

}

const flare = () => {
  cardImgs.forEach((el) =>
    el.classList.toggle('player-card__inner__img--flare')
  );
  setTimeout(() => {
    cardImgs.forEach((el) =>
      el.classList.toggle('player-card__inner__img--flare')
    );
  }, 260);
};

const assessChoices = () => {
  if (!playerChoice) {
    playerChoice = randomChoice();
  }

  if (!botChoice) {
    botChoice = randomChoice();
  }
  
  playerImg.src = `assets/images/${playerChoice.toLowerCase()}.png`;
  botImg.src = `assets/images/${botChoice.toLowerCase()}.png`;
  GAME_STAGE = STAGE_SHOWDOWN
  if (
    (playerChoice === ROCK_CHOICE && botChoice === SCISSORS_CHOICE) ||
    (playerChoice === SCISSORS_CHOICE && botChoice === PAPER_CHOICE) ||
    (playerChoice === PAPER_CHOICE && botChoice === ROCK_CHOICE)
  ) {
    endRound('win');
  } else if (
    (playerChoice === ROCK_CHOICE && botChoice === PAPER_CHOICE) ||
    (playerChoice === PAPER_CHOICE && botChoice === SCISSORS_CHOICE) ||
    (playerChoice === SCISSORS_CHOICE && botChoice === ROCK_CHOICE)
  ) {
    endRound('loss');
  } else {
    endRound('draw');
  }
  playerChoice = undefined;
  botChoice = undefined;
  forceHandCooldown = false;
};

const randomChoice = () => {
  const randomInt = Math.random();

  if (randomInt < 0.33) {
    return ROCK_CHOICE;
  } else if (randomInt > 0.33 && randomInt < 0.66) {
    return PAPER_CHOICE;
  } else {
    return SCISSORS_CHOICE;
  }
};

const countdown = () => {
  if (GAME_STAGE === STAGE_COUNTDOWN || isCounting) {
    return;
  }

  GAME_STAGE = STAGE_COUNTDOWN;

  isCounting = true;

  let index = 3;
  timerId = setInterval(() => {
    if (index > 0) {
      tickSound.play();
      if (index === 1) {
        GAME_STAGE = STAGE_CHOICE;
      }
      index--;
      flare();
    } else {
      isCounting = false;
      assessChoices();
      clearInterval(timerId);
    }
  }, 500);
};

const castChoice = (choice) => {
  if (GAME_STAGE === STAGE_COUNTDOWN) {
    if (!forceHand && !forceHandCooldown) {
      penaltyIcon.classList.remove('hidden')
      forceHand = true
      forceHandCooldown = true
      forceHandSound.play()
    } else {
      forceHand = false
      penaltyIcon.classList.add('hidden')
      decreaseLife()
      decreaseLife()
      forceHandDamageSound.play()
    }
    botChoice = choice
  } else if (GAME_STAGE === STAGE_CHOICE) {
    playerChoice = choice;
  }
};

document.addEventListener('keydown', (key) => {
  if (key.key === 'a') {
    castChoice(ROCK_CHOICE);
  } else if (key.key === 's') {
    castChoice(PAPER_CHOICE);
  } else if (key.key === 'd') {
    castChoice(SCISSORS_CHOICE);
  } else if (key.key === 'Enter') {
    toggleGame();
  }
});
