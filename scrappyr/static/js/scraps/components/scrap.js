import React from 'react';


class Scrap extends React.Component {
  render() {
    const { scrap, index } = this.props;
    return (
      <div className="scrap card col-12 col-sm-6 col-md-4">
        <div className="scrap-block card-block">
          <h4 className="card-title" dangerouslySetInnerHTML={ {__html: scrap.html_title} }>
          </h4>
          <button className="edit btn btn-sm btn-secondary"
            onClick={this.props.openScrapEditor.bind(this, scrap, index)}>
            <span className="fa fa-pencil-square-o" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    );
  }
}

export default Scrap;
