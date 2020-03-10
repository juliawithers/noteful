import React from 'react';
import PropTypes from 'prop-types'

export default function ValidateAddFolder(props) {
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    );
  }
  return <></>
}

ValidateAddFolder.propTypes={
    message: PropTypes.string.isRequired
}