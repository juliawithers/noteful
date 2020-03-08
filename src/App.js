import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Folder from './Folder/Folder'
import NoteNav from './NoteNav/NoteNav'
import NoteShortList from './NoteShortList/NoteShortList'
import LoadNote from './LoadNote/LoadNote'
import './App.css';
import NotefulContext from './NotefulContext'
import AddFolder from './AddFolder/AddFolder'

export default class App extends Component {
  
  state = {
    folders: [],
    notes: [],
    deleteNote: () => {}
  };

  componentDidMount() {
      // Need to fetch Folders and Notes
    fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(folders => {this.setState({
        folders
      })})
      .catch(error => this.setState({ error }))
      
    fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(notes => {this.setState({
        notes
      })})
      .catch(error => this.setState({ error }))
  }

  
 
  deleteNote =(noteId) =>{
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
    console.log(this.state.notes)
  }
  // Need to add function for deleting the noteId


  CreateNavRoutes(){
    return(
      <>
      {['/','/folder/:folderId'].map(path=>(
            <Route 
          exact
          path={path}
          key={path}
          component={Folder}
        />
      ))}
      <Route 
        path="/LoadNote/:itemId"
        component={NoteNav}
      /> 
      {/* <Route path="add-note" component={AddNote}/> */}
      {/* <Route path="add-folder" component={AddFolder}/> */}
      </>
    );
  }

  createNotesRoutes(){
    return(
      <>
      {['/', '/folder/:folderId'].map(path=>(
            <Route 
              exact
              path={path}
              key={path}
              component = {NoteShortList}
            />
      ))}

      <Route 
        path="/LoadNote/:itemId"
        component={LoadNote}
      /> 
      <Route exact path="/add-folder" component={AddFolder}/>
      </>
    )
    
  }
  
  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }
    console.log(contextValue)
    return (
      <NotefulContext.Provider value={contextValue}>
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
      </NotefulContext.Provider>
    );
  }
}

