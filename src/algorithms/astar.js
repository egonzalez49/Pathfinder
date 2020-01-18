import { resetNodesAndGetIndividualNodesFromGrid } from './index';
import { NodeType } from '../components/Grid/Node/Node';

export function astar(grid, startNode, endNode) {
  resetNodesAndGetIndividualNodesFromGrid(grid);
  const openNodes = [];
  const closedNodes = [];
  openNodes.push(startNode);
  startNode.FCost = 0;

  // let counter = 0;

  while (openNodes.length !== 0) {
    sortOpenNodesByFCost(openNodes);
    // find the lowest FCost node
    const currentNode = openNodes.shift();

    // console.log('CURRENT NODE---------------');
    // console.log(currentNode);
    // console.log('=======================');

    // console.log('OPEN NODES: ');
    // for (const node of openNodes) console.log(node);

    closedNodes.push(currentNode);
    currentNode.visited = true;
    if (currentNode.FCost === Infinity) return closedNodes;
    if (currentNode === endNode) return closedNodes;

    recalculateFCostOfNeighbors(
      currentNode,
      openNodes,
      startNode,
      endNode,
      grid
    );

    // counter++;
    // if (counter > 3) return closedNodes;
  }
}

const sortOpenNodesByFCost = openNodes => {
  openNodes.sort((nodeA, nodeB) => nodeA.FCost - nodeB.FCost);
};

const recalculateFCostOfNeighbors = (
  node,
  openNodes,
  startNode,
  endNode,
  grid
) => {
  const neighbors = getNeighbors(node, grid);

  // let bool = node.col === 12;
  // if (bool) {
  //   for (let n of neighbors)
  //     console.log(
  //       '%c' + n.row + ' ' + n.col,
  //       'background: grey; color: white; display: block;'
  //     );
  // }

  for (let i = neighbors.length - 1; i >= 0; i--) {
    const neighbor = neighbors[i];
    // if (bool)
    //   console.log('%c' + i, 'background: green; color: white; display: block;');
    // if (bool) console.log(neighbor);
    if (neighbor.nodeType === NodeType.Start) continue;

    if (!neighbor.visited && neighbor.nodeType !== NodeType.Wall) {
      // if not previously visited, add it to the array of open nodes
      if (neighbor.FCost === Infinity) openNodes.push(neighbor);
      const newFCost = calculateFCost(neighbor, startNode, endNode);
      if (newFCost < neighbor.FCost) {
        neighbor.FCost = newFCost;
        neighbor.previousNode = node;
      }

      // findNodeAndChangeOrAdd(neighbor, openNodes);
    } else {
      // remove neighbor from list (it is already visited)
      neighbors.splice(i, 1);
    }
  }
};

// const findNodeAndChangeOrAdd = (node, openNodes) => {
//   const { row, col, FCost, previousNode } = node;
//   for (let openNode of openNodes) {
//     if (openNode.row === row && openNode.col === col) {
//       openNode.FCost = FCost;
//       openNode.previousNode = previousNode;
//       return;
//     }
//   }

//   openNodes.push(node);
// };

const calculateFCost = (node, startNode, endNode) => {
  const GCost = manhattanDistance(node, startNode);
  const HCost = manhattanDistance(node, endNode);
  return GCost + HCost;
};

// grab a node's neighbors from all directions (diagonals too)
const getNeighbors = (node, grid) => {
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

  // if (col === 12) {
  //   console.log('THIS IS THE 12TH NODE -----------------');
  //   for (let node of neighbors) console.log(node);
  // }
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
