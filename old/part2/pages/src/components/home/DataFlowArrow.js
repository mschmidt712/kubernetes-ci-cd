import React, { PropTypes } from 'react';

function DataFlowArrow (props) {
  return (
    <div className={props.className}>
      <img className="top" src={`../../assets/arrow.png`} />
      <img className="bottom" src={`../../assets/arrow-blue.png`} />
    </div>
  );
}

DataFlowArrow.propTypes = {
  className: PropTypes.string.isRequired
};

export default DataFlowArrow;
