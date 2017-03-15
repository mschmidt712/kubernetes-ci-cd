import React, { PropTypes } from 'react';
import Slider from 'material-ui/Slider';

function InstanceGrid (props) {
  let instances = [];
  for (let i = 0; i < props.instanceData.instanceFinalCount; i++) {
    instances.push(<div key={i} className="instance">{i}</div>);
  }
  return (
    <div className="slider">
      <div className="scale-grid">
        {instances}
      </div>
      <div className="controls">
        <div className="slider-control">
          <Slider
            min={props.properties.min}
            max={props.properties.max}
            step={props.properties.step}
            defaultValue={props.properties.defaultValue}
            onChange={props.properties.onChange}
            />
        </div>
        <button className="scale green" onClick={props.properties.onScale}>Scale {props.instanceData.instanceCurrentCount}</button>
      </div>
      <div className="scale-hints">
        <p>Choose the number of instances you want to scalein your cluster and click "Scale".
          This will call our service and scale up the number of replicas to the desired size. </p>
      </div>
    </div>
  );
};

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
  })
};

export default InstanceGrid;
