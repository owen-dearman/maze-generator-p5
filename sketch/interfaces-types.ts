type WallStatus = 'open' | 'closed';

type Dimensions = { numCols: number; numRows: number };
interface Cell {
    n: WallStatus;
    e: WallStatus;
    s: WallStatus;
    w: WallStatus;
}

interface Grid {
    getCellAt: (pos: GridPosition) => Cell;
    getDimensions: () => Dimensions;
}

interface GridPosition {
    x: number;
    y: number;
}