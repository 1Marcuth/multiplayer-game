import * as socketio from "socket.io"
import express from "express"
import http from "http"

import createGame from "./public/src/js/game.js"

const port = 3000

const app = express()
const server = http.createServer(app)
const sockets = new socketio.Server(server)

app.use(express.static("public"))

const game = createGame({ width: 30, height: 30 })

game.start()

game.subscribe((command) => {
    // console.log(`> [server] Emitting '${command.type}'`)
    sockets.emit(command.type, command)
})

sockets.on("connection", (socket) => {
    const playerId = socket.id
    // console.log(`> [socket] Player conneted on server with id '${playerId}'.`)

    game.addPlayer({ playerId })
    socket.emit("setup", game.state)

    // console.log(game.state)

    socket.on("disconnect", () => {
        game.removePlayer({ playerId })
        // console.log(`> [server] Player disconected '${playerId}'.`)
    })

    socket.on("move-player", (command) => {
        // Sobrescrevendo dados por questão de segurança
        command.playerId = playerId
        command.type = "move-player"

        game.movePlayer(command)
    })
})

server.listen(port, () => {
    console.log(`> [server] Listening on http://localhost:${port}/`)
})