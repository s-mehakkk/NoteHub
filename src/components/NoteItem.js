import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const deleteHandler = ()=>{
        deleteNote(props.note._id)
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

// import React, {useContext, useState, useRef} from 'react'
// import noteContext from '../context/notes/noteContext'

// const NoteItem = (props) => {
//     const context = useContext(noteContext);
//     const {deleteNote} = context;
//     const deleteHandler = ()=>{
//         deleteNote(props.note._id)
//     }

//     const {note} = props;
//     const [enote, setenote] = useState({id:"",etitle :"", edescription: ""})
//     const modalBtn = useRef(null);

//     const onChange = async (e)=>{
//         await setenote({...enote, [e.target.name]: e.target.value})
//         console.log(enote);
//     }
//     const clickHandler = (e)=>{
//         e.preventDefault();
//         console.log('editing' + note);
//         // updateNote(note.etitle, note.edescription)

//     }

//     const editHandler = async() => {
//         modalBtn.current.click();
//         await setenote({id: note._id, etitle :note.title, edescription :note.description});
//         console.log(enote)
//     }


//     return (
//         <div className='col-md-3 my-2'>
//                         {/* <!-- Button trigger modal --> */}
//                         <button type="button" ref={modalBtn} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                 Launch demo modal
//             </button>

//             {/* <!-- Modal --> */}
//             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form>
//                                 <div className="mb-3">
//                                     <label htmlFor="title" className="form-label">Title</label>
//                                     <input type="text" value={note.title} name="etitle" className="form-control" id="etitle" onChange={onChange} aria-describedby="emailHelp" />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="description" className="form-label">Description</label>
//                                     <input type="text" value={note.description} name="edescription" className="form-control" id="edescription" onChange={onChange} />
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button type="button" className="btn btn-primary " onClick={clickHandler} >Save changes</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">{note.title}</h5>
//                     <p className="card-text">{note.description?note.description:'Empty note'}</p>
//                     <i className="fa-solid fa-trash mx-2" onClick={deleteHandler}></i>
//                     <i className="fa-solid fa-pencil mx-2" onClick={editHandler}></i>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NoteItem