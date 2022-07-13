/**
 * 
 * @param dimensions number of rows and columns in the grid
 * calls a recursive function to carve up the grid, based on a random starting position
 */

function carveFullMaze(dimensions: Dimensions): void {
    //get random position
    const currentPos = { x: getRandomPosition(dimensions.numCols), y: getRandomPosition(dimensions.numRows) }
    //find it's valid, unvisited neighbours
    const unvisitedNeighbours = getAllUnivisitedNeighbours(currentPos, visitedCellPositions, dimensions)
    //carve a path from currentPos
    carvePathThroughGrid(currentPos, unvisitedNeighbours, dimensions)
}

/**
 * 
 * @param currentPos current grid position to carve from
 * @param unvisitedNeighbours array of valid neighbours that have not yet been visited
 * @param dimensions dimensions of the grid
 * This recursive function carves a path through the grid until it reaches a dead end where all neighbours have been visited.
 * It then finds the earliest unvisited cell and starts this again until all cells are visited
 */

function carvePathThroughGrid(currentPos: GridPosition, unvisitedNeighbours: GridPosition[], dimensions: Dimensions): void {
    //If the current cell has no unvisited neighbours, then carve a random wall to join it up with the rest of the grid
    if (unvisitedNeighbours.length === 0) {
        visitedCellPositions.push(currentPos)
        const validNeighbours = calculateNeighbours(currentPos, dimensions)
        const nextPos = random(validNeighbours)
        const movementBetweenPositions = calculateCellDifference(currentPos, nextPos)
        handleWallCarving(movementBetweenPositions, grid.getCellAt(currentPos), grid.getCellAt(nextPos))
    }

    //whilst the current cell has unvisited neighbours, select one from random and carve through to it. Continue doing this
    // until current cell has no unvisited neighbours.
    while (unvisitedNeighbours.length > 0) {
        const nextPos: GridPosition = random(unvisitedNeighbours)
        const movementBetweenPositions = calculateCellDifference(currentPos, nextPos)
        handleWallCarving(movementBetweenPositions, grid.getCellAt(currentPos), grid.getCellAt(nextPos))
        visitedCellPositions.push(currentPos)
        currentPos = nextPos
        unvisitedNeighbours = getAllUnivisitedNeighbours(nextPos, visitedCellPositions, dimensions)
    }

    //find first unvisited cell
    const firstUnvisitedCell = grid.getFirstUnvisitedCell()
    //if string, then all cells have been visited
    if (typeof firstUnvisitedCell === "string") {
        return
    }
    //find unvisited neighbours of this new cell and call carve through grid
    let newUnvisitedNeighbours = getAllUnivisitedNeighbours(firstUnvisitedCell, visitedCellPositions, dimensions)
    carvePathThroughGrid(firstUnvisitedCell, newUnvisitedNeighbours, dimensions)
}

/**
 * 
 * @param movement difference between next and current cells (x:1,y:0; x:-1:y:0; x:0,y:1; x:0,y:-1)
 * @param current current cell
 * @param next next cell
 * This manipulates the grid cells to "open up" the relevant walls depending on which one has been selected
 */

function handleWallCarving(movement: GridPosition, current: Cell, next: Cell): void {
    if (movement.x === 0 && movement.y === 1) {
        current.s = "open"
        next.n = "open"
    } else if (movement.x === 0 && movement.y === -1) {
        current.n = "open"
        next.s = "open"
    } else if (movement.x === 1 && movement.y === 0) {
        current.e = "open"
        next.w = "open"
    } else if (movement.x === -1 && movement.y === 0) {
        current.w = "open"
        next.e = "open"
    }
}

/**
 * 
 * @param pos1 position
 * @param pos2 position
 * @returns difference between two cells
 */

function calculateCellDifference(pos1: GridPosition, pos2: GridPosition) {
    return { x: pos2.x - pos1.x, y: pos2.y - pos1.y }
}

/**
 * 
 * @param max upper limit
 * @returns random number between 0 and upper limit - 1
 */

function getRandomPosition(max: number): number {
    const numbers: number[] = []
    for (let i = 0; i < max - 1; i++) {
        numbers.push(i)
    }
    return random(numbers)
}