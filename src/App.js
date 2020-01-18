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

  visualizeAlgo = algo => {
    const { grid } = this.gridRef.current.state;
    this.gridRef.current.removePathHighlighting();
    this.gridRef.current.setAlgorithmRunning(true);
    if (algo === AlgoType.Dijkstra) {
      this.visualizeDijkstra(grid);
    }
  };

  visualizeDijkstra = grid => {
    const startNode = grid[START_NODE_COORDS.col][START_NODE_COORDS.row];
    const finishNode = grid[FINISH_NODE_COORDS.col][FINISH_NODE_COORDS.row];
    const visitedNodes = Algorithms.dijkstra(grid, startNode, finishNode);
    const shortestPathNodes = Algorithms.dijkstraShortestPath(finishNode);
    this.gridRef.current.animateAlgorithm(visitedNodes, shortestPathNodes);
  };

  render() {
    return (
      <div className="container">
        <Controls visualize={this.visualizeAlgo} />
        <Grid ref={this.gridRef} />
      </div>
    );
  }
}

export default App;
