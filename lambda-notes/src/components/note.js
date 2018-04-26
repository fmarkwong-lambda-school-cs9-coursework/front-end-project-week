import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { withRouter } from "react-router-dom";

class Note extends Component {

  handleClickNote = () => {
    this.props.updateClickedNote({ id: this.props.id, title: this.props.title, content: this.props.content });
    this.props.history.push('/notes-view');
  }

  render() {
    return (
      // <div className="note-container">
        <Card onClick={this.handleClickNote}>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            <hr />
            <CardText>{this.props.content}</CardText>
          </CardBody>
        </Card>
      // </div>
    );
  }

}
export default withRouter(Note);
