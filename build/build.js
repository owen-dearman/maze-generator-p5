function calculateNeighbours(currentPosition, dimensions) {
    var validNeighbours = [];
    var eastPos = { x: currentPosition.x + 1, y: currentPosition.y };
    var westPos = { x: currentPosition.x - 1, y: currentPosition.y };
    var northPos = { x: currentPosition.x, y: currentPosition.y - 1 };
    var southPos = { x: currentPosition.x, y: currentPosition.y + 1 };
    for (var _i = 0, _a = [northPos, southPos, eastPos, westPos]; _i < _a.length; _i++) {
        var n = _a[_i];
        var validX = n.x < dimensions.numCols && n.x >= 0;
        var validY = n.y < dimensions.numRows && n.y >= 0;
        if (validX && validY) {
            validNeighbours.push(n);
        }
    }
    return validNeighbours;
}
function carveFullMaze(dimensions) {
    var currentPos = { x: getRandomPosition(dimensions.numCols), y: getRandomPosition(dimensions.numRows) };
    var unvisitedNeighbours = getAllUnivisitedNeighbours(currentPos, visitedCellPositions, dimensions);
    carvePathThroughGrid(currentPos, unvisitedNeighbours, dimensions);
}
function carvePathThroughGrid(currentPos, unvisitedNeighbours, dimensions) {
    if (unvisitedNeighbours.length === 0) {
        visitedCellPositions.push(currentPos);
        var validNeighbours = calculateNeighbours(currentPos, dimensions);
        var nextPos = random(validNeighbours);
        var movementBetweenPositions = calculateCellDifference(currentPos, nextPos);
        handleWallCarving(movementBetweenPositions, grid.getCellAt(currentPos), grid.getCellAt(nextPos));
    }
    while (unvisitedNeighbours.length > 0) {
        var nextPos = random(unvisitedNeighbours);
        var movementBetweenPositions = calculateCellDifference(currentPos, nextPos);
        handleWallCarving(movementBetweenPositions, grid.getCellAt(currentPos), grid.getCellAt(nextPos));
        visitedCellPositions.push(currentPos);
        currentPos = nextPos;
        unvisitedNeighbours = getAllUnivisitedNeighbours(nextPos, visitedCellPositions, dimensions);
    }
    var firstUnvisitedCell = grid.getFirstUnvisitedCell();
    if (typeof firstUnvisitedCell === "string") {
        return;
    }
    var newUnvisitedNeighbours = getAllUnivisitedNeighbours(firstUnvisitedCell, visitedCellPositions, dimensions);
    carvePathThroughGrid(firstUnvisitedCell, newUnvisitedNeighbours, dimensions);
}
function handleWallCarving(movement, current, next) {
    if (movement.x === 0 && movement.y === 1) {
        current.s = "open";
        next.n = "open";
    }
    else if (movement.x === 0 && movement.y === -1) {
        current.n = "open";
        next.s = "open";
    }
    else if (movement.x === 1 && movement.y === 0) {
        current.e = "open";
        next.w = "open";
    }
    else if (movement.x === -1 && movement.y === 0) {
        current.w = "open";
        next.e = "open";
    }
}
function calculateCellDifference(pos1, pos2) {
    return { x: pos2.x - pos1.x, y: pos2.y - pos1.y };
}
function getRandomPosition(max) {
    var numbers = [];
    for (var i = 0; i < max - 1; i++) {
        numbers.push(i);
    }
    return random(numbers);
}
function createGrid(numRows, numCols) {
    var grid = [];
    for (var rowIx = 0; rowIx < numRows; rowIx++) {
        var rowCells = [];
        for (var colIx = 0; colIx < numCols; colIx++) {
            var cell = getClosedCell();
            rowCells.push(cell);
        }
        grid.push(rowCells);
    }
    function getCellAt(pos) {
        var rowQuery = grid[pos.y];
        var cellQuery = rowQuery[pos.x];
        return cellQuery;
    }
    function getDimensions() {
        return { numRows: numRows, numCols: numCols };
    }
    function getFirstUnvisitedCell() {
        for (var _i = 0, grid_1 = grid; _i < grid_1.length; _i++) {
            var cellRow = grid_1[_i];
            for (var _a = 0, cellRow_1 = cellRow; _a < cellRow_1.length; _a++) {
                var cell = cellRow_1[_a];
                var allWallsClosed = cell.n === "closed" && cell.s === "closed" && cell.e === "closed" && cell.w === "closed";
                if (allWallsClosed) {
                    return { x: cellRow.indexOf(cell), y: grid.indexOf(cellRow) };
                }
            }
        }
        return "all cells visited";
    }
    return { getCellAt: getCellAt, getDimensions: getDimensions, getFirstUnvisitedCell: getFirstUnvisitedCell };
}
function getClosedCell() {
    return { n: 'closed', s: 'closed', e: 'closed', w: 'closed' };
}
function getRandomCell() {
    return {
        n: getRandomWallStatus(),
        s: getRandomWallStatus(),
        e: getRandomWallStatus(),
        w: getRandomWallStatus(),
    };
}
function getRandomWallStatus() {
    return random(['open', 'closed']);
}
function drawGrid(grid) {
    var dimensions = grid.getDimensions();
    for (var rowIx = 0; rowIx < dimensions.numRows; rowIx++) {
        for (var colIx = 0; colIx < dimensions.numCols; colIx++) {
            var cellWalls = grid.getCellAt({ x: colIx, y: rowIx });
            drawWalls(cellWalls, dimensions, rowIx, colIx);
        }
    }
}
function drawWalls(cell, dimensions, row, column) {
    var cellWidth = width / dimensions.numCols;
    var cellHeight = height / dimensions.numRows;
    var northWest = {
        x: column * cellWidth,
        y: row * cellHeight,
    };
    var northEast = {
        x: (column + 1) * cellWidth,
        y: row * cellHeight,
    };
    var southWest = { x: column * cellWidth, y: (row + 1) * cellHeight };
    var southEast = {
        x: (column + 1) * cellWidth,
        y: (row + 1) * cellHeight,
    };
    stroke('orange');
    strokeWeight(7);
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
function gridPosToScreenPos(_a, dimensions) {
    var x = _a.x, y = _a.y;
    var cellWidth = width / dimensions.numCols;
    var cellHeight = height / dimensions.numRows;
    var screenX = x * cellWidth + cellWidth / 2;
    var screenY = y * cellHeight + cellHeight / 2;
    return { x: screenX, y: screenY };
}
function getAllUnivisitedNeighbours(pos, visitedArr, dimensions) {
    var allneighbours = calculateNeighbours(pos, dimensions);
    var visitedArrconvertedForComparision = visitedArr.map(function (pos) { return "".concat(pos.x, ":").concat(pos.y); });
    var unvisitedNeighbours = [];
    for (var _i = 0, allneighbours_1 = allneighbours; _i < allneighbours_1.length; _i++) {
        var neighbour = allneighbours_1[_i];
        var isVisited = visitedArrconvertedForComparision.includes("".concat(neighbour.x, ":").concat(neighbour.y));
        if (!isVisited) {
            unvisitedNeighbours.push(neighbour);
        }
    }
    return unvisitedNeighbours;
}
var grid;
var visitedCellPositions = [];
var numRows = 40;
var numCols = 50;
function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    grid = createGrid(numRows, numCols);
    noLoop();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(60);
    carveFullMaze(grid.getDimensions());
    drawGrid(grid);
}
//# sourceMappingURL=build.js.map