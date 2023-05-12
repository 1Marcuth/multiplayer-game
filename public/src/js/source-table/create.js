export default function createScoreTable(document) {
    const $sourceTable = document.createElement("table")
    $sourceTable.setAttribute("id", "score-table")
    document.body.appendChild($sourceTable)
    return $sourceTable
}