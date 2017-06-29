import React from 'react';
import { Button, ButtonDropdown, ButtonGroup } from 'reactstrap';
import { DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';


export default class ScrapEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moreActionsDropdownOpen: false,
    };
  }

  render() {
    const { scrap } = this.props.scrapEditor;
    const scrapTitle = scrap ? scrap.raw_title : '';
    return (
      <div id="scrap-editor">
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
          {this.renderControls()}
        </form>
        <Button className="btn btn-sm close" onClick={this.close.bind(this)}>&times;</Button>
      </div>
    );
  }

  renderControls() {
    return (
      <div className="controls">
        <ButtonGroup>
          <input type="submit" className="btn btn-primary" value="Update"/>
          <ButtonDropdown
            isOpen={this.state.moreActionsDropdownOpen}
            toggle={this.toggleMoreActionsDropdown.bind(this)}>
            <DropdownToggle caret>
              More
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.addToScrapBook.bind(this)}>Add to scrapbook...</DropdownItem>
              <DropdownItem onClick={this.deleteScrap.bind(this)}>Delete</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { scrap } = this.props.scrapEditor;
    this.props.updateScrap({
      ...scrap,
      raw_title: this.refs.title.value,
    });
    this.refs.scrapForm.reset();
    this.close();
  }

  close() {
    this.props.closeScrapEditor();
  }

  toggleMoreActionsDropdown() {
    this.setState({
      moreActionsDropdownOpen: !this.state.moreActionsDropdownOpen,
    });
  }

  deleteScrap() {
    const { scrap } = this.props.scrapEditor;
    this.props.deleteScrap(scrap);
    this.close();
  }

  addToScrapBook() {
    const { scrap } = this.props.scrapEditor;
    // FIXME: The scrapbook id should NOT be hardcoded!!!
    const scrapbook_id = 1;
    this.props.addToScrapBook(scrap, scrapbook_id);
  }
}
