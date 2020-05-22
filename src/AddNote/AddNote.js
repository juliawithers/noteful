import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types'
import ValidateAddNote from './ValidateAddNote';
import CreateOptions from './CreateOptions'
import './AddNote.css'
import config from './config'

export default class AddNote extends Component {
    static contextType = NotefulContext;
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: {
                value: '',
                error: '',
                touched: false
            },
            modified:'',
            folderId: {
                value: '',
                touched: false,
                ariaSelected: false
            },
            content: {
                value: '',
                touched: false
            },
            error: '',
            noteNameErr: '',
            contentErr:'',
            folderErr:''
        };
    }

    componentDidMount(){
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let newDate = new Date(date)
        this.setState({
            modified: newDate
        })
    }

    // submit the form, ensure validation
    handleSubmit = () => {
        const noteNameError = this.validateNoteName();
        const contentError = this.validateContent();
        const folderError = this.validateFolder();
        if(noteNameError||contentError||folderError !==''){
            this.setState({
                noteNameErr: noteNameError,
                contentErr: contentError,
                folderErr: folderError
            })
           return
        }
        const note = {
            name: this.state.name.value,
            modified: this.state.modified,
            folderId: this.state.folderId.value,
            content: this.state.content.value,
        }
        fetch(config.API_NOTES_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
        })
        .then(res => {
            if (!res.ok) {
                throw `Could not add note ${note.name}`
            }
            return res.json();
        })
        .then( respJson => {
            this.context.notes.push(respJson)
            this.props.history.push(`/folder/${note.folderId}`)
        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
    }

    // cancel note
    handleCancelNote = () => {
        this.props.history.push('/')
    }

    // update state with the inputs
    updateNoteName(name) {
        this.setState({
            name: {
                value: name,
                touched: true}
        })
    }
    updateContent(description){
        this.setState({
            content: {
                value: description,
                touched: true}
        })
    }
    updateFolder(selected){
        this.setState({
            folderId: {
                value: selected,
                touched: true,
                ariaSelected: true
            }
        })
    }
   
    // Validate the inputs
    validateNoteName(){
        const notes = this.context.notes;
        const noteName = this.state.name.value;
        if(noteName.length === 0){
            return '**You must enter a note name.'
        }
        else if(noteName.length > 0){
            for(let i=0;i<notes.length;i++){
                if(notes[i].name.toLowerCase() === noteName.toLowerCase() ){
                    return '**You must choose another note name as this name already exists.'
                }
            }; 
            return ''
        }
    }
    validateContent(){
        const description = this.state.content.value;
        if(description.length === 0){
            return '**You must enter a note.'
        }
        else{
            return ''
        }
    }
    validateFolder(){
        const folder = this.state.folderId.value;
        if (!folder){
            return '**You must select a folder'
        }
        else{
            return ''
        }
    }
    render(){
        return(
            <div className="add-note-div">
                <h2 className="add-note-title">Create a New Note!</h2>
                <div className="add-folder-error">
                    {this.state.error}
                </div>
                <form 
                    className="form-add-note"
                    onSubmit={e => {
                        e.preventDefault();
                        this.handleSubmit()}}
                   >
                    <label htmlFor="noteName" className="add-note-label">
                        Create a Name
                        {' '}
                    </label>
                        <input 
                            type="text"
                            name="noteName"
                            id="noteName"
                            role="textbox"
                            placeholder="Name of note"
                            aria-label="Create a name for your new note"
                            aria-required="true"
                            aria-describedby="noteConstraints"
                            onChange={e=>this.updateNoteName(e.target.value)}
                        />    
                        <div id="noteConstraint">Please enter a unique note name. It cannot be empty or match an existing note name.</div>
                    <ValidateAddNote message={this.state.noteNameErr}/>
                    <label htmlFor="content" className="add-note-label">
                        Enter a Description
                        {' '}
                    </label>
                        <textarea 
                            type="text"
                            name="content"
                            id="content"
                            role="textbox"
                            placeholder="Content of note"
                            aria-label="Please enter context for your new note."
                            aria-required="true"
                            onChange={e=>this.updateContent(e.target.value)}
                        />    
                    <ValidateAddNote message={this.state.contentErr}/>
                    <label htmlFor="folder" className="add-note-label">
                        Select Folder to add to
                        {' '}
                    </label>
                        <select
                            type="text"
                            name="folder"
                            id="folder"
                            placeholder="Example Note Title"
                            aria-label="Select a folder for your new note."
                            aria-required="true"
                            onChange={e=>{
                                this.updateFolder(e.target.value) 
                                }}
                        >
                            <option value={null}>...</option>
                            <CreateOptions 
                                folderList={this.context.folders} 
                                ariaSel={this.state.folderId.ariaSelected}/>
                        </select>    
                    <ValidateAddNote message={this.state.folderErr}/>
                    <div className="button-container-add-note">
                        <button 
                            aria-label="cancel"
                            onClick={this.handleCancelNote}>
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            aria-label="submit"
                            className="submit-add-folder"
                            >
                            Submit
                        </button>
                    </div>
                </form>    
            </div> 
        )
    }
}

AddNote.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}