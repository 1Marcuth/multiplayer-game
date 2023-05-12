export default function removePlayer(game, command) {
    console.log(`> [client] Receving '${command.type}' -> '${command.playerId}'.`)
    game.removePlayer(command)
}