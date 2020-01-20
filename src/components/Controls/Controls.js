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

  updateAlgo = e => {
    let algorithm = null;
    switch (e.target.innerHTML) {
      case AlgoType.Dijkstra:
        algorithm = AlgoType.Dijkstra;
        break;
      case AlgoType.AStar:
        algorithm = AlgoType.AStar;
        break;
      default:
        break;
    }
    this.setState({ algorithm });
  };

  render() {
    const { algorithm } = this.state;

    return (
      <div className="controls">
        <div className="dropdown">
          <button className="btn">Algorithms</button>
          <div className="dropdown-content">
            <h2 value="Dijkstra" onClick={e => this.updateAlgo(e)}>
              Dijkstra
            </h2>
            <h2 value="A*" onClick={e => this.updateAlgo(e)}>
              A*
            </h2>
          </div>
        </div>
        <button
          className="btn main-btn"
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
