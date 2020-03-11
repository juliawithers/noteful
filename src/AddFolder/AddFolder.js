import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types'
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
            },
            folderErr: ''
        };
    }

    handleSubmit = () => {
        const folderError = this.validateFolderName();
        if (folderError !==''){
            this.setState({
                folderErr: folderError
            })
            return
        }

        const folderName = this.state.folderName.value;

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
            return '**You must enter a folder name.'
        };
        if(folderName.length > 0){
            for(let i=0;i<folders.length;i++){
                if(folders[i].name.toLowerCase() === folderName.toLowerCase() ){
                    return '**You must choose another folder name as this name already exists.'
                }
            }; 
            return ''   
        }
    }
    
    render(){
        
        return(
            <div className='form-div'>
                <div className="add-folder-error">
                    {this.state.folderName.error}
                </div>
                <h2>Add a Folder!</h2>
                <form 
                    className='folder-form'
                    onSubmit={e => {
                        e.preventDefault();
                        this.handleSubmit()}}
                   >
                    <label htmlFor='folderName'  className="add-folder-label">
                        New Folder Name:
                        {' '}
                    </label>
                    <div className="input-container">
                        <input 
                            type='text'
                            name='folderName'
                            id='folderName'
                            placeholder='Example Folder Title'
                            onChange={e=>this.updateFolderInput(e.target.value)}
                        />    
                    </div>
                    <ValidateAddFolder message={this.state.folderErr}/>
                    <div className="button-container-add-folder">
                        <button onClick={this.handleCancelFolder}>
                            Cancel
                        </button>
                        <button type='submit'
                            className='submit-add-folder'
                            >
                            Submit
                        </button>    
                    </div>
                </form>    
            </div> 
        )
    }
}

AddFolder.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}