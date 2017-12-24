import React from 'react';
import {
  ButtonDropdown, ButtonGroup,
  DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';


export default class ScrapControls extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="controls">
        <ButtonGroup>
          <input type="submit" className="btn btn-primary" value="Update"/>
          <ButtonDropdown
              toggle={this.toggleMoreActionsDropdown.bind(this)}>
            <DropdownToggle caret>
              <span className="sr-only">More</span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.deleteScrap.bind(this)}>Delete</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    );
  }

  toggleMoreActionsDropdown() {
  }

  deleteScrap() {
    const { scrap } = this.props.scrapEditor;
    this.props.deleteScrap(scrap);
    this.props.closeScrapEditor();
  }
}
