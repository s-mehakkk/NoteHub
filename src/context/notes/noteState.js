import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:3001";
  const [notes, setNotes] = useState([]);

  //Fetching all notes 
  const fetchNotes = async () => {
    const url = `${host}/api/notes/fetchnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZTExOTU5NTlkOTY5NjQ0OWY4MTJlIn0sImlhdCI6MTY1NjY3NDU5OX0.4ZIgxr-2gkLp87Xl0OriMTsAyGkk_v1fo_HjZmSHt1I'
      }
      // body: JSON.stringify(data)
    });
    const json = await response.json();
    // console.log('fetched data' + json);
    setNotes(json);
  }

  //Adding new note
  const addNote = async (title, description) => {
    // console.log('adding note'+ title+description);
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZTExOTU5NTlkOTY5NjQ0OWY4MTJlIn0sImlhdCI6MTY1NjY3NDU5OX0.4ZIgxr-2gkLp87Xl0OriMTsAyGkk_v1fo_HjZmSHt1I'
      },
      body: JSON.stringify({ title, description })
    });
    const json = await response.json();
    //fetchNotes(); -- avoiding making too many api calls, hence updating the state variable
    setNotes(notes.concat(json));
  }

  //Editing a note
  const editNote = async (id, title, description) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const response =  await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZTExOTU5NTlkOTY5NjQ0OWY4MTJlIn0sImlhdCI6MTY1NjY3NDU5OX0.4ZIgxr-2gkLp87Xl0OriMTsAyGkk_v1fo_HjZmSHt1I'
      },
      body: JSON.stringify({ title, description })
    });
    const json = await response.json();
    // fetchNotes();
    const tempNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(tempNotes.concat(json))
  }

  //Deleting a note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZTExOTU5NTlkOTY5NjQ0OWY4MTJlIn0sImlhdCI6MTY1NjY3NDU5OX0.4ZIgxr-2gkLp87Xl0OriMTsAyGkk_v1fo_HjZmSHt1I'
      },
    });
    //fetchNotes();
    const tempNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(tempNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, fetchNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;