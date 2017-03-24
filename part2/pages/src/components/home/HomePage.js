import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import homePageActions from '../../actions/homepageActions';
import PuzzleComponent from './PuzzleComponent';
import InstanceComponent from './InstancesComponent';
import DataFlowArrow from './DataFlowArrow';

class HomePage extends React.Component {
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
    return (
      <div className="home-page">
        <PuzzleComponent
          puzzleGrid={this.state.puzzleGrid}
          downHintsArray={this.state.downHintsArray}
          acrossHintsArray={this.state.acrossHintsArray}
        />
        <div className="data-flow">
          <DataFlowArrow className="k8instances" />
        </div>
        <div className="instances">
          <InstanceComponent
            handleSlider={this.handleSlider}
            onScale={this.onScale}
            instanceData={this.state.instanceData}
          />
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
}

HomePage.propTypes = {
  params: PropTypes.objectOf(PropTypes.string),
  actions: PropTypes.objectOf(PropTypes.func),
  state: PropTypes.object
};

function mapStateToProps (state) {
  return {
    state: state
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(homePageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
