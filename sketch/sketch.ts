
let grid: Grid;
let visitedCellPositions: GridPosition[] = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //(rows, columns)
  grid = createGrid(40, 50);
  carveFullMaze(grid.getDimensions());
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(60);
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

