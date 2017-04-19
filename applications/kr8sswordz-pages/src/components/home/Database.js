import React, { PropTypes } from 'react';
import DataFlowArrow from './DataFlowArrow';

function Database (props) {
  return (
    <div className="db-image">
      <img className="db" src="../../assets/database.svg" />
      <img className="logo" src={`../../assets/${props.databaseName}-logo.png`} />
      <DataFlowArrow className={'Hello'} active={props.active} />
    </div>
  );
}

Database.propTypes = {
  databaseName: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default Database;

