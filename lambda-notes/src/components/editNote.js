import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import { Form, Input, Row, Col, Button } from 'reactstrap';

class UpdateNote extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      content: ''
    }
  }

  componentDidMount() {
    this.setState({ title: this.props.clickedNote.title, content: this.props.clickedNote.content });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value}); 
  }

  handleSubmit = () => {
    this.props.updateEditedNote(this.state);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <br /><br />
        <h3>Edit Note:</h3><br />
        <div className="create-note">
          <Form>
            <Row>
              <Col className="col-8 mb-3">
                <Input onChange={this.handleInputChange} type="text" name="title" value={this.state.title} placeholder="Note Title" />
              </Col>
            </Row>
            <Row>
              <Col className="col mb-3">
                <Input onChange={this.handleInputChange} type="textarea" name="content" value={this.state.content} placeholder="Note Content" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={this.handleSubmit} className="btn-info">Save</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }

}

export default withRouter(UpdateNote);