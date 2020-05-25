import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import NotefulContext from './NotefulContext'
import Folder from './Folder/Folder'
import NoteNav from './NoteNav/NoteNav'
import NoteShortList from './NoteShortList/NoteShortList'
import LoadNote from './LoadNote/LoadNote'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import NotefulError from './NotefulError'
import config from './config'

export default class App extends Component {
  state = {
    folders: [],
    notes: [],
    deleteNote: () => {}
  };

  componentDidMount() {
    // Fetch Folders
    console.log('component did mount ran')
    fetch(config.API_FOLDERS_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
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

    // Fetch Notes
    fetch(config.API_NOTES_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(notes => {
        console.log(notes)
        this.setState({
        notes
      })})
      .catch(error => this.setState({ error }))
  }

  deleteNote =(noteId) =>{
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }

  CreateNavRoutes(){
    return(
      <>
      {['/','/folder/:folder_id'].map(path=>(
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
      </>
    );
  }

  createNotesRoutes(){
    return(
      <>
      {['/', '/folder/:folder_id'].map(path=>(
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
      <Route exact path="/add-note" component={AddNote}/>
      </>
    )
  }
  
  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }
    return (
        <NotefulError>
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
        </NotefulError>
        
    );
  }
}

