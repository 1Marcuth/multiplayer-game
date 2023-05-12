export default function movePlayer(game, command, socket) {
    // console.log(`> [client] Receving '${command.type}' -> '${command.playerId}'.`)

    const playerId = socket.id

    if (playerId !== command.playerId) {
        game.movePlayer(command)
    }
}