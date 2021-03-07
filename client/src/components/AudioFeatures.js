import React from 'react';
import DanceGraph from './DanceGraph';
import ValenceGraph from './ValenceGraph';

import { extractValenceData, extractDanceabilityData } from '../utility/graphs';

export default function AudioFeatures(props) {
  const { audioFeatures } = props;
  const valenceData = extractValenceData(audioFeatures);
  const danceData = extractDanceabilityData(audioFeatures);

  return (
    <div className="container">
      <div className="row">
        <div className="column graph">
          <div className="row">
            <div className="column">
              <h3>How danceable are your songs?</h3>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <DanceGraph danceData={danceData} />
            </div>
          </div>
        </div>
        <div className="column graph">
          <div className="row">
            <div className="column">
              <h3>How happy are your songs?</h3>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <ValenceGraph valenceData={valenceData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
