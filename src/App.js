import "./App.css";
import Sidebar from "./Sidebar";
import Main from "./Main"
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";




function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  const [disp_SB,set_disp] = useState(false)

  const togs = () =>{
    (disp_SB ? set_disp(false):
    set_disp(true))

  }



  return (
 
    <div className="App">
      
      <div className="lotion">
       
      <button onClick = {togs} id = "Toggle" >&#9776;</button>
      <h1 id = "TheLotion">Lotion</h1>
     
      <p id ="Caption">Like Notion, but worse</p>
 
      
      
      </div>
      
      <div className="flex_maker">
    
 
       <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        disp_SB = {disp_SB}
        />

      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote}   />
    
  
      </div>
    </div>
   
  );
}

export default App;