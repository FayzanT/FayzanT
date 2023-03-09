const Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
    disp_SB,
  }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  

    const textContent = (html) => {
      const theparser = new DOMParser();
      const parsed = theparser.parseFromString(html, "text/html");
      return parsed.documentElement.textContent;

    }


    return (
      <div className={`app-sidebar ${disp_SB ? "hide": ""}`}>
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button onClick={onAddNote} id = "AddButton">&#43;</button>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map(({ id, title, body, lastModified }, i) => (
            <div
              key = {id}
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
              </div>

              <div>
              <p>{body && textContent(body.substr(0, 100)) + "..."}</p>
              </div>
              <small className="note-meta">
                Last Modified{" "}
                {new Date(lastModified).toLocaleDateString("en-CA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;