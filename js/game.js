class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-screen');
    this.gameEndScreen = document.getElementById('game-end');
    this.player = new Player(this.gameScreen, 200, 500, 50, 80, './images/car.png');
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
  }

  start() {
    //  setting the game screen size
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    //  hiding the start screen
    this.startScreen.style.display = 'none';

    //  showing the game screen
    this.gameScreen.style.display = 'block';

    this.gameLoop();
  }

  gameLoop() {
    // console.log('Inside the game loop...');
    if (this.isGameOver) {
      return;
    }
    this.update();
    this.updateStats();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // console.log('Inside the update');
    this.player.move();

    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
    this.obstacles.forEach((obstacle, index) => {
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(index, 1);

        this.lives--;
      } else if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.obstacles.splice(index, 1);
        this.score++;
      }
    });
    if (this.lives === 0) {
      this.endGame();
    }
  }
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(obs => obs.element.remove());
    this.isGameOver = true;

    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
  }
  updateStats() {
    const score = document.getElementById('score');
    score.innerText = this.score;
    const lives = document.getElementById('lives');
    lives.innerText = this.lives;
  }
}
