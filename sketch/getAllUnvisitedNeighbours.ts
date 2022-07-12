function getAllUnivisitedNeighbours(pos: GridPosition, visitedArr: GridPosition[], dimensions: Dimensions): GridPosition[] {
    const allneighbours = calculateNeighbours(pos, dimensions)
    const visitedArrconvertedForComparision: string[] = visitedArr.map((pos) => `${pos.x}:${pos.y}`)
    const unvisitedNeighbours = []
    for (const neighbour of allneighbours) {
        const isVisited = visitedArrconvertedForComparision.includes(`${neighbour.x}:${neighbour.y}`)
        if (!isVisited) {
            unvisitedNeighbours.push(neighbour)
        }
    }
    return unvisitedNeighbours
}