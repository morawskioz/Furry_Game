var Game = require("./game.js")

var game = new Game()

game.showFurry()

game.showCoin()

document.addEventListener("keydown", function(event) {
  game.turnFurry(event)
})

const pauseButton = document.getElementById("pause_button")
const startButton = document.getElementById("start_button")

pauseButton.addEventListener("click", () => game.pauseGame())
startButton.addEventListener("click", () => game.startGame())

const keyDownHandler = e => {
  switch (e.code) {
    case "Enter":
      game.startGame()
      break
    case "Space":
      game.pauseGame()
      break
  }
}

window.addEventListener("keydown", keyDownHandler)
