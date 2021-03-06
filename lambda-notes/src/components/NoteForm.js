import React, { Component } from 'react';
import { Input, Row, Col, Button, Label } from 'reactstrap';

class NoteForm extends Component {

  render() {
    const title = this.props.sentimentActivated ? this.props.sentimentTitle : this.props.title;
    return (
      <div>
        <div className="container note-form">
            <Row>
              <Col className="col-4 mb-3">
                <br /><br />
                <h3>{`${this.props.formHeading}:`}</h3><br />
                <Label>Title</Label>
                <Input onChange={this.props.handleInputChange} type="text" name="title" value={title} placeholder="Note Title" />
              </Col>
            </Row>
            <Row>
              <Col className="col-4 mb-3">
                <Label>Tags</Label>
                <Input onChange={this.props.handleInputChange} type="text" name="tags" value={this.props.tags} placeholder="Note Tags" />
              </Col>
            </Row>
            <Row>
              <Col className="col-10 mb-3">
                <Label>Content</Label>
                <Input onChange={this.props.handleInputChange} type="textarea" name="content" value={this.props.content} placeholder="Note Content"/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={this.props.handleSubmit} className="btn-info">Save</Button>
              </Col>
            </Row>
        </div>
      </div>
    );
  }
}

export default NoteForm;
