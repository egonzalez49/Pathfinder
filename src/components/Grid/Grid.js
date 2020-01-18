import React from 'react';

import Node from './Node/Node';
import { NodeType } from './Node/Node';
import './grid.scss';

const ROW = 20;
const COL = 40;

export const START_NODE_COORDS = {
  row: 5,
  col: 10
};
export const FINISH_NODE_COORDS = {
  row: 5,
  col: 30
};

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      previousMouseCoords: {
        row: -1,
        col: -1
      },
      mouseIsPressed: false,
      algoIsRunning: false
    };
  }

  // initialize a 2D array of node objects
  componentDidMount() {
    this.getClearGrid();
  }

  handleMouseDown = (row, col) => {
    // prevent user from drawing while algo is running
    if (this.state.algoIsRunning) return;

    const newGrid = getNewGridWithWallToggled(this.state, row, col);
    this.setState({
      grid: newGrid,
      previousMouseCoords: {
        row,
        col
      },
      mouseIsPressed: true
    });
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;

    const newGrid = getNewGridWithWallToggled(this.state, row, col);
    this.setState({
      grid: newGrid,
      previousMouseCoords: {
        row,
        col
      }
    });
  };

  handleMouseUp = () => {
    this.setState({
      mouseIsPressed: false
    });
  };

  // map the grid's nodes into actual visible node components
  mapNodes = () => {
    return this.state.grid.map((col, colIdx) => {
      return (
        <div key={colIdx}>
          {col.map((node, nodeIdx) => (
            <Node
              key={nodeIdx}
              row={node.row}
              col={node.col}
              nodeType={node.nodeType}
              onMouseDown={this.handleMouseDown}
              onMouseEnter={this.handleMouseEnter}
              onMouseUp={this.handleMouseUp}
            />
          ))}
        </div>
      );
    });
  };

  animateAlgorithm = (visitedNodes, shortestPathNodes) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathNodes);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        document
          .getElementById(`node-${node.col}-${node.row}`)
          .classList.add('visited');
      }, 10 * i);
    }
  };

  animateShortestPath = shortestPathNodes => {
    for (let i = 0; i <= shortestPathNodes.length; i++) {
      if (i === shortestPathNodes.length) {
        setTimeout(() => {
          this.setState({ algoIsRunning: false });
        }, 50 * i);
        return;
      }
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document
          .getElementById(`node-${node.col}-${node.row}`)
          .classList.add('shortest-path');
      }, 50 * i);
    }
  };

  // create a brand new grid, erasing everything
  getClearGrid = () => {
    const grid = [];

    this.removePathHighlighting();

    for (let col = 0; col < COL; col++) {
      const currentCol = [];
      for (let row = 0; row < ROW; row++) {
        const currentNode = {
          col,
          row,
          nodeType: determineNodeType(row, col),
          distance: Infinity,
          visited: false,
          previousNode: null,
          FCost: Infinity
        };
        currentCol.push(currentNode);
      }
      grid.push(currentCol);
    }

    this.setState({
      grid
    });
  };

  // clear grid except the walls, start, and finish nodes
  removePathHighlighting = () => {
    const grid = this.state.grid;
    for (const col of grid) {
      for (const node of col) {
        document
          .getElementById(`node-${node.col}-${node.row}`)
          .classList.remove('shortest-path', 'visited');
      }
    }
  };

  // set state of whether algorithm is running
  setAlgorithmRunning = val => {
    this.setState({
      algoIsRunning: val
    });
  };

  render() {
    return (
      <div onMouseLeave={() => this.handleMouseUp()}>
        <div className="grid">{this.mapNodes()}</div>
      </div>
    );
  }
}

const determineNodeType = (row, col) => {
  if (row === START_NODE_COORDS.row && col === START_NODE_COORDS.col) {
    return NodeType.Start;
  } else if (row === FINISH_NODE_COORDS.row && col === FINISH_NODE_COORDS.col) {
    return NodeType.Finish;
  } else {
    return NodeType.Regular;
  }
};

// create a wall node at the specified row-col
const getNewGridWithWallToggled = (state, row, col) => {
  // prevent current node from quickly changing between wall and regular node
  if (
    row === state.previousMouseCoords.row &&
    col === state.previousMouseCoords.col
  )
    return state.grid;

  const grid = state.grid;
  const newGrid = grid.slice();
  const node = newGrid[col][row];

  // don't override the start and finish nodes
  if (node.nodeType === NodeType.Finish || node.nodeType === NodeType.Start)
    return newGrid;

  const newNode = {
    ...node,
    nodeType: node.nodeType === NodeType.Wall ? NodeType.Regular : NodeType.Wall
  };
  newGrid[col][row] = newNode;
  return newGrid;
};

export default Grid;
