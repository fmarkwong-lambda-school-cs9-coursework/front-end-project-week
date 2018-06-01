import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";

import { Button } from 'reactstrap';

import NotesList from './components/notesList';
import CreateNote from './components/createNote';
import ViewNote from './components/viewNote';
import EditNote from './components/editNote';
import { testNotes } from './tests/testData';
// import LoginPage from './components/LoginPage';
import Register from './components/register';
import Login from './components/login';
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import {CSVLink, CSVDownload} from 'react-csv';

import axios from 'axios';
import persist from 'react-localstorage-hoc'

import './App.css';
import './Auth.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: localStorage.token, // set to true to disable auth login
      notes: [],
      newNote: {
        title: '',
        tags: '',
        content: ''
      },
      clickedNote: {
        title: '',
        tags: '',
        content: ''
      }
    }
  }

  // componentDidMount() {
  //   axios.get(`${process.env.REACT_APP_API}/api/notes`)
  //     .then(response => {
  //       this.setState({ notes: response.data });
  //     })
  //     .catch(err => console.log(err));
  // }

  componentDidMount() {
    const requestOptions = {
      headers: {
        Authorization: localStorage.token,
      },
    };

    axios.get(`${process.env.REACT_APP_API}/api/notes`, requestOptions)
      .then(response => {
        this.setState({ notes: response.data });
      })
      .catch(err => console.log(err));
  }

  addNewNote = async newNoteData => {
    const response =  await axios.post(`${process.env.REACT_APP_API}/api/notes`, newNoteData)
    this.setState({ notes: [...this.state.notes, response.data]});
  }

  updateEditedNote = async updatedNoteData => {
    const response =  await axios.put(`${process.env.REACT_APP_API}/api/notes/${updatedNoteData._id}`, updatedNoteData);
    const updatedNotes = this.state.notes.map(note => note._id === this.state.clickedNote._id ? response.data : note); 

    this.setState({ notes: updatedNotes });
  }

  deleteNote = async () => {
    const response =  await axios.delete(`${process.env.REACT_APP_API}/api/notes/${this.state.clickedNote._id}`);
    const updatedNotes = this.state.notes.filter(note => note._id !== this.state.clickedNote._id);
    this.setState({ notes: updatedNotes });
  }

  updateClickedNote = (clickedNote) => {
    this.setState({ clickedNote: clickedNote });
  }

  setIsLoggedIn = updatedUserState => {
    this.setState({ isLoggedIn: updatedUserState });
  };

  render() {
    return (
      <Router>
      <div className="App">
        <div className="side-nav">
          <br />
          <h2>Backend Lambda<br />Notes</h2><br />
          <Link to="/"><Button className="btn-custom btn-block">View Your Notes</Button></Link>
          <br />
          <Link to="create-note"><Button className="btn-custom btn-block">+ Create New Note</Button></Link>
          <br />
          <Button className="btn-custom btn-block"><CSVLink className="csv" data={this.state.notes} >Export Data</CSVLink></Button>
        </div>
        <div className="main-view">
          <div className="main-view-inner">
                <Switch>
                  <PropsRoute path="/login" component={Login} setIsLoggedIn={this.setIsLoggedIn}/>
                  <PublicRoute path="/register" component={Register} setIsLoggedIn={this.setIsLoggedIn} redirectTo="/login" />
                  <PrivateRoute exact path="/" authed={this.state.isLoggedIn} redirectTo="/login" component={NotesList} notes={this.state.notes} updateClickedNote={this.updateClickedNote} />} />
                  <PrivateRoute path="/notes-view" authed={this.state.isLoggedIn} redirectTo="/login" component={ViewNote} clickedNote={this.state.clickedNote} deleteNote={this.deleteNote} />} />
                  <PrivateRoute path="/create-note" authed={this.state.isLoggedIn} redirectTo="/login" component={CreateNote} addNewNote={this.addNewNote} />} />
                  <PrivateRoute path="/edit-note"  authed={this.state.isLoggedIn} redirectTo="/login" component={EditNote} clickedNote={this.state.clickedNote} updateEditedNote={this.updateEditedNote} />} />
                </Switch>
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
