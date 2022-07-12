function calculateNeighbours(currentPosition: GridPosition, dimensions: Dimensions): GridPosition[] {
    const validNeighbours = []
    const eastPos: GridPosition = { x: currentPosition.x + 1, y: currentPosition.y }
    const westPos: GridPosition = { x: currentPosition.x - 1, y: currentPosition.y }
    const northPos: GridPosition = { x: currentPosition.x, y: currentPosition.y - 1 }
    const southPos: GridPosition = { x: currentPosition.x, y: currentPosition.y + 1 }
    for (const n of [northPos, southPos, eastPos, westPos]) {
        const validX = n.x < dimensions.numCols && n.x > -1
        const vlaidY = n.y < dimensions.numRows && n.y > -1
        if (validX && vlaidY) {
            validNeighbours.push(n)
        }
    }
    return validNeighbours
}