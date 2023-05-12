import updateScoreTable from "../source-table/update.js"

export default function renderScreen($screen, game, currentPlayerId, $scoreTable, requestAnimationFrame) {
    const context = $screen.getContext("2d")
    const screenSize = game.state.screen

    context.fillStyle = "white"
    context.clearRect(0, 0, screenSize.width, screenSize.height)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]

        context.fillStyle = "#ddd"
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]

        context.fillStyle = "#90ee90"
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if (currentPlayer) {
        context.fillStyle = "#F0DB4F"
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    updateScoreTable($scoreTable, game, currentPlayerId)

    requestAnimationFrame(() => {
        renderScreen($screen, game, currentPlayerId, $scoreTable, requestAnimationFrame)
    })
}