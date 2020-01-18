import React from 'react';

import Controls from './components/Controls/Controls';
import Grid from './components/Grid/Grid';
import { AlgoType } from './components/Controls/Controls';
import { START_NODE_COORDS, FINISH_NODE_COORDS } from './components/Grid/Grid';
import Algorithms from './algorithms';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.gridRef = React.createRef();
  }

  clearBoard = () => {
    this.gridRef.current.getClearGrid();
  };

  visualizeAlgo = algo => {
    const { grid } = this.gridRef.current.state;
    const startNode = grid[START_NODE_COORDS.col][START_NODE_COORDS.row];
    const finishNode = grid[FINISH_NODE_COORDS.col][FINISH_NODE_COORDS.row];
    this.gridRef.current.removePathHighlighting();
    this.gridRef.current.setAlgorithmRunning(true);
    let visitedNodes = null;
    if (algo === AlgoType.Dijkstra) {
      //this.visualizeDijkstra(grid, startNode, finishNode);
      visitedNodes = Algorithms.dijkstra(grid, startNode, finishNode);
    } else {
      visitedNodes = Algorithms.astar(grid, startNode, finishNode);
    }

    const shortestPathNodes = Algorithms.getShortestPath(finishNode);
    this.gridRef.current.animateAlgorithm(visitedNodes, shortestPathNodes);
  };

  visualizeDijkstra = (grid, startNode, finishNode) => {
    const visitedNodes = Algorithms.dijkstra(grid, startNode, finishNode);
    const shortestPathNodes = Algorithms.getShortestPath(finishNode);
    this.gridRef.current.animateAlgorithm(visitedNodes, shortestPathNodes);
  };

  render() {
    return (
      <div className="container">
        <Controls visualize={this.visualizeAlgo} clearBoard={this.clearBoard} />
        <Grid ref={this.gridRef} />
      </div>
    );
  }
}

export default App;
