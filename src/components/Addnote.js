import React, {useContext, useState} from 'react'
import alertContext from '../context/alert/alertContext';
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const aContext = useContext(alertContext);
    const {displayAlert} = aContext;
    const [newNote, setnewNote] = useState({title :" ", description: ""})

    const onChange = (e)=>{
        setnewNote({...newNote, [e.target.name]: e.target.value})
    }
    const addNoteHandler = (e)=>{
        e.preventDefault();
        addNote(newNote.title, newNote.description)
        const form = document.getElementById('addNoteForm');
        displayAlert('success', 'Note added successfully!');
        form.reset();
    }

    return (
        <div className='container border rounded containerColour'>
            <h3 className='my-3'>Add a new note</h3>
            <hr />
            <form id='addNoteForm' onSubmit={addNoteHandler}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" id="title" onChange={onChange} minLength={3} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" name="description" className="form-control" id="description" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btnColour mb-3">Add Note</button>
            </form>
        </div>
    )
}

export default Addnote