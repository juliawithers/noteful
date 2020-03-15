import React, { Component } from 'react'
import './NoteNav.css'
import NotefulContext from '../NotefulContext'
import { findNote, findFolder} from '../helpful-functions'
import PropTypes from 'prop-types'

export default class NoteNav extends Component{
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;

  render(){
    const {folders,notes} = this.context;
    console.log(this.context)
    const itemId = this.props.match.params.itemId;
    const note = findNote(notes, itemId);
    if (!note){
      return null
    }
    const folder = findFolder(folders, note.folderId);
    return (
    <div className="nav-container-note">
      <div className="button-container-back">
        <button
          type='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='back-button'
          aria-label="go-back"
        >
          Back
        </button>  
      </div>
      {folder && (
        <h3 className='folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  )
  }
}

NoteNav.propType = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string.isRequired
    })
  }).isRequired
}