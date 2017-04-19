import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import * as actions from '../../actions/puzzleActions';
import PuzzleComponent from './PuzzleComponent';
import InstanceComponent from './InstancesComponent';
import DataFlowArrow from './DataFlowArrow';
import Database from './Database';

class HomePage extends React.Component {
  render () {
    const sendingDataClass = classNames({
      'data-flow': true,
      'active': this.props.sendingData
    });

    return (
      <div className="home-page">
        <PuzzleComponent />
        <div className="instances">
          <InstanceComponent />
        </div>
        <div className="dbs image-column">
          <Database databaseName="MongoDB" active={this.props.fromMongo}/>
          <Database databaseName="etcd" active={this.props.fromCache}/>
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
