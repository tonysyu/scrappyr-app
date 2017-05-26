import React from 'react';


class Scrap extends React.Component {
  render() {
    const { scrap, index } = this.props;
    return (
      <div className="scrap">
        <span className="scrap-title"
          dangerouslySetInnerHTML={ {__html: scrap.html_title} }>
        </span>
        <button className="edit btn btn-sm btn-secondary"
                onClick={this.props.openScrapEditor.bind(this, scrap, index)}>
          Edit
        </button>
      </div>
      );
        }
  }

  export default Scrap;
