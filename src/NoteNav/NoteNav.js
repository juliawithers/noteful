import React from 'react'
import './NoteNav.css'

export default function NoteNav(props) {
  return (
    <div className='note-nav'>
      <button
        type='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='back-button'
      >
        <br />
        Back
      </button>
      {props.folder && (
        <h3 className='folder-name'>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}

NoteNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}