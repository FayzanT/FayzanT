import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState } from 'react';

const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
      

    });
  };


  const [editMode, seteditMode] = useState(true);

  const SaveClick= () =>{
    seteditMode(false);
  }

  const EditClick = () =>{
    seteditMode(true);
  }
  

  
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
};

const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
        return "";
    }
    return formatted;
};  

const CalendarChange = (date) =>{
  const updateNote = {
    ...activeNote, lastModified: date.getTime(),
  };
  onUpdateNote(updateNote);
  
}


  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  const if_click = () =>{
    const answer = window.confirm("Are you sure?");
    if (answer) {
      onDeleteNote(activeNote.id);
      }
  };


  return (
    
    <div className="app-main">
      <div className="navbar">
      <button onClick={if_click} id ="Button">Delete</button>
        {editMode ? (
       
        <button onClick={SaveClick} id = "Button"> Save </button>
        ):(
          <button onClick={EditClick} id = "Button">Edit</button>

        )}
        </div>
     
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        
        {editMode ? ( 
        <div>
          <div>
          <input type="datetime-local" id = "Calendar" value ={formatDate(activeNote.lastModified)} onChange = {(e) => CalendarChange(new Date(e.target.value))}/>
          </div>
        <ReactQuill value = {activeNote.body} onChange = {(value) =>onEditField('body', value)}/>
      </div>
      ):(
        <div className="app-main-note-display">
          <div dangerouslySetInnerHTML={{__html:activeNote.body}}></div>

          </div>

      )}
      
   
    </div>
 
    </div>
  );
};

export default Main;