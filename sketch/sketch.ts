let grid: Grid;
let visitedCellPositions: GridPosition[] = [];


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
  for (const cellPos of visitedCellPositions) {
    const { x, y } = gridPosToScreenPos(cellPos, grid.getDimensions());
    fill(230, 100);
    noStroke();
    circle(x, y, 50);
  }
}

function getRandomPosition(max: number): number {
  const numbers: number[] = []
  for (let i = 0; i < max; i++) {
    numbers.push(i)
  }
  return random(numbers)
}

/*
while the current cell has unvisited neighbours do
    carve through to a random adjacent unvisited cell
    mark new cell as visited
end while
 
while CURRENT_POS has neighbours not in VISITED_CELL_POSITIONS do
    set NEXT_POS to be a random neighbour not in VISITED_CELL_POSITIONS
    CARVE_THROUGH(CURRENT_POS, NEXT_POS, GRID)
    push NEXT_POS to VISITED_CELL_POSITIONS
    set CURRENT_POS to be NEXT_POS
end while
*/

function carveFullMaze(grid: Grid): void {
  const dimensions = grid.getDimensions()
  console.log(dimensions)
  let currentPos: GridPosition = { x: getRandomPosition(dimensions.numCols), y: getRandomPosition(dimensions.numRows) }
  let unvisitedNeighbours = getAllUnivisitedNeighbours(currentPos, visitedCellPositions, dimensions)
  console.log({ currentPos, unvisitedNeighbours })
  let counter = 0
  while (unvisitedNeighbours.length > 0 && counter < 10) {
    let nextPos: GridPosition = random(unvisitedNeighbours)
    const movementBetweenPositions = { x: nextPos.x - currentPos.x, y: nextPos.y - currentPos.y }
    console.log(movementBetweenPositions)
    let currCell = grid.getCellAt(currentPos)
    let nextCell = grid.getCellAt(nextPos)
    if (movementBetweenPositions.x === 0 && movementBetweenPositions.y === 1) {
      //   currCell.s = "open"
      //   nextCell.n = "open"
      // } else if (movementBetweenPositions.x === 0 && movementBetweenPositions.y === -1) {
      //   currCell.n = "open"
      //   nextCell.s = "open"
      // } else if (movementBetweenPositions.x === 1 && movementBetweenPositions.y === 0) {
      //   currCell.e = "open"
      //   nextCell.w = "open"
      // } else if (movementBetweenPositions.x === -1 && movementBetweenPositions.y === 0) {
      //   currCell.w = "open"
      //   nextCell.e = "open"
      // }
      visitedCellPositions.push(currentPos)
      currentPos = nextPos
      unvisitedNeighbours = getAllUnivisitedNeighbours(nextPos, visitedCellPositions, dimensions)
      counter++
    }
  }
}
