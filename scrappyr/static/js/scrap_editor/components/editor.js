import React from 'react';

import RelatedScrapbooks from './related_scrapbooks';
import ScrapControls from './controls';


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
          <ScrapControls {...this.props} />
        </form>
        <RelatedScrapbooks {...this.props} />
        <button className="btn btn-sm close" onClick={this.close.bind(this)}>&times;</button>
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
}
