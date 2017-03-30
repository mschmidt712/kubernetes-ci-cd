import React, { PropTypes } from 'react';
import classNames from 'classnames';

function DataFlowArrow (props) {
  const activeClass = classNames({
    bottom: true,
    active: props.active
  });

  return (
    <div className={props.className}>
      <img className="top" src={`../../assets/arrow.png`} />
      <img className={activeClass} src={`../../assets/arrow-blue.png`} />
    </div>
  );
}

DataFlowArrow.propTypes = {
  className: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default DataFlowArrow;
