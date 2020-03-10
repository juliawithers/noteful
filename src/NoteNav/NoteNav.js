import React, { Component } from 'react'
import './NoteNav.css'
import NotefulContext from '../NotefulContext'
import { findNote, findFolder} from '../helpful-functions'

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
    const itemId = this.props.match.params.itemId;
    const note = findNote(notes, itemId);
    const folder = findFolder(folders, note.folderId);
    return (
    <div className="nav-container-note">
      <div className="button-container-back">
        <button
          type='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='back-button'
        >
          <br />
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