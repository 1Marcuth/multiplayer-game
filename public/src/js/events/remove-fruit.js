export default function removeFruit(game, command) {
    console.log(`> [client] Receving '${command.type}' -> '${command.fruitId}'.`)
    game.removeFruit(command)
}