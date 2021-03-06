import React from 'react';
import DanceGraph from './DanceGraph';
import ValenceGraph from './ValenceGraph';

export default function AudioFeatures(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <DanceGraph />
        </div>
        <div className="column">
          <ValenceGraph />
        </div>
      </div>
    </div>
  );
}
