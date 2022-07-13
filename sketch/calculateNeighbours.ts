
/**
 * 
 * @param currentPosition current grid position
 * @param dimensions 
 * @returns array of valid neighbours for this grid position
 */

function calculateNeighbours(currentPosition: GridPosition, dimensions: Dimensions): GridPosition[] {
    const validNeighbours = []
    const eastPos: GridPosition = { x: currentPosition.x + 1, y: currentPosition.y }
    const westPos: GridPosition = { x: currentPosition.x - 1, y: currentPosition.y }
    const northPos: GridPosition = { x: currentPosition.x, y: currentPosition.y - 1 }
    const southPos: GridPosition = { x: currentPosition.x, y: currentPosition.y + 1 }
    //make sure they're inside grid boundaries
    for (const n of [northPos, southPos, eastPos, westPos]) {
        const validX = n.x < dimensions.numCols && n.x >= 0
        const validY = n.y < dimensions.numRows && n.y >= 0
        if (validX && validY) {
            validNeighbours.push(n)
        }
    }
    return validNeighbours
}