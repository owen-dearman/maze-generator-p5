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

function createGrid(numRows: number, numCols: number): Grid {
    const grid: Cell[][] = [];
    for (let rowIx = 0; rowIx < numRows; rowIx++) {
        let rowCells = [];
        for (let colIx = 0; colIx < numRows; colIx++) {
            const cell = getClosedCell();
            rowCells.push(cell);
        }
        grid.push(rowCells);
    }
    function getCellAt(pos: GridPosition): Cell {
        const rowQuery = grid[pos.x];
        const cellQuery = rowQuery[pos.y];
        return cellQuery;
    }
    function getDimensions(): Dimensions {
        return { numRows: numRows, numCols: numCols };
    }
    return { getCellAt, getDimensions };
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

function drawGrid(grid: Grid): void {
    const dimensions = grid.getDimensions();
    for (let rowIx = 0; rowIx < dimensions.numRows; rowIx++) {
        for (let colIx = 0; colIx < dimensions.numCols; colIx++) {
            const cellWalls = grid.getCellAt({ x: colIx, y: rowIx });
            const debugText = JSON.stringify({ rowIx, colIx, cellWalls }, null, 2);
            textSize(15);
            fill('white');
            noStroke();
            text(
                debugText,
                (colIx * width) / dimensions.numCols,
                (rowIx * height) / dimensions.numRows
            );
            drawWalls(cellWalls, dimensions, rowIx, colIx);
        }
    }
}

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




