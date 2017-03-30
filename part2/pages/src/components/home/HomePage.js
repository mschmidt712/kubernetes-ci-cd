import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import * as actions from '../../actions/puzzleActions';
import PuzzleComponent from './PuzzleComponent';
import InstanceComponent from './InstancesComponent';
import DataFlowArrow from './DataFlowArrow';

class HomePage extends React.Component {
  constructor () {
    super();
  }

  render () {
    const sendingDataClass = classNames({
      'data-flow': true,
      'active': this.props.sendingData
    });

    return (
      <div className="home-page">
        <PuzzleComponent />
        <div className={sendingDataClass}>
          <DataFlowArrow className="k8instances" active={this.props.sendingData}/>
        </div>
        <div className="instances">
          <InstanceComponent />
        </div>
        <div className="data-flow image-column">
          <DataFlowArrow className="mongo" active={this.props.fromMongo}/>
          <DataFlowArrow className="etcd" active={this.props.fromCache}/>
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
}

HomePage.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  state: PropTypes.object,
  sendingData: PropTypes.bool,
  fromCache: PropTypes.bool,
  fromMongo: PropTypes.bool
};

function mapStateToProps (state) {
  return {
    sendingData: state.puzzle.sendingData,
    fromCache: state.puzzle.fromCache,
    fromMongo: state.puzzle.fromMongo
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
