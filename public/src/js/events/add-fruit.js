export default function addFruit(game, command) {
    // console.log(`> [client] Receving '${command.type}' -> '${command.fruitId}'.`)
    game.addFruit(command)
}