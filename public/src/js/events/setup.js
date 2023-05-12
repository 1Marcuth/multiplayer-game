import renderScreen from "../screen/render-screen.js"
import createScreen from "../screen/create-screen.js"
import createScoreTable from "../source-table/create.js"

export default function setup(document, socket, game, state, keyboardListener) {
    const playerId = socket.id
    const $screen = createScreen(document, state.screen)
    const $scoreTable = createScoreTable(document)

    game.setState(state)

    keyboardListener.registerPlayerId(playerId)
    keyboardListener.subscribe(game.movePlayer)

    keyboardListener.subscribe((command) => socket.emit("move-player", command))
    
    socket.on("disconnect", () => {
        $screen.remove()
        $scoreTable.remove()
    })

    renderScreen($screen, game, playerId, $scoreTable, requestAnimationFrame)
}