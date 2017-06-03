import React from 'react';
import { Button, ButtonGroup, Input } from 'reactstrap';


export default class ScrapEditor extends React.Component {

  render() {
    const { isOpen, scrap, index } = this.props.scrapEditor;
    const scrapTitle = scrap ? scrap.raw_title : '';
    return (
      <div className="scrap-editor">
        <h4>Edit Scrap</h4>
        <form ref="scrapForm" className="scrap-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="title" className="form-control-label requiredField">Title:</label>
            <input
              name="title"
              ref="title"
              type="text"
              className="form-control"
              defaultValue={scrapTitle} />
          </div>
          <div className="controls">
            <ButtonGroup>
              <input type="submit" className="btn btn-primary btn-sm" value="Update"/>
              <Button className="btn btn-sm" onClick={this.close.bind(this)}>Cancel</Button>
              <Button type="button" className="btn btn-sm btn-danger" onClick={this.deleteScrap.bind(this)}>Delete</Button>
            </ButtonGroup>
          </div>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { scrap, index } = this.props.scrapEditor;
    this.props.updateScrap({
      ...scrap,
      raw_title: this.refs.title.value,
    });
    this.refs.scrapForm.reset();
    this.close();
  }

  close() {
    const { scrap, index } = this.props.scrapEditor;
    this.props.closeScrapEditor(scrap, index);
  }

  deleteScrap() {
    const { scrap, index } = this.props.scrapEditor;
    this.props.deleteScrap(scrap);
    this.close();
  }
}
