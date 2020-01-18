import React from 'react';

import './controls.scss';

export const AlgoType = Object.freeze({
  Dijkstra: 'Dijkstra',
  AStar: 'A*'
});

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      algorithm: AlgoType.AStar
    };
  }

  render() {
    const { algorithm } = this.state;

    return (
      <div className="controls">
        <button
          className="main-btn"
          onClick={() => this.props.visualize(algorithm)}
        >
          Visualize {`${algorithm}`}
        </button>
        <button className="btn" onClick={() => this.props.clearBoard()}>
          Clear Board
        </button>
      </div>
    );
  }
}

export default Controls;
