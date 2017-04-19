import React, { PropTypes } from 'react';
import classNames from 'classnames';

function DataFlowArrow (props) {
  const activeClass = classNames({
    bottom: true,
    active: props.active
  });

  return (
    <div className="data-flow">
      <svg className={activeClass} enableBackground="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_full_x5F_left"><polygon points="16,2.001 16,10 30,10 30,22 16,22 16,30 2,16  "/></g></svg>
    </div>
  );
}

DataFlowArrow.propTypes = {
  className: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default DataFlowArrow;
