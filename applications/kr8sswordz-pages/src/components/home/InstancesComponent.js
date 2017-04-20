import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from '../shared/Slider';
import * as actions from '../../actions/webSocketActions';
import InstanceGrid from '../instance-grid/InstanceGrid';
import { instanceConfig } from './instanceConfig';

class InstancesComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      scaleCount: props.pods.length,
      consecutiveRequestCount: 10
    };

    this.handleScaleSlider = this.handleScaleSlider.bind(this);
    this.onScale = this.onScale.bind(this);
    this.handleConsecutiveRequestSlider = this.handleConsecutiveRequestSlider.bind(this);
    this.submitConsecutiveRequests = this.submitConsecutiveRequests.bind(this);
  }

  componentWillMount () {
    this.props.actions.getPods();
    this.props.actions.connectToSocket();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.pods !== this.props.pods) {
      this.setState({
        scaleCount: newProps.pods.length
      });
    }
  }

  componentWillUnmount () {
    this.props.actions.disconnectFromSocket();
  }

  handleConsecutiveRequestSlider (value) {
    this.setState({
      consecutiveRequestCount: value
    });
  }

  submitConsecutiveRequests () {
    this.props.actions.submitConsecutiveRequests(this.state.consecutiveRequestCount);
  }

  handleScaleSlider (value) {
    this.setState({
      scaleCount: value
    });
  }

  onScale () {
    this.props.actions.scale(this.state.scaleCount);
  }

  render () {
    const scaleProps = Object.assign({}, instanceConfig, {
      onChange: this.handleScaleSlider,
      onScale: this.onScale
    });
    const consecutiveRequestProps = {
      min: 10,
      max: 500,
      step: 10,
      value: this.state.consecutiveRequestCount,
      onChange: this.handleConsecutiveRequestSlider
    };

    return (<div>
      <InstanceGrid
        properties={scaleProps}
        instanceCount={this.state.scaleCount}
        pods={this.props.pods}
        activeInstance={this.props.activeInstance}>
      </InstanceGrid>
      <div className="button-row instance-buttons">
        <Slider properties={consecutiveRequestProps} />
        <button className="primary" onClick={this.submitConsecutiveRequests}>Load Test</button>
      </div>
      <div className="scale-hints">
        <p>Choose the number of consecutive requests you want to make and click "Load Test."
          This will call the puzzle service the given number of times and you can observe the calls being made in the instance grid above. </p>
      </div>
    </div>);
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
