import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Slider from '../shared/Slider';

function InstanceGrid (props) {
  let instances = [];
  for (let i = 0; i < props.instanceData.instanceFinalCount; i++) {
    const instanceClass = classNames({
      instance: true,
      active: i === props.activeInstance
    });

    instances.push(<div key={i} className={instanceClass}>{i}</div>);
  }

  console.log(props.properties);

  return (
    <div>
      <div className="instance-grid">
        {instances}
      </div>
      <div className="button-row instance-buttons">
        <Slider properties={props.properties} />
        <button className="primary" onClick={props.properties.onScale}>Scale {props.instanceData.instanceCurrentCount}</button>
      </div>
      <div className="scale-hints">
        <p>Choose the number of instances you want to scale in your cluster and click "Scale".
          This will call our service and scale up the number of replicas to the desired size. </p>
      </div>
    </div>
  );
}

InstanceGrid.propTypes = {
  properties: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
    getSliderValue: PropTypes.func,
    onScale: PropTypes.func
  }),
  instanceData: PropTypes.shape({
    instanceCurrentCount: PropTypes.number,
    instanceFinalCount: PropTypes.number
  }),
  activeInstance: PropTypes.number
};

export default InstanceGrid;
