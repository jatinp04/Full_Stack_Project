import "./App.css";
import NavBar from "./components/NavBar";
import Note from "./components/Note";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./components/modal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  function getALLNotes() {
    axios.get("http://localhost:5000/newnotes").then((response) => {
      setNotes(response.data.results);
    });
  }

  // async function getALLNotes()  {
  //   const response = await axios.get('http://localhost:4000/newnote')

  // }

  useEffect(() => {
    getALLNotes();
  }, []);

  console.log(notes);

  
  
  function saveNote() {
    axios.post("http://localhost:5000/newnotes",{
      description:"New Post call ",
      title:"UI Post call"
    }).then((response) => {
      setNotes(response.data.results);
    });
    
  }
  
  
  

  return (
    <div className="App">
      <NavBar></NavBar>
      <div id="app">
        {notes.map((item) => {
          return <Note title={item.title} description={item.description} />;
        })}

        <button className="add-note" type="button" onClick={
          saveNote
        }>+</button>
       
      </div>

      <Modal show={true}></Modal>
    </div>
  );
}

export default App;
