
let grid: Grid;
let visitedCellPositions: GridPosition[] = [];
let numRows = 40
let numCols = 50


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //(rows, columns)
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

  //UNCOMMENT FOR DEBUGGING PURPOSES


  // for (const cellPos of visitedCellPositions) {
  //   const { x, y } = gridPosToScreenPos(cellPos, grid.getDimensions());
  //   fill(230, 100);
  //   noStroke();
  //   circle(x, y, 50);
  //   text(counter, x, y)
  //   counter++
  // }
}
