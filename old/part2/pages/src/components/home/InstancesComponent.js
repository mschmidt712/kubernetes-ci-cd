import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/webSocketActions';
import InstanceGrid from '../instance-grid/InstanceGrid';
import { instanceConfig } from './instanceConfig';

class InstancesComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      instanceData: {
        instanceFinalCount: 3,
        instanceCurrentCount: 3,
        pods: props.pods
      }
    };

    this.handleSlider = this.handleSlider.bind(this);
    this.onScale = this.onScale.bind(this);
  }

  componentWillMount () {
    // this.props.actions.connectToSocket(this.state.instanceData.instanceCurrentCount);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.pods !== this.props.pods) {
      const instanceData = Object.assign({}, this.state.instanceData, {
        pods: newProps.pods
      });

      this.setState({
        instanceData
      });
    }
  }

  componentWillUnmount () {
    this.props.actions.disconnectFromSocket();
  }

  handleSlider (event, value) {
    const instanceData = Object.assign({}, this.state.instanceData, {
      instanceCurrentCount: value,
      instanceFinalCount: this.state.instanceData.instanceFinalCount
    });

    this.setState({
      instanceData
    });
  }

  onScale () {
    const instanceData = Object.assign({}, this.state.instanceData, {
      instanceCurrentCount: this.state.instanceData.instanceCurrentCount,
      instanceFinalCount: this.state.instanceData.instanceCurrentCount
    });

    this.setState({
      instanceData
    });

    this.props.actions.scale(this.state.instanceData.instanceCurrentCount);
  }

  render () {
    const instanceProps = Object.assign({}, instanceConfig, {
      onChange: this.handleSlider,
      onScale: this.onScale
    });

    return (
      <InstanceGrid
        properties={instanceProps}
        instanceData={this.state.instanceData}
        activeInstance={this.props.activeInstance}>
      </InstanceGrid>
    );
  }
}

InstancesComponent.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  state: PropTypes.object,
  pods: PropTypes.array,
  activeInstance: PropTypes.string
};

function mapStateToProps (state) {
  return {
    pods: state.webSocket.pods,
    activeInstance: state.webSocket.activePod
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstancesComponent);
