var Coin = require("./coin.js")
var Furry = require("./furry.js")

function Game() {
  this.board = document.querySelectorAll("section#board div")
  this.score__board = document.querySelector("#score strong")
  this.gameOverBoard = document.querySelector(".gameOver")
  this.gameOverScore = document.querySelector(".gameOver div")
  this.gameOverScoreEndscore = document.querySelector(".gameOver div strong")
  this.furry = new Furry()
  this.coin = new Coin()
  this.score = 0
  this.index = function(x, y) {
    return x + y * 10
  }
  this.showFurry = function() {
    this.hideVisibleFurry()
    this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry")
  }
  this.showCoin = function() {
    this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin")
  }
  var self = this
  this.startGame = function() {
    clearInterval(this.idSetInterval)
    this.idSetInterval = setInterval(this.moveFurry, 250)
    this.memoryInterval = this.idSetInterval
  }
  this.memoryInterval = null
  this.pauseGame = function() {
    clearInterval(this.idSetInterval)
  }

  this.moveFurry = function() {
    if (self.furry.direction === "right") {
      self.furry.x = self.furry.x + 1
    } else if (self.furry.direction === "left") {
      self.furry.x = self.furry.x - 1
    } else if (self.furry.direction === "up") {
      self.furry.y = self.furry.y - 1
    } else if (self.furry.direction === "down") {
      self.furry.y = self.furry.y + 1
    }
    self.gameOver()
    self.showFurry()
    self.checkCoinCollision()
  }
  this.hideVisibleFurry = function() {
    const furry = document.querySelector("div.furry")
    furry && furry.classList.remove("furry")
  }
  this.turnFurry = function(event) {
    switch (event.which) {
      case 37:
        self.furry.direction = "left"
        break
      case 38:
        self.furry.direction = "up"
        break
      case 39:
        self.furry.direction = "right"
        break
      case 40:
        self.furry.direction = "down"
        break
    }
  }
  this.checkCoinCollision = function() {
    if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
      document.querySelector("div.coin").classList.remove("coin")
      this.score++
      this.score__board.innerHTML = this.score
      this.coin = new Coin()
      this.showCoin()
    }
  }
  this.gameOver = function() {
    if (
      this.furry.x < 0 ||
      this.furry.x > 9 ||
      this.furry.y < 0 ||
      this.furry.y > 9
    ) {
      clearInterval(this.idSetInterval)
      this.hideVisibleFurry()
      this.gameOverBoard.classList.add("opacity")
      this.gameOverScoreEndscore.innerHTML = this.score
      this.gameOverScore.classList.add("opacity")
    }
  }
}

module.exports = Game
