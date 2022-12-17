export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId
        
        delete state.fruits[fruitId]
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId
        
        delete state.players[playerId]
    }

    function movePlayer(command) {
        //console.log(`Moving ${command.playerId} with ${command.keyPressed}`)

        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0) {
                    player.y -= 1
                }
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width) {
                    player.x += 1
                }
            },
            ArrowDown(player) {
                if (player.y + 1 < state.screen.height) {
                    player.y += 1
                }
            },
            ArrowLeft(player) {
                if (keyPressed === "ArrowLeft" && player.x - 1 >= 0) {
                    player.x -= 1 
                }
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        }

        return
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]

            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`COLLISION between ${playerId} and ${fruitId}`)

                removeFruit({ fruitId: fruitId })
            }
        }
    }

    return {
        addFruit,
        removeFruit,
        addPlayer,
        removePlayer,
        movePlayer,
        state
    }
}
