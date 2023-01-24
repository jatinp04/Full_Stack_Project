import "./App.css";
import NavBar from "./components/NavBar";
import Note from "./components/Note";
import axios from "axios";
import { useEffect, useState } from "react";
import React, { Component } from "react";
import LoginForm from "./components/loginForm";
// import { MdOutlineAdd } from "react-icons/md";
import { Modal } from "react-bootstrap";

import CreateNewAccount from "./components/CreateNewAccount";

import {
  Navbar,
  NavDropdown,
  MenuItem,
  NavItem,
  Nav,
  Popover,
  Tooltip,
  Button,
  OverlayTrigger,
} from "react-bootstrap";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [head, setHead] = useState('');
  const [body, setBody] = useState('');
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));

  function getALLNotes() {
    axios.get("http://localhost:5000/newnotes").then((response) => {
      setNotes(response.data.results);
    });
  }

  // async function getALLNotes()  {
  //   const response = await axios.get('http://localhost:4000/newnote')

  // }

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
  };

  useEffect(() => {
    getALLNotes();
  }, []);

   const showInputModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

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

  return (
    <div className="App">
      <NavBar></NavBar>
      {/* <button className="topbutton">
        <MdOutlineAdd fontSize="32px" onClick={showInputModal}/>
      </button> */}
      <div id="app">
        {notes.map((item) => {
          return <Note title={item.title} description={item.description} />;
        })}

        <button className="add-note" type="button" onClick={showInputModal}>
          +
        </button>
        <LoginForm />
        <CreateNewAccount />

        <div>
        {showModal ?
        <div className="popup" show={showModal}>
          <div className="popup-content">
            <div className="row navstyle">
              <h2 style={{color: "#031218", margin: "10px"}}>
                Create a new note
              </h2>
              <p style={{color: "#031218", margin: "10px"}} onClick={closeModal}>Close</p>
            </div>   
            <div className="row">
              <h4 style={{color: "#031218", margin: "10px"}}>Title</h4>
              <input className="string-input" style={{margin: "10px"}} placeholder="Note title here" type="text" onChange={(e) => {
                setHead(e.target.value)}}/>
            </div>
            <div className="row">
              <h4 style={{color: "#031218", margin: "10px"}}>Description</h4>
              <textarea className="string-input" style={{margin: "10px"}} placeholder="Note description here" type="text" value={body} onChange={(e) => setBody(e.target.value)}/>
            </div>
            <div className="row" style={{justifyContent: "end"}}>
            <button style={{padding: "5px 20px", margin: "0 5px", border: "none", borderRadius: "10px", color: "white", background: "#031218"}} onClick={closeModal}>Discard</button>
            <button style={{padding: "5px 20px", margin: "0 5px", border: "none", borderRadius: "10px", color: "black", background: "#00f3ed"}} onClick={() => console.log({head})}>Save</button>
            </div>
          </div>
        </div>
        : null
      }
        </div>
      </div>
    </div>
    
  );
}
export default App;
