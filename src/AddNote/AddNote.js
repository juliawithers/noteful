import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
// import PropTypes from 'prop-types'
import ValidateAddNote from './ValidateAddNote';
import CreateOptions from './CreateOptions'
import NotefulError from '../NotefulError'

export default class AddFolder extends Component {
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
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            error: ''
        };
    }

    componentDidMount(){
        console.log('handleDate ran')
        let today = new Date();
        console.log(today)
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log(date)
        let newDate = new Date(date)
        this.setState({
            modified: newDate
        })
    }

    handleSubmit = () => {
        const note = {
            id: this.state.id,
            name: this.state.name.value,
            modified: this.state.modified,
            folderId: this.state.folderId.value,
            content: this.state.content.value,
        }
        console.log(note)
        fetch(`http://localhost:9090/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
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

    handleCancelNote = () => {
        this.props.history.push('/')
    }

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
                touched: true}
        })
    }
   
    validateNoteName(){
        const notes = this.context.notes;
        const noteName = this.state.name.value;
        if(noteName.length === 0){
            return 'You must enter a note name.'
        };
        for(let i=0;i<notes.length;i++){
            if(notes[i].name.toLowerCase() === noteName.toLowerCase() ){
               return 'You must choose another note name as this name already exists.'
            }
        };
    }
    validateContent(){
        const description = this.state.content.value;
        if(description.length === 0){
            return 'You must enter a note.'
        };
    }
    validateFolder(){
        const folder = this.state.folderId.value;
        if (!folder){
            return 'You must select a folder'
        }
    }
    render(){
        const noteNameError = this.validateNoteName();
        const contentError = this.validateContent();
        const folderError = this.validateFolder();
        return(
            <div>
                <div className="add-folder-error">
                    {this.state.error}
                </div>
                <form 
                    onSubmit={e => {
                        e.preventDefault();
                        this.handleSubmit()}}
                   >
                    <label htmlFor='noteName'>
                        Create a Name
                        {' '}
                    </label>
                    <NotefulError>
                        <input 
                            type='text'
                            name='noteName'
                            id='noteName'
                            placeholder='Name of note'
                            onChange={e=>this.updateNoteName(e.target.value)}
                            required
                        />    
                    </NotefulError>
                    <ValidateAddNote message={noteNameError}/>
                    <label htmlFor='content'>
                        Enter a Description
                        {' '}
                    </label>
                    <NotefulError>
                        <textarea 
                            type='text'
                            name='content'
                            id='content'
                            placeholder='Content of note'
                            onChange={e=>this.updateContent(e.target.value)}
                            required
                        />    
                    </NotefulError>
                    <ValidateAddNote message={contentError}/>
                    <label htmlFor='folder'>
                        Select Folder to add to
                        {' '}
                    </label>
                    <NotefulError>
                        <select
                            type='text'
                            name='folder'
                            id='folder'
                            placeholder='Example Note Title'
                            onChange={e=>{
                                this.updateFolder(e.target.value) 
                                }}
                            required
                        >
                            <option value={null}>...</option>
                            <CreateOptions folderList={this.context.folders}/>
                        </select>    
                    </NotefulError>
                    <ValidateAddNote message={folderError}/>
                    <div className="button-container">
                        <button onClick={this.handleCancelNote}>
                            Cancel
                        </button>
                        <button type='submit'
                            className='submit-add-folder'
                            disabled={
                                this.validateNoteName() ||
                                this.validateContent() ||
                                this.validateFolder()
                            }>
                            Submit
                        </button>
                    </div>
                </form>    
            </div> 
        )
    }
}

// AddNote.propTypes = {

// }