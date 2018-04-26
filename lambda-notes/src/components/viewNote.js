import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";

import { Row, Col } from 'reactstrap';

class ViewNote extends Component {

  handleDelete = () => {
    this.props.deleteNote();
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="col-3 ml-auto">
            <Link to="/edit-note" className="m-3">edit</Link>
            {/* this anchor cannot have href or else after delete, page will refresh and deleted card will reappear */}
            <a onClick={this.handleDelete}>delete</a>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h3>{this.props.clickedNote.title}</h3><br />
            <p>{this.props.clickedNote.content}</p>
          </Col>
        </Row>
      </div>
    );
  }

}

export default withRouter(ViewNote);
