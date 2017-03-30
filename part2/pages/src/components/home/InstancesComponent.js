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
        instanceCurrentCount: 3
      }
    };

    this.handleSlider = this.handleSlider.bind(this);
    this.onScale = this.onScale.bind(this);
  }

  componentWillMount () {
    this.props.actions.connectToWebSocket(this.state.instanceData.instanceCurrentCount);
    this.props.actions.receiveDataFromWebSocket(this.state.instanceData.instanceCurrentCount);
  }

  componentWillUpdate (newProps, newState) {
    if (newState.instanceData !== this.state.instanceData) {
      this.props.actions.receiveDataFromWebSocket(newState.instanceData.instanceCurrentCount);
    }
  }

  componentWillUnmount () {
    this.props.actions.disconnectFromWebSocket();
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
  activeInstance: PropTypes.number
};

function mapStateToProps (state) {
  return {
    activeInstance: state.webSocket.dataReceived
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstancesComponent);
