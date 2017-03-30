import React from 'react';
import PuzzleComponent from './PuzzleComponent';
import InstanceComponent from './InstancesComponent';
import DataFlowArrow from './DataFlowArrow';

function HomePage () {
  return (
    <div className="home-page">
      <PuzzleComponent />
      <div className="data-flow">
        <DataFlowArrow className="k8instances" />
      </div>
      <div className="instances">
        <InstanceComponent />
      </div>
      <div className="data-flow image-column">
        <DataFlowArrow className="mongo" />
        <DataFlowArrow className="etcd" />
      </div>
      <div className="dbs image-column">
        <div className="mongo">
          <img src={`../../assets/mongo.png`}/>
        </div>
        <div className="etcd">
          <img src={`../../assets/etcd.png`}/>
        </div>
      </div>
    </div>
  );
}

HomePage.propTypes = {};

export default HomePage;
