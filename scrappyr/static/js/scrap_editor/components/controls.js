import React from 'react';


export default class ScrapControls extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="controls">
        <div className="btn-group">
          <input type="submit" className="btn btn-primary" value="Update" />
          <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="caret"></span>
            <span className="sr-only">More</span>
          </button>
          <div className='dropdown-menu'>
            <button className="dropdown-item" onClick={this.deleteScrap.bind(this)}>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  deleteScrap() {
    const { scrap } = this.props.scrapEditor;
    this.props.deleteScrap(scrap);
    this.props.closeScrapEditor();
  }
}
