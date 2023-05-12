export default function addPlayer(game, command) {
    console.log(`> [client] Receving '${command.type}' -> '${command.playerId}'.`)
    game.addPlayer(command)
}