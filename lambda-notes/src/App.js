import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";


import NotesList from './components/notesList';
import CreateNote from './components/createNote';
import ViewNote from './components/viewNote';
import EditNote from './components/editNote';
import { testNotes } from './tests/testData';
// import LoginPage from './components/LoginPage';
import Register from './components/register';
import Login from './components/login';
import SideNav from './components/sideNav.js';
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';

import axios from 'axios';
import persist from 'react-localstorage-hoc'


import './App.css';
import './Auth.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: localStorage.notesToken, // set to true to disable auth login
      sentimentActivated: false,
      notes: [],
      newNote: {
        title: '',
        sentimentTitle: '',
        tags: '',
        content: ''
      },
      clickedNote: {
        title: '',
        sentimentTitle: '',
        tags: '',
        content: ''
      }
    }
  }

  loadNotes = async () => {
    this.axios = axios.create({
      baseURL: `${process.env.REACT_APP_API}/api/notes`,
      headers: { Authorization: `bearer ${localStorage.notesToken}` }
    });
    const response = await this.axios.get();
    this.setState({ notes: response.data });
  }

  async componentDidMount() {
    if (localStorage.notesToken) {
      await this.loadNotes();
    }
  }

  addNewNote = async newNoteData => {
    const response =  await this.axios.post('', newNoteData);
    this.setState({ notes: [...this.state.notes, response.data]});
  }

  updateEditedNote = async updatedNoteData => {
    const response =  await this.axios.put(`/${updatedNoteData._id}`, updatedNoteData);
    const updatedNotes = this.state.notes.map(note => note._id === this.state.clickedNote._id ? response.data : note); 

    this.setState({ notes: updatedNotes });
  }

  deleteNote = async () => {
    const response =  await this.axios.delete(`/${this.state.clickedNote._id}`);
    const updatedNotes = this.state.notes.filter(note => note._id !== this.state.clickedNote._id);
    this.setState({ notes: updatedNotes });
  }

  updateClickedNote = (clickedNote) => {
    this.setState({ clickedNote: clickedNote });
  }

  setIsLoggedIn = updatedUserState => {
    this.setState({ isLoggedIn: updatedUserState });
  };

  activateSentiment = boolVal => {
    this.setState({ sentimentActivated: boolVal });
  };

  toggleSwitch = (value) => {
    this.setState({ sentimentActivated: !value});
  };
  render() {
    return (
      <Router>
      <div className="App">
        { localStorage.notesToken ? 
        <SideNav notes={this.state.notes} sentimentActivated={this.state.sentimentActivated} toggleSwitch={this.toggleSwitch} /> : '' }

        <div className="main-view">
          <div className="main-view-inner">
                <Switch>
                  <PropsRoute path="/login" component={Login} loadNotes={this.loadNotes} setIsLoggedIn={this.setIsLoggedIn}/>
                  <PublicRoute path="/register" component={Register} setIsLoggedIn={this.setIsLoggedIn} redirectTo="/login" />
                  <PrivateRoute exact path="/" authed={this.state.isLoggedIn} redirectTo="/login" component={NotesList} sentimentActivated={this.state.sentimentActivated} notes={this.state.notes} updateClickedNote={this.updateClickedNote} />} />
                  <PrivateRoute path="/notes-view" authed={this.state.isLoggedIn} redirectTo="/login" component={ViewNote} clickedNote={this.state.clickedNote} deleteNote={this.deleteNote} />} />
                  <PrivateRoute path="/create-note" authed={this.state.isLoggedIn} redirectTo="/login" component={CreateNote} addNewNote={this.addNewNote} />} />
                  <PrivateRoute path="/edit-note" sentimentActivated={this.state.sentimentActivated}  authed={this.state.isLoggedIn} redirectTo="/login" component={EditNote} clickedNote={this.state.clickedNote} updateEditedNote={this.updateEditedNote} />} />
                </Switch>
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
