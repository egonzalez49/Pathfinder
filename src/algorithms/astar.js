import { resetNodesAndGetIndividualNodesFromGrid } from './index';
import { NodeType } from '../components/Grid/Node/Node';

export function astar(grid, startNode, endNode) {
  resetNodesAndGetIndividualNodesFromGrid(grid);
  const openNodes = [];
  const closedNodes = [];
  openNodes.push(startNode);
  startNode.distance = 0;
  startNode.FCost = 0;

  while (openNodes.length !== 0) {
    sortOpenNodesByFCost(openNodes);
    // find the lowest FCost node
    const currentNode = findClosestNode(openNodes); // openNodes.shift();

    closedNodes.push(currentNode);
    currentNode.visited = true;
    if (currentNode.FCost === Infinity) return closedNodes;
    if (currentNode === endNode) return closedNodes;

    recalculateFCostOfNeighbors(currentNode, openNodes, endNode, grid);
  }
}

const findClosestNode = openNodes => {
  let currentNode = openNodes[0];
  const lowestFCost = currentNode.FCost;
  let lowestIndex = 0;
  let index = 0;
  for (let node of openNodes) {
    if (node.FCost === lowestFCost) {
      if (node.HCost < currentNode.HCost) {
        lowestIndex = index;
        currentNode = node;
      }
      index++;
    } else {
      break;
    }
  }

  openNodes.splice(lowestIndex, 1);
  console.log(currentNode);
  return currentNode;
};

const sortOpenNodesByFCost = openNodes => {
  openNodes.sort((nodeA, nodeB) => nodeA.FCost - nodeB.FCost);
};

const recalculateFCostOfNeighbors = (node, openNodes, endNode, grid) => {
  const neighbors = getNeighbors(node, grid);

  for (let i = neighbors.length - 1; i >= 0; i--) {
    const neighbor = neighbors[i];

    if (neighbor.nodeType === NodeType.Start) continue;

    if (!neighbor.visited && neighbor.nodeType !== NodeType.Wall) {
      // if not previously visited, add it to the array of open nodes
      if (neighbor.FCost === Infinity) openNodes.push(neighbor);

      const newFCost = calculateFCost(node, neighbor, endNode);
      if (newFCost < neighbor.FCost) {
        neighbor.FCost = newFCost;
        neighbor.previousNode = node;
      }
    } else {
      // remove neighbor from list (it is already visited)
      neighbors.splice(i, 1);
    }
  }
};

// in this case, the neighbor is the previous node
const calculateFCost = (neighbor, node, endNode) => {
  let newDistance = neighbor.distance + 1;
  // only update node's distance if it is less than it's current distance from start
  node.distance = newDistance < node.distance ? newDistance : node.distance;
  const GCost = node.distance; // manhattanDistance(node, startNode);
  node.HCost = manhattanDistance(node, endNode);
  const HCost = node.HCost;
  return GCost + HCost;
};

// grab a node's neighbors from all directions (diagonals too)
const getNeighbors = (node, grid) => {
  console.log(grid);
  const neighbors = [];
  const { col, row } = node;

  if (col > 0) {
    neighbors.push(grid[col - 1][row]);
    // grab the up-left diagonal neighbor if available
    // if (row > 0) neighbors.push(grid[col - 1][row - 1]);
    // grab the down-left diagonal neighbor if available
    // if (row < grid[0].length - 1) neighbors.push(grid[col - 1][row + 1]);
  }
  if (col < grid.length - 1) {
    neighbors.push(grid[col + 1][row]);
    // grab the up-right diagonal neighbor if available
    // if (row > 0) neighbors.push(grid[col + 1][row - 1]);
    // grab the down-right diagonal neighbor if available
    // if (row < grid[0].length - 1) neighbors.push(grid[col + 1][row + 1]);
  }

  // grab the neighbor directly above if available
  if (row > 0) neighbors.push(grid[col][row - 1]);
  // grab the neighbor directly below if available
  if (row < grid[0].length - 1) neighbors.push(grid[col][row + 1]);

  return neighbors;
};

const manhattanDistance = (nodeOne, nodeTwo) => {
  let xOne = nodeOne.row;
  let yOne = nodeOne.col;
  let xTwo = nodeTwo.row;
  let yTwo = nodeTwo.col;

  let xChange = Math.abs(xOne - xTwo);
  let yChange = Math.abs(yOne - yTwo);

  return xChange + yChange;
};
