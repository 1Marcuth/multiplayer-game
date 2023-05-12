export default function connect(socket, keyboardListener) {
    const playerId = socket.id
    console.log(`> [client] Player connected on client with id '${playerId}'.`)
    keyboardListener.registerPlayerId(playerId)
}