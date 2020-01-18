import { NodeType } from '../components/Grid/Node/Node';

export function dijkstra(grid, startNode, endNode) {
  const visitedNodes = [];
  const unvisitedNodes = resetNodesAndGetIndividualNodesFromGrid(grid);
  startNode.distance = 0;

  while (unvisitedNodes.length !== 0) {
    sortUnvisitedNodesByDistance(unvisitedNodes);
    const currentNode = unvisitedNodes.shift();

    // skip any walls
    if (currentNode.nodeType === NodeType.Wall) continue;
    // unreachable endNode
    if (currentNode.distance === Infinity) return visitedNodes;

    // visit the current node and update any of its neighbors if necessary
    currentNode.visited = true;
    visitedNodes.push(currentNode);
    if (currentNode === endNode) return visitedNodes;
    updateUnvisitedNeighbors(currentNode, grid);
  }
}

const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unvisitedNeighbors) {
    // for future versions, perhaps adding varying weights to nodes would change this calculation
    const newDistance = node.distance + 1;
    // only update the distance if it is less than the currently recorded distance
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
    }
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;

  if (col > 0) neighbors.push(grid[col - 1][row]);
  if (col < grid.length - 1) neighbors.push(grid[col + 1][row]);
  if (row > 0) neighbors.push(grid[col][row - 1]);
  if (row < grid[0].length - 1) neighbors.push(grid[col][row + 1]);

  return neighbors;
};

const sortUnvisitedNodesByDistance = unvisitedNodes => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

export function dijkstraShortestPath(endNode) {
  const shortestPathNodes = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    shortestPathNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return shortestPathNodes;
}

const resetNodesAndGetIndividualNodesFromGrid = grid => {
  const newGrid = [];
  for (const col of grid) {
    for (const node of col) {
      node.distance = Infinity;
      node.visited = false;
      node.previousNode = null;
      newGrid.push(node);
    }
  }

  return newGrid;
};
