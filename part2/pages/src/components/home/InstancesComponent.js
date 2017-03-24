import React, { PropTypes } from 'react';
import InstanceGrid from '../instance-grid/InstanceGrid';
import { instanceConfig } from './instanceConfig';

function InstancesComponent (props) {
  const instanceProps = Object.assign({}, instanceConfig, {
    onChange: props.handleSlider,
    onScale: props.onScale
  });

  return (
    <InstanceGrid
      properties={instanceProps}
      instanceData={props.instanceData}>
    </InstanceGrid>
  );
}

InstancesComponent.propTypes = {
  handleSlider: PropTypes.func.isRequired,
  onScale: PropTypes.func.isRequired,
  instanceData: PropTypes.object.isRequired
};

export default InstancesComponent;
