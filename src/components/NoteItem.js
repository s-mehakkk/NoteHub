import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const aContext = useContext(alertContext);
    const {displayAlert} = aContext;
    const deleteHandler = ()=>{
        deleteNote(props.note._id)
        displayAlert('success', 'Note deleted successfully')
    }

    return (
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body noteColour border rounded">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description?props.note.description:'Empty note'}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={deleteHandler}></i>
                    <i className="fa-solid fa-pencil mx-2" onClick={()=>{props.editHandler(props.note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
