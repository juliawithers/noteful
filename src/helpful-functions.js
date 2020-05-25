
export const findNote=(notes, noteId)=>{
    return notes[Object.keys(notes).find(key =>  {
      return notes[key].id === noteId
    })]
}

export const findFolder=(folders=[],folder_id)=>{
    return folders[Object.keys(folders).find(key =>  {
        return folders[key].id === folder_id
    })]
}
export const generateFolderNotes=(notes,folder_id)=>{

    return isNaN(folder_id)
    ? notes
    : notes.filter(note=>note.folder_id === folder_id)
}

