import React from 'react';
import PropTypes from 'prop-types'

export default function ValidateAddNote(props) {
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    );
  }
  console.log(props.message)
  return <></>
}

ValidateAddNote.propTypes={
    message: PropTypes.string.isRequired
}