/**
 * * INCORPORATE ERRORS AND LIVES
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

// GAME CONTROL

const toggleGame = () => {
    header.classList.toggle('header--mini');
    headerH1.classList.toggle('header__h1--mini');
    if (GAME_STAGE === STAGE_INACTIVE) {
        GAME_STAGE = STAGE_ACTIVE;
        resetStats();
        newRound();
    } else {
        endGame();
    }
};

const endGame = () => {
    GAME_STAGE = STAGE_INACTIVE;
    resetImgs();

    if (timerId) {
        clearInterval(timerId)
        isCounting = false
    }

    if (PLAYER_LIVES === 3) {
        playerHp.classList.remove('player-section__hp--3');
    } else if (PLAYER_LIVES === 2) {
        playerHp.classList.remove('player-section__hp--2');
    } else {
        playerHp.classList.remove('player-section__hp--1');
    }
};

  
const newRound = () => {
    if (GAME_STAGE === STAGE_INACTIVE) {
        return;
    }
    resetImgs();
    countdown();
};
  
  const resetStats = () => {
    PLAYER_LIVES = 3;
    playerHp.classList.add(`player-section__hp--${PLAYER_LIVES}`);
  };
  
  const resetImgs = () => {
    playerImg.src = `/assets/images/rock.png`;
    botImg.src = `/assets/images/rock.png`;
  };

// GAME EVENTS
const playerWin = () => {
  winSound.play();
  increaseLife()
};

const playerLoss = () => {
    loseSound.play();
    decreaseLife();
  };

const increaseLife = () => {
    if (PLAYER_LIVES === 3) {
        return
    }

    PLAYER_LIVES++;
    changeHpBar('add')
}

const decreaseLife = () => {
    if (PLAYER_LIVES === 1) {
        gameOver()
    } else {
        PLAYER_LIVES--;
        changeHpBar('sub')
    }
}

const changeHpBar = (count) => {
    if (count === 'add') {
        playerHp.classList.remove(`player-section__hp--${PLAYER_LIVES - 1}`);
    } else {
        playerHp.classList.remove(`player-section__hp--${PLAYER_LIVES + 1}`);
    }
    playerHp.classList.add(`player-section__hp--${PLAYER_LIVES}`)
}




const draw = () => {
  drawSound.play();
};

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
    playerChoice = ROCK_CHOICE;
  }

  botChoice = randomChoice();

  playerImg.src = `/assets/images/${playerChoice.toLowerCase()}.png`;
  botImg.src = `/assets/images/${botChoice.toLowerCase()}.png`;

  if (
    (playerChoice === ROCK_CHOICE && botChoice === SCISSORS_CHOICE) ||
    (playerChoice === SCISSORS_CHOICE && botChoice === PAPER_CHOICE) ||
    (playerChoice === PAPER_CHOICE && botChoice === ROCK_CHOICE)
  ) {
    playerWin();
  } else if (
    (playerChoice === ROCK_CHOICE && botChoice === PAPER_CHOICE) ||
    (playerChoice === PAPER_CHOICE && botChoice === SCISSORS_CHOICE) ||
    (playerChoice === SCISSORS_CHOICE && botChoice === ROCK_CHOICE)
  ) {
    playerLoss();
  } else {
    draw();
  }
  playerChoice = undefined;
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
  if (GAME_STAGE === STAGE_INACTIVE || isCounting) {
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
  }, 1000);
};

const castChoice = (choice) => {
  if (GAME_STAGE === STAGE_COUNTDOWN) {
    console.log('Player will be penalyzed!');
  } else if (GAME_STAGE === STAGE_CHOICE) {
    playerChoice = choice;
  }
};



document.addEventListener('keydown', (key) => {
  if (key.key === 'r') {
    castChoice(ROCK_CHOICE);
  } else if (key.key === 'p') {
    castChoice(PAPER_CHOICE);
  } else if (key.key === 's') {
    castChoice(SCISSORS_CHOICE);
  } else if (key.code === 'Space') {
    newRound();
  } else if (key.key === 'Enter') {
    toggleGame();
  }
});
