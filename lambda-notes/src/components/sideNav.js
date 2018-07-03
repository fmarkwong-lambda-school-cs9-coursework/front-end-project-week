import React from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { CSVLink } from 'react-csv';
import ToggleButton from 'react-toggle-button'

export default (props) => {
  return (
    <div className="side-nav">
      <br />
      <h2>Sentimental Notes</h2><br />
      <Link to="/"><Button className="btn-custom btn-block">View Your Notes</Button></Link>
      <br />
      <Link to="create-note"><Button className="btn-custom btn-block">+ Create New Note</Button></Link>
      <br />
      <Button className="btn-custom btn-block"><CSVLink className="csv" data={props.notes} >Export Data</CSVLink></Button>
      <br />
      <span className="text float-left">Sentiment Analysis: </span>
      <ToggleButton onToggle={props.toggleSwitch} value={props.sentimentActivated || false}/>
    </div>
  );
}
