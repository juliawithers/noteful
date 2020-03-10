import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
// import PropTypes from 'prop-types'
import ValidateAddFolder from './ValidateAddFolder';
import './AddFolder.css'

export default class AddFolder extends Component {
    static contextType = NotefulContext;
    constructor(props){
        super(props);
        this.state = {
            folderName: {
                value: '',
                error: '',
                touched: false
            }
        };
    }

    handleSubmit = folderName => {
        fetch(`http://localhost:9090/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            'id': `${folderName}`,
            'name': `${folderName}`})
        })
        .then(res => {
            if (!res.ok) {
                throw `Could not add folder ${folderName}`
            }
            return res.json();
        })
        .then( respJson => {
            this.context.folders.push(respJson)
            this.props.history.push(`/folder/${folderName}`)
        })
        .catch(error => {
            this.setState({
                folderName:{
                    error: error}
            })
        })
    }

    handleCancelFolder = () => {
        this.props.history.push('/')
    }

    updateFolderInput(name) {
        this.setState({
            folderName: {
                value: name,
                touched: true}
        })
    }

    validateFolderName(){
        const folders = this.context.folders;
        const folderName = this.state.folderName.value;
        if(folderName.length === 0){
            return 'You must enter a folder name.'
        };
        for(let i=0;i<folders.length;i++){
            if(folders[i].name.toLowerCase() === folderName.toLowerCase() ){
               return 'You must choose another folder name as this name already exists.'
            }
        };
    }
    render(){
        const folderError = this.validateFolderName();
        return(
            <div className='form-div'>
                <div className="add-folder-error">
                    {this.state.folderName.error}
                </div>
                <form 
                    className='folder-form'
                    onSubmit={e => {
                        e.preventDefault();
                        this.handleSubmit(this.state.folderName.value)}}
                   >
                    <label htmlFor='folderName'>
                        New Folder Name:
                        {' '}
                    </label>
                    <div className="input-container">
                        <input 
                            type='text'
                            name='folderName'
                            id='folderName'
                            placeholder='Example Note Title'
                            onChange={e=>this.updateFolderInput(e.target.value)}
                            required
                        />    
                    </div>
                    
                    <ValidateAddFolder message={folderError}/>
                    <div className="button-container">
                        <button onClick={this.handleCancelFolder}>
                            Cancel
                        </button>
                        <button type='submit'
                            className='submit-add-folder'
                            disabled={
                                this.validateFolderName()
                            }>
                            Submit
                        </button>    
                    </div>
                    
                </form>    
            </div> 
        )
    }
}