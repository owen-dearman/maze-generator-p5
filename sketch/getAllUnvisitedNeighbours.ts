/**
 * 
 * @param pos current position
 * @param visitedArr array of visited neighbours
 * @param dimensions 
 * @returns array of valid, unvisited neighbours
 */

function getAllUnivisitedNeighbours(pos: GridPosition, visitedArr: GridPosition[], dimensions: Dimensions): GridPosition[] {
    //get valid neighbours
    const allneighbours = calculateNeighbours(pos, dimensions)
    //convert visited cells to a comparable format (object equality XX)
    const visitedArrconvertedForComparision: string[] = visitedArr.map((pos) => `${pos.x}:${pos.y}`)
    const unvisitedNeighbours = []
    //check each valid neighbour against comparable visited cell
    for (const neighbour of allneighbours) {
        const isVisited = visitedArrconvertedForComparision.includes(`${neighbour.x}:${neighbour.y}`)
        if (!isVisited) {
            unvisitedNeighbours.push(neighbour)
        }
    }
    return unvisitedNeighbours
}