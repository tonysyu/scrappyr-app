import React from 'react';
import { ButtonDropdown, ButtonGroup } from 'reactstrap';
import { DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';


export default class ScrapControls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moreActionsDropdownOpen: false,
    };
  }

  render() {
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
              <DropdownItem onClick={this.addToScrapBook.bind(this)}>
                Add to scrapbook...
              </DropdownItem>
              <DropdownItem onClick={this.deleteScrap.bind(this)}>Delete</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    );
  }

  toggleMoreActionsDropdown() {
    this.setState({
      moreActionsDropdownOpen: !this.state.moreActionsDropdownOpen,
    });
  }

  deleteScrap() {
    const { scrap } = this.props.scrapEditor;
    this.props.deleteScrap(scrap);
    this.props.closeScrapEditor();
  }

  addToScrapBook() {
    const { scrap } = this.props.scrapEditor;
    // FIXME: The scrapbook id should NOT be hardcoded!!!
    const scrapbook_id = 1;
    this.props.addToScrapBook(scrap, scrapbook_id);
  }
}
