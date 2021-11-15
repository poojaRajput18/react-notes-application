import React, { useState } from "react";
import { render } from "react-dom";
import * as data from "./messages.json";

// Functional component
const Note = (props) => {
  return (
    <div className="message-container">
      <p>"{props.text}"</p>
      <div className="details-container">
        <small>
          Sent by <b>{props.sentBy}</b>
        </small>
      </div>
    </div>
  );
};

// Main App component
// renders a list of Messages using data from messages.json
const App = (props) => {
  const [note, setNote] = useState({ text: "", status: "" });
  const [addedNote, setAddedNote] = useState();
  const [allNotes, setAllNotes] = useState([]);
  const [isStatus, setIsStatus] = useState("all");
  const addNote = () => {
    setAllNotes(() => [...allNotes, note]);
  };
  let status = {
    active: 1,
    completed: 2
  };

  const handleChange = (e) => {
    const {
      target: { name, value }
    } = e;
    setNote(() =>
      name === "text" ? { ...note, text: value } : { ...note, status: value }
    );
  };
  const compare = (a, b) => {
    const bandA = a.status.toUpperCase();
    const bandB = b.status.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  return (
    <div>
      <input
        placeholder="title"
        name="text"
        value={note.text}
        onChange={(e) => handleChange(e)}
      />
      <input
        placeholder="status"
        name="status"
        value={note.status}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={() => addNote()}>Add note</button>
      <br></br>
      <button onClick={() => setIsStatus("all")}>All</button>
      <button onClick={() => setIsStatus("active")}>Active</button>
      <button onClick={() => setIsStatus("completed")}>Completed</button>
      <h2>Notes List</h2>
      {isStatus === "all" &&
        allNotes
          .sort((a, b) => compare(a, b))
          .map((message, i) => (
            <Note
              key={`message-${i}`}
              text={message.text}
              sentBy={message.status}
            />
          ))}
      {isStatus === "active" &&
        allNotes
          .filter((note) => note.status === "active")
          .map((message, i) => (
            <Note
              key={`message-${i}`}
              text={message.text}
              sentBy={message.status}
            />
          ))}
      {isStatus === "completed" &&
        allNotes
          .filter((note) => note.status === "completed")
          .map((message, i) => (
            <Note
              key={`message-${i}`}
              text={message.text}
              sentBy={message.status}
            />
          ))}
    </div>
  );
};

render(<App messages={data.messages} />, document.getElementById("root"));
