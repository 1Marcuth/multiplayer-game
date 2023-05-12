export default function createScreen(document, size) {
    const { width, height } = size

    const $canvas = document.createElement("canvas")

    $canvas.setAttribute("id", "screen")
    $canvas.width = width
    $canvas.height = height
    document.body.appendChild($canvas)

    return $canvas
}