import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext';
import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchNotes, editNote } = context;
    const aContext = useContext(alertContext);
    const {displayAlert} = aContext;
    const [note, setnote] = useState({id:"",etitle :"", edescription: ""})
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
        fetchNotes();
        }
        else{
            navigate('/login');
        }

        // eslint-disable-next-line
    }, [])
    const modalBtn = useRef(null);

    const editHandler = (currentNote) => {
        modalBtn.current.click();
        setnote({id: currentNote._id, etitle :currentNote.title, edescription :currentNote.description});
    }
    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }
    const clickHandler = (e)=>{
        e.preventDefault();
        const closeBtn = document.getElementById('modalCloseBtn');
        closeBtn.click();
        displayAlert('success', 'Note edited')
        editNote(note.id, note.etitle, note.edescription);
    }

    return (
        <div className="container containerColour my-3 border rounded">
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={modalBtn} className="btn btnColour d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} name="etitle" className="form-control" id="etitle" onChange={onChange} minLength={3} required aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} name="edescription" className="form-control" id="edescription" onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id='modalCloseBtn' className="btn btnColour" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btnColour " onClick={clickHandler} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className='mt-3'>Your notes</h3>
            <hr />
            <div className='row my-3'>
                {notes.map((note) => {
                    return <NoteItem key={note._id} editHandler={editHandler} note={note} />
                })}
            </div>
        </div>

    )
}

export default Notes

// import React, { useContext, useEffect } from 'react'
// import noteContext from '../context/notes/noteContext'
// import NoteItem from './NoteItem';


// const Notes = () => {
//     const context = useContext(noteContext);
//     const { notes, fetchNotes } = context;

//     useEffect(() => {
//         fetchNotes();
//     }, [])





//     return (
//         <div className="container my-3 border rounded">
//             <h3 className='mt-3'>Your notes</h3>
//             <hr />
//             <div className='row my-3'>
//                 {notes.map((note) => {
//                     return <NoteItem key={note._id} note={note} />
//                 })}
//             </div>
//         </div>

//     )
// }

// export default Notes