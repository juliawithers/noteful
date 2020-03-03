import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Folder from './Folder/Folder'
import NoteNav from './NoteNav/NoteNav'
import NoteShortList from './NoteShortList/NoteShortList'
import LoadNote from './LoadNote/LoadNote'
import './App.css';


export default class App extends Component {
  
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
      setTimeout(() => this.setState(this.props.store), 600);
  }

  
  findNote=(notes, noteId)=>{
    return notes[Object.keys(notes).find(key =>  {
      return notes[key].id === noteId
    })]
  }

  findFolder=(folders=[],folderId)=>{
    return folders[Object.keys(folders).find(key =>  {
      return folders[key].id === folderId
    })]
  }

  generateFolderNotes=(notes=[],folderId,props)=>{
    return folderId === undefined
    ? notes
    : notes.filter(note=>note.folderId === folderId)
  }

  CreateNavRoutes(){
    const {folders, notes} = this.state;
    return(
      <>
      {['/','/folder/:folderId'].map(path=>(
            <Route 
          exact
          path={path}
          key={path}
          render={props => (
            <Folder
              folders={folders}
              notes={notes}
              {...props}
              />  
          )}

        />
      ))}
      <Route 
        path="/LoadNote/:itemId"
        render={props => {
          const itemId = props.match.params.itemId;
          const note = this.findNote(notes, itemId);
          const folder = this.findFolder(folders, note.folderId);
          return <NoteNav folder={folder} {...props} />;
        }}
      /> 
      {/* <Route path="add-note" component={NoteNav}/>
      <Route path="add-folder" component={NoteNav}/> */}
      </>
    );
  }

  createNotesRoutes(){
    const {folders,notes} = this.state;
    return(
      <>
      {['/', '/folder/:folderId'].map(path=>(
            <Route 
              exact
              path={path}
              key={path}
              render={props => {
                const folderId = props.match.params.folderId;
                const notesList = this.generateFolderNotes(notes,folderId,props);
                return(
                <NoteShortList
                  notes={notesList}
                  {...props}
                /> )
              }
            }
            />
      ))}

      <Route 
        path="/LoadNote/:itemId"
        render={props => {
          const itemId = props.match.params.itemId;
          const note = this.findNote(notes,itemId,props)
          return <LoadNote note={note} {...props} />
        }}
      /> 
      </>
    )
    
  }
  
  render(){
    return (
      <div className="noteful-App">
        <nav className="app-nav">{this.CreateNavRoutes()}</nav> 
        <header className="app-header">
          <h1>
            <Link to='/'>
              Noteful
            </Link>
          </h1>
        </header>  
        <main className="app-main">
          {this.createNotesRoutes()}
        </main>
      </div>
    );
  }
}

