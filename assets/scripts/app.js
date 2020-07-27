const DRAW_MP_BONUS = 10;
const WIN_MP_BONUS = 5;
const STREAK_MP_BONUS = 25;
let PLAYER_POWER = 10;
let PLAYER_HEALTH;
let COMPUTER_HEALTH;
let PLAYER_MANA;
let COMPUTER_MANA;
let COMPUTER_POWER = (Math.random() + 1 ) * 10;
let GAME_STATUS = 'INACTIVE';

/**
 * TODO: CREATE GAME OVER SCREEN
 * TODO: ADD FORCE HAND AND FORCE HAND CONSEQUENCE FUNCTION
 * TODO: CREATE POWER ABILITIES
 * TODO: TWEAK UI
 * TODO: ADD UI SOUNDS
 */

let playerGesture;
let botGesture;
let lastWin;


const generateBotGesture = () => {
  const index = Math.random()
  if (index < 0.33) {
    return 0
  } else if (index >= 0.33 && index < 0.66) {
    return 1
  } else {
    return 2
  }
}

const checkGestures = () => {
  if (!playerGesture && playerGesture !== 0) {
    console.log('player lost a point')
    return
  }
  const botGesture = generateBotGesture()

  changeGestureImages(playerGesture, botGesture)

  if (playerGesture === 0 && botGesture === 2 || playerGesture === 1 && botGesture === 0 || playerGesture === 2 && botGesture === 1) {
    roundOutcome('win')
  } else if (playerGesture === 0 && botGesture === 1 || playerGesture === 1 && botGesture === 2 || playerGesture === 2 && botGesture === 0) {
    roundOutcome('loss')
  } else {
    roundOutcome('draw')
  }
}

const roundOutcome = (outcome) => {
  if (outcome === 'win') {
    COMPUTER_HEALTH -= PLAYER_POWER;
    updateStats('bot', 'hp', COMPUTER_HEALTH)

    if (COMPUTER_HEALTH <= 0) {
      console.log('Game over! Player wins!')
      return
    }
    if (lastWin === 'player') {
      increaseMana('player', STREAK_MP_BONUS)
    } else {
      increaseMana('player', WIN_MP_BONUS)
    }
    lastWin = 'player'
    playSound('win')
  } else if (outcome === 'loss') {
    PLAYER_HEALTH -= COMPUTER_POWER;
    updateStats('player', 'hp', PLAYER_HEALTH)

    if (PLAYER_HEALTH <= 0) {
      console.log('Game over! Player wins!')
      return
    }
    if (lastWin === 'computer') {
      increaseMana('computer', STREAK_MP_BONUS)
    } else {
      increaseMana('computer', WIN_MP_BONUS)
    }
    lastWin = 'computer'
  } else {
    increaseMana('player', DRAW_MP_BONUS)
    increaseMana('computer', DRAW_MP_BONUS)
    lastWin = undefined;
  }
  newRound()
}

const toggleGameStatus = () => {
  toggleGameUi()
  if (GAME_STATUS === 'INACTIVE') {
    // playSound('startGame')
    GAME_STATUS = 'ACTIVE'
    resetStats()
    setTimeout(cardTick, 500)
    return
  }
  GAME_STATUS = 'INACTIVE'
  playSound('endGame')
  updateStats('player', 'hp', 0)
  updateStats('bot', 'hp', 0)
  updateStats('bot', 'mp', 0)
  updateStats('player', 'mp', 0)
  clearInterval(gestureTimer)
}

const newRound = () => {
  playerGesture = undefined
  botGesture = undefined
  setTimeout(cardTick, 500)
}

const cardTick = () => {
  let index = 0;
  GAME_STATUS = 'TICK'
  changeGestureImages(0, 0)
  gestureTimer = setInterval(() => {
    if (index < 3) {
      if (index === 2) {
        GAME_STATUS = 'C_TICK'
      }
      playSound('tick');
      animateCardTick()
      index++;
    } else {
      GAME_STATUS = 'SHOWDOWN'
      checkGestures()
      clearInterval(gestureTimer);
    }
  }, 1000);
};

const playerChoice = (choice) => {
  if (GAME_STATUS === 'TICK') {
    console.log(`forced ${choice}`)
  } else if (GAME_STATUS === 'C_TICK') {
    console.log(`selected ${choice}`)
    playerGesture = choice
  }
}

const inflictDamage = (target) => {

}

const resetStats = () => {
  PLAYER_HEALTH = 100;
  COMPUTER_HEALTH = 100;
  PLAYER_MANA = 0;
  COMPUTER_MANA = 0;
  updateStats('player', 'hp', PLAYER_HEALTH)
  updateStats('bot', 'hp', COMPUTER_HEALTH)
  updateStats('bot', 'mp', COMPUTER_MANA)
  updateStats('player', 'mp', PLAYER_MANA)
}

const increaseMana = (target, amount) => {
  if (target === 'player' && PLAYER_MANA < 100) {
    const potentialMana = PLAYER_MANA += amount;
    if (potentialMana <= 100) {
      PLAYER_MANA = potentialMana;
    } else {
      PLAYER_MANA = 100
    }
    updateStats('player', 'mp', PLAYER_MANA)
    return
  }

  const potentialMana = COMPUTER_MANA += amount;
  if (potentialMana <= 100) {
    COMPUTER_MANA = potentialMana
  } else {
    COMPUTER_MANA = 100
  }
  updateStats('bot', 'mp', COMPUTER_MANA)
}

startGameBtn.addEventListener('click', toggleGameStatus)
endGameBtn.addEventListener('click', toggleGameStatus)

rockBtn.addEventListener('click', () => {
  playerChoice(0)
})
paperBtn.addEventListener('click', () => {
  playerChoice(1)
})
scissorsBtn.addEventListener('click', () => {
  playerChoice(2)
})
