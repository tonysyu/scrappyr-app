import React from 'react';
import {
  ButtonDropdown, ButtonGroup,
  DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';


export default class ScrapControls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moreActionsDropdownOpen: true,
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
    this.setState({
      moreActionsDropdownOpen: !this.state.moreActionsDropdownOpen,
    });
  }

  deleteScrap() {
    const { scrap } = this.props.scrapEditor;
    this.props.deleteScrap(scrap);
    this.props.closeScrapEditor();
  }
}
