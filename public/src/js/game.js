export default function createGame(screen) {
    const state = {
        players: {},
        fruits: {},
        screen
    }

    const observers = []

    function start() {
        const frequency = 2000
        setInterval(addFruit, frequency)
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }
    
    function notifyAll(command) {
        // console.log(`Notifying ${observers.length} observers`)

        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height)

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }

        notifyAll({
            type: "add-fruit",
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
    }

    function removeFruit(command) {
        const fruitId = command.fruitId
        delete state.fruits[fruitId]

        notifyAll({
            type: "remove-fruit",
            fruitId: fruitId
        })
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = "playerX" in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = "playerY" in command ? command.playerY : Math.floor(Math.random() * state.screen.height)
        const score = 0

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            score: score
        }

        notifyAll({
            type: "add-player",
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
            score: score
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId
        
        delete state.players[playerId]

        notifyAll({
            type: "remove-player",
            playerId: playerId
        })
    }

    function movePlayer(command) {
        notifyAll(command)

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
                if (player.x - 1 >= 0) {
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
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]

            if (player.x === fruit.x && player.y === fruit.y) {
                removeFruit({ fruitId: fruitId })
                player.score += 1
            }
        }
    }

    return {
        start,
        subscribe,
        setState,
        addFruit,
        removeFruit,
        addPlayer,
        removePlayer,
        movePlayer,
        state
    }
}
