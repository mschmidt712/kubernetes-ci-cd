import React, {PropTypes} from 'react';
import classNames from 'classnames';

class Cell extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange (e) {
    this.setState({
      value: e.target.value
    });
  }

  render () {
    const cellClass = classNames({
      cell: true,
      isEmpty: !this.props.isEmpty
    });
    const inputClass = classNames({
      incorrect: this.state.value && this.state.value.toLowerCase() !== this.props.letter.toLowerCase()
    });

    return (
      <div className={cellClass}>
        <div className="superscript-number">{this.props.positionInWord === 0 ? this.props.wordNbr : ''}</div>
        <input type="text" maxLength="1" size="1" onChange={this.onInputChange} className={inputClass} value={this.state.value} disabled={!this.props.isEmpty}/>
      </div>
    );
  }
}

Cell.propTypes = {
  isEmpty: PropTypes.bool.isRequired,
  positionInWord: PropTypes.number.isRequired,
  wordNbr: PropTypes.number,
  letter: PropTypes.string.isRequired
};

export default Cell;
