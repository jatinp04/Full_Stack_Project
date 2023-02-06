import "./Home.css";
import NavBar from "./NavBar";
import Note from "./Note";
import axios from "../Api";
import { useEffect, useState } from "react";
import React, { Component } from "react";
import { Router, useNavigate,Navigate } from "react-router-dom";
// import { MdOutlineAdd } from "react-icons/md";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authenticated, setauthenticated] = useState(null);


  function getALLNotes() {
    axios.get("/newnotes",{withCredentials:true}).then((response) => {
     if(response.status===200){
      setNotes(response.data.results);
     }
     else{
      navigate("/login")
     }
    }).catch((err)=>{
      console.log("Error",err);
      navigate("/login")
    })
  }

  // async function getALLNotes()  {
  //   const response = await axios.get('http://localhost:4000/newnote')

  // }

  useEffect(() => {
    getALLNotes();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  /*
  //Hard Coded Save Notes Function
  function saveNote() {
    axios
      .post("http://localhost:5000/newnotes", {
        description: "New Post call ",
        title: "UI Post call",
      })
      .then((response) => {
        setNotes(response.data.results);
      });
  }
  */

  //Save Note Function

  function saveNote() {
    axios
      .post(
        "/newnotes",
        {
          description: description,
          title: title,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setNotes(response.data.results);
      });
    setShowModal(false);
  }

  return (
    <div className="App">
      <NavBar></NavBar>

      <div id="app">
        {notes.map((item) => {
          return <Note title={item.title} description={item.description} />;
        })}

        <button
          className="add-note"
          type="button"
          onClick={(e) => {
            setShowModal(true);
          }}
        >
          +
        </button>

        <div>
          {showModal ? (
            <div className="popup" show={showModal}>
              <div className="popup-content">
                <div className="row navstyle">
                  <h2 style={{ color: "#031218", margin: "10px" }}>
                    Create a new note
                  </h2>
                  {/* <AiFillCloseCircle style={{color: "#031218", margin: "10px"}} onClick={closeModal}/> */}
                </div>
                <div className="row">
                  <h4 style={{ color: "#031218", margin: "10px" }}>Title</h4>
                  <input
                    className="string-input"
                    style={{ margin: "10px" }}
                    placeholder="Note title here"
                    type="text"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="row">
                  <h4 style={{ color: "#031218", margin: "10px" }}>
                    Description
                  </h4>
                  <textarea
                    className="string-input"
                    style={{ margin: "10px" }}
                    placeholder="Note description here"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="row" style={{ justifyContent: "end" }}>
                  <button
                    style={{
                      padding: "5px 20px",
                      margin: "0 5px",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                      background: "#031218",
                    }}
                    onClick={closeModal}
                  >
                    Discard
                  </button>
                  <button
                    style={{
                      padding: "5px 20px",
                      margin: "0 5px",
                      border: "none",
                      borderRadius: "10px",
                      color: "black",
                      background: "#00f3ed",
                    }}
                    onClick={saveNote}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default App;
