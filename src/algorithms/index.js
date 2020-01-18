import { dijkstra } from './dijkstra';
import { astar } from './astar';

export function resetNodesAndGetIndividualNodesFromGrid(grid) {
  const newGrid = [];
  for (const col of grid) {
    for (const node of col) {
      node.distance = Infinity;
      node.visited = false;
      node.previousNode = null;
      node.FCost = Infinity;
      newGrid.push(node);
    }
  }

  return newGrid;
}

export function getShortestPath(endNode) {
  const shortestPathNodes = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    shortestPathNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return shortestPathNodes;
}

export default {
  dijkstra,
  astar,
  getShortestPath
};
