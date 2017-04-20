import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactSlider from 'react-slider';

class SliderComponent extends React.Component {
  constructor (props) {
    super(props);

    this.renderSliderElement = this.renderSliderElement.bind(this);
  }
  componentDidMount () {
    this.renderSliderElement();
  }

  componentDidUpdate () {
    this.renderSliderElement();
  }

  renderSliderElement () {
    ReactDOM.render(<ReactSlider
      min={this.props.properties.min}
      max={this.props.properties.max}
      step={this.props.properties.step}
      onChange={this.props.properties.onChange}
      value={this.props.properties.value}
    >
      <div className="slider-count">{this.props.properties.value}</div>
    </ReactSlider>, this.sliderRef);
  }

  render () {
    return (
      <div className="slider-container">
        {this.props.title &&
          <p className="slider-title inline bold">{this.props.title}</p>}
        <div
          className="slider-box"
          ref={(sliderRef) => { this.sliderRef = sliderRef; }}
        />
      </div>
    );
  }
}

SliderComponent.propTypes = {
  title: PropTypes.string,
  properties: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func
  }).isRequired
};

export default SliderComponent;
