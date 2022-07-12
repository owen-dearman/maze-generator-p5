function calculateNeighbours(currentPosition, dimensions) {
    var validNeighbours = [];
    var eastPos = { x: currentPosition.x + 1, y: currentPosition.y };
    var westPos = { x: currentPosition.x - 1, y: currentPosition.y };
    var northPos = { x: currentPosition.x, y: currentPosition.y - 1 };
    var southPos = { x: currentPosition.x, y: currentPosition.y + 1 };
    for (var _i = 0, _a = [northPos, southPos, eastPos, westPos]; _i < _a.length; _i++) {
        var n = _a[_i];
        var validX = n.x < dimensions.numCols && n.x > -1;
        var vlaidY = n.y < dimensions.numRows && n.y > -1;
        if (validX && vlaidY) {
            validNeighbours.push(n);
        }
    }
    return validNeighbours;
}
function gridPosToScreenPos(_a, dimensions) {
    var x = _a.x, y = _a.y;
    var cellWidth = width / dimensions.numCols;
    var cellHeight = height / dimensions.numRows;
    var screenX = x * cellWidth + cellWidth / 2;
    var screenY = y * cellHeight + cellHeight / 2;
    return { x: screenX, y: screenY };
}
function createGrid(numRows, numCols) {
    var grid = [];
    for (var rowIx = 0; rowIx < numRows; rowIx++) {
        var rowCells = [];
        for (var colIx = 0; colIx < numRows; colIx++) {
            var cell = getClosedCell();
            rowCells.push(cell);
        }
        grid.push(rowCells);
    }
    function getCellAt(pos) {
        var rowQuery = grid[pos.x];
        var cellQuery = rowQuery[pos.y];
        return cellQuery;
    }
    function getDimensions() {
        return { numRows: numRows, numCols: numCols };
    }
    return { getCellAt: getCellAt, getDimensions: getDimensions };
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
            var debugText = JSON.stringify({ rowIx: rowIx, colIx: colIx, cellWalls: cellWalls }, null, 2);
            textSize(15);
            fill('white');
            noStroke();
            text(debugText, (colIx * width) / dimensions.numCols, (rowIx * height) / dimensions.numRows);
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
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    noStroke();
    grid = createGrid(5, 5);
    carveFullMaze(grid);
    noLoop();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(60);
    drawGrid(grid);
    for (var _i = 0, visitedCellPositions_1 = visitedCellPositions; _i < visitedCellPositions_1.length; _i++) {
        var cellPos = visitedCellPositions_1[_i];
        var _a = gridPosToScreenPos(cellPos, grid.getDimensions()), x = _a.x, y = _a.y;
        fill(230, 100);
        noStroke();
        circle(x, y, 50);
    }
}
function getRandomPosition(max) {
    var numbers = [];
    for (var i = 0; i < max; i++) {
        numbers.push(i);
    }
    return random(numbers);
}
function carveFullMaze(grid) {
    var dimensions = grid.getDimensions();
    console.log(dimensions);
    var currentPos = { x: getRandomPosition(dimensions.numCols), y: getRandomPosition(dimensions.numRows) };
    var unvisitedNeighbours = getAllUnivisitedNeighbours(currentPos, visitedCellPositions, dimensions);
    console.log({ currentPos: currentPos, unvisitedNeighbours: unvisitedNeighbours });
    var counter = 0;
    while (unvisitedNeighbours.length > 0 && counter < 10) {
        var nextPos = random(unvisitedNeighbours);
        var movementBetweenPositions = { x: nextPos.x - currentPos.x, y: nextPos.y - currentPos.y };
        console.log(movementBetweenPositions);
        var currCell = grid.getCellAt(currentPos);
        var nextCell = grid.getCellAt(nextPos);
        if (movementBetweenPositions.x === 0 && movementBetweenPositions.y === 1) {
            visitedCellPositions.push(currentPos);
            currentPos = nextPos;
            unvisitedNeighbours = getAllUnivisitedNeighbours(nextPos, visitedCellPositions, dimensions);
            counter++;
        }
    }
}
//# sourceMappingURL=build.js.map