import React from 'react';

import './controls.scss';

export const AlgoType = Object.freeze({
  Dijkstra: 'Dijkstra'
});

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      algorithm: AlgoType.Dijkstra
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
      </div>
    );
  }
}

export default Controls;
