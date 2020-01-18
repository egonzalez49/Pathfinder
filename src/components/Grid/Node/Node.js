import React from 'react';

import './node.scss';

export const NodeType = Object.freeze({
  Start: 'start',
  Finish: 'finish',
  Wall: 'wall',
  Regular: 'regular'
});

class Node extends React.Component {
  render() {
    const {
      col,
      row,
      nodeType,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;
    return (
      <div
        id={`node-${col}-${row}`}
        className={`node ${nodeType}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;
