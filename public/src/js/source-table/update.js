export default function updateScoreTable(scoreTable, game, currentPlayerId) {
    const maxResults = 10

    let scoreTableInnerHTML = `
        <tr class="header">
            <td>Top 10 Jogadores</td>
            <td>Pontos</td>
        </tr>
    `

    const players = []

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]

        players.push({
            playerId: playerId,
            x: player.x,
            y: player.y,
            score: player.score
        })
    }
    
    const playersSortedByScore = players.sort((first, second) => {
        if (first.score < second.score) {
            return 1
        }

        if (first.score > second.score) {
            return -1
        }

        return 0
    })

    const topScorePlayers = playersSortedByScore.slice(0, maxResults)

    scoreTableInnerHTML = topScorePlayers.reduce((stringFormed, player) => {
        return stringFormed + `
            <tr ${player.playerId === currentPlayerId ? 'class="current-player"' : ''}>
                <td>${player.playerId}</td>
                <td>${player.score}</td>
            </tr>
        `
    }, scoreTableInnerHTML)

    const currentPlayerFromTopScore = topScorePlayers[currentPlayerId]

    if (currentPlayerFromTopScore) {
        scoreTableInnerHTML += `
            <tr class="current-player bottom">
                <td class="socket-id">${currentPlayerFromTopScore.id} EU </td>
                <td class="score-value">${currentPlayerFromTopScore.score}</td>
            </tr>
        `
    }

    scoreTable.innerHTML = scoreTableInnerHTML
}