import createKeyboardListener from "./keyboard-listener.js"
import createGame from "./game.js"

import connect from "./events/connect.js"
import setup from "./events/setup.js"
import addPlayer from "./events/add-player.js"
import movePlayer from "./events/move-player.js"
import removePlayer from "./events/remove-player.js"
import addFruit from "./events/add-fruit.js"
import removeFruit from "./events/remove-fruit.js"

const game = createGame()
const keyboardListener = createKeyboardListener(document)
const socket = io()

socket.on("connect", () => connect(socket, keyboardListener))
socket.on("setup", (state) => setup(document, socket, game, state, keyboardListener))
socket.on("add-player", (command) => addPlayer(game, command))
socket.on("move-player", (command) => movePlayer(game, command, socket))
socket.on("remove-player", (command) => removePlayer(game, command))
socket.on("add-fruit", (command) => addFruit(game, command))
socket.on("remove-fruit", (command) => removeFruit(game, socket, command))