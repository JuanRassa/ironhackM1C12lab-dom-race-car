class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement('img');

    this.addPlayer(imgSrc);
  }

  addPlayer(imgSrc) {
    //  Adding the player to the screen
    this.element.src = imgSrc;
    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left < 60) {
      this.left = 60;
    }
    if (this.top < 10) {
      this.top = 10;
    }

    //  Handles the right side of the road. We use the road width minus the car width and minus the 10 margin.
    if (this.left > this.gameScreen.offsetWidth - this.width - 60) {
      this.left = this.gameScreen.offsetWidth - this.width - 60;
    }
    const bottomMaxValue = this.gameScreen.offsetHeight - this.height - 10;
    if (this.top > bottomMaxValue) {
      this.top = bottomMaxValue;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
