
export const findNote=(notes, noteId)=>{
    return notes[Object.keys(notes).find(key =>  {
      return notes[key].id === noteId
    })]
}

export const findFolder=(folders=[],folderId)=>{
    return folders[Object.keys(folders).find(key =>  {
        return folders[key].id === folderId
    })]
}
export const generateFolderNotes=(notes=[],folderId)=>{
    return folderId === undefined
    ? notes
    : notes.filter(note=>note.folderId === folderId)
}

