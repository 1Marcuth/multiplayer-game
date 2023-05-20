import * as socketio from "socket.io"
import express from "express"
import http from "http"

import createGame from "./public/src/js/game.js"

const port = process.env.PORT || 3001

const app = express()
const server = http.createServer(app)
const sockets = new socketio.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(express.static("public"))

const game = createGame({ width: 30, height: 30 })

game.start()

game.subscribe((command) => {
    sockets.emit(command.type, command)
})

sockets.on("connection", (socket) => {
    const playerId = socket.id

    game.addPlayer({ playerId })
    socket.emit("setup", game.state)

    socket.on("disconnect", () => {
        game.removePlayer({ playerId })
    })

    socket.on("move-player", (command) => {
        command.playerId = playerId
        command.type = "move-player"

        game.movePlayer(command)
    })
})

app.get("/game-state", (req, res) => {
    return res.send(game.state)
})

server.listen(port, () => {
    console.log(`> [server] Listening on http://localhost:${port}/`)
})