/**
 * 
 * @param numRows number of rows in grid
 * @param numCols number of columns in grid
 * @returns the grid
 */

function createGrid(numRows: number, numCols: number): Grid {
    const grid: Cell[][] = [];
    for (let rowIx = 0; rowIx < numRows; rowIx++) {
        let rowCells = [];
        for (let colIx = 0; colIx < numCols; colIx++) {
            const cell = getClosedCell();
            rowCells.push(cell);
        }
        grid.push(rowCells);
    }

    /**
     * 
     * @param pos grid position to get cell of
     * @returns cell at that position
     */
    function getCellAt(pos: GridPosition): Cell {
        const rowQuery = grid[pos.y];
        const cellQuery = rowQuery[pos.x];
        return cellQuery;
    }

    /**
     * 
     * @returns dimensions of grid
     */
    function getDimensions(): Dimensions {
        return { numRows: numRows, numCols: numCols };
    }

    /**
     * 
     * @returns earliest unvisited cell position
     */
    function getFirstUnvisitedCell(): GridPosition | string {
        for (const cellRow of grid) {
            for (const cell of cellRow) {
                const allWallsClosed = cell.n === "closed" && cell.s === "closed" && cell.e === "closed" && cell.w === "closed"
                if (allWallsClosed) {
                    return { x: cellRow.indexOf(cell), y: grid.indexOf(cellRow) }
                }
            }
        }
        return "all cells visited"
    }

    return { getCellAt, getDimensions, getFirstUnvisitedCell };
}

function getClosedCell(): Cell {
    return { n: 'closed', s: 'closed', e: 'closed', w: 'closed' };
}

function getRandomCell(): Cell {
    return {
        n: getRandomWallStatus(),
        s: getRandomWallStatus(),
        e: getRandomWallStatus(),
        w: getRandomWallStatus(),
    };
}

function getRandomWallStatus(): WallStatus {
    return random(['open', 'closed']);
}

/*
ROW = HEIGHT
COLUMN = WIDTH
*/

/**
 * 
 * @param grid the grid
 * Draws the grid to the screen, including walls
 */

function drawGrid(grid: Grid): void {
    const dimensions = grid.getDimensions();
    for (let rowIx = 0; rowIx < dimensions.numRows; rowIx++) {
        for (let colIx = 0; colIx < dimensions.numCols; colIx++) {
            const cellWalls = grid.getCellAt({ x: colIx, y: rowIx });

            //UNCOMMENT FOR DEBUGGING PURPOSES

            // const debugText = JSON.stringify({ colIx, rowIx, cellWalls }, null, 2);
            // textSize(15);
            // fill('white');
            // noStroke();
            // text(
            //     debugText,
            //     (colIx * width) / dimensions.numCols,
            //     (rowIx * height) / dimensions.numRows
            // );
            drawWalls(cellWalls, dimensions, rowIx, colIx);
        }
    }
}

/**
 * 
 * @param cell current cell
 * @param dimensions dimensions of grid
 * @param row row index
 * @param column column index
 * calculates correct screen position to draw each wall of the cell
 */

function drawWalls(
    cell: Cell,
    dimensions: Dimensions,
    row: number,
    column: number
): void {
    const cellWidth = width / dimensions.numCols;
    const cellHeight = height / dimensions.numRows;
    const northWest = {
        x: column * cellWidth,
        y: row * cellHeight,
    };
    const northEast = {
        x: (column + 1) * cellWidth,
        y: row * cellHeight,
    };
    const southWest = { x: column * cellWidth, y: (row + 1) * cellHeight };
    const southEast = {
        x: (column + 1) * cellWidth,
        y: (row + 1) * cellHeight,
    };
    stroke('orange');
    strokeWeight(7)
    if (cell.n === 'closed') {
        line(northWest.x, northWest.y, northEast.x, northEast.y);
    }
    if (cell.e === 'closed') {
        line(northEast.x, northEast.y, southEast.x, southEast.y);
    }
    if (cell.s === 'closed') {
        line(southWest.x, southWest.y, southEast.x, southEast.y);
    }
    if (cell.w === 'closed') {
        line(northWest.x, northWest.y, southWest.x, southWest.y);
    }
}

/**
 * 
 * @param grid position to convert
 * @param dimensions dimensions of grid
 * @returns conversion to screen position
 * USED FOR DEBUGGING PURPOSES
 */

function gridPosToScreenPos(
    { x, y }: GridPosition,
    dimensions: Dimensions
): GridPosition {
    const cellWidth = width / dimensions.numCols;
    const cellHeight = height / dimensions.numRows;
    const screenX = x * cellWidth + cellWidth / 2;
    const screenY = y * cellHeight + cellHeight / 2;
    return { x: screenX, y: screenY };
}