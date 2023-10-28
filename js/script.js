window.onload = function () {
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const game = new Game();

  startButton.addEventListener('click', function () {
    startGame();
  });

  function startGame() {
    console.log('start game');

    game.start();
  }

  window.addEventListener('keydown', e => {
    e.preventDefault();
    switch (e.key) {
      case 'ArrowUp':
        game.player.directionY = -8;
        break;
      case 'ArrowDown':
        game.player.directionY = 8;
        break;
      case 'ArrowLeft':
        game.player.directionX = -8;
        break;
      case 'ArrowRight':
        game.player.directionX = 8;
        break;

      default:
        break;
    }
  });
  restartButton.addEventListener('click', function () {
    location.reload();
  });
};
