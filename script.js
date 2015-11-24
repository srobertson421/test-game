if (localStorage.score) {
  var score = JSON.parse(localStorage.getItem('score'));
} else {
  var score = 0;
}

$(document).ready(function() {
  if (score > 0) {
    $('#counter').text(score);
  }

  // Event Handlers
  $('#player-form').submit(function(e) {
    e.preventDefault();

    var choice = $('input:checked')[0].value.toLowerCase();

    $('#player-form').hide();
    $('.player-choice #' + choice).removeClass('hidden');

    initGame(choice);
  });
});

var initGame = function(playerChoice) {
  var rivalChoice = rivalLogic();

  $('.rival-section #' + rivalChoice).removeClass('hidden');

  setTimeout(function() {
    checkWinner(playerChoice, rivalChoice);
  }, 1000);
}

var rivalLogic = function() {
  var rndNum = getRandomInt(1, 3);

  if (rndNum === 1) {
    return 'rock';
  } else if (rndNum === 2) {
    return 'paper';
  } else if (rndNum === 3) {
    return 'scissors';
  } else {
    console.log('Random number error: ' + rndNum);
  }
}

var checkWinner = function(player, rival) {
  if (player === rival) {
    alert('DRAW!!');
    gameReset();
  }

  else if (player === 'rock') {
    if (rival === 'paper') {
      playerLoses();
    } else if (rival === 'scissors') {
      playerWins();
    }
  }

  else if (player === 'paper') {
    if (rival === 'scissors') {
      playerLoses();
    } else if (rival === 'rock') {
      playerWins();
    }
  }

  else if (player === 'scissors') {
    if (rival === 'rock') {
      playerLoses();
    } else if (rival === 'paper') {
      playerWins();
    }
  }
}

var playerWins = function() {
  alert('YOU WIN!!!');
  score++;
  $('#counter').text(score);
  localStorage.setItem('score', JSON.stringify(score));
  gameReset();
}

var playerLoses = function() {
  alert('SORRY, YOU LOSE :(');
  gameReset();
}

var gameReset = function() {
  $('.choice-symbol').addClass('hidden');
  $('#player-form').show();
}

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




