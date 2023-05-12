const collectFruitAudio = new Audio("assets/audios/collect.mp3")
const collect100FruitAudio = new Audio("assets/audios/100-collect.mp3")

export default function removeFruit(game, socket, command) {
    // // console.log(`> [client] Receving '${command.type}' -> '${command.fruitId}'.`)
    const playerId = socket.id
    const player = game.state.players[playerId]
    game.removeFruit(command)

    const multipleOf100Remainder = player.score % 100

    if (multipleOf100Remainder !== 0) {
        collectFruitAudio.pause()
        collectFruitAudio.currentTime = 0
        collectFruitAudio.play()
    }

    if (multipleOf100Remainder === 0 && player.score !== 0) {
        collectFruitAudio.pause()
        collect100FruitAudio.pause()
        collect100FruitAudio.currentTime = 0
        collect100FruitAudio.play()
    }
}