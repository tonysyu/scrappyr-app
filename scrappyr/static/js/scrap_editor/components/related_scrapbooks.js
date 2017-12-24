import React from 'react';


export default class RelatedScrapbooks extends React.Component {

  render() {
    return (
      <div className="related-scrapbooks card">
        <form ref="scrapbookForm" className="scrapbook-form"
          onSubmit={this.addToScrapBook.bind(this)}>
          <div className="form-group">
            <input type="number" className="form-control" ref="scrapbookId" name="scrapbookId"/>
          </div>
          <button type="submit" className="btn btn-sm btn-primary">
            Add to scrapbook
          </button>
        </form>
      </div>
    );
  }

  addToScrapBook(e) {
    e.preventDefault();
    const { scrap } = this.props.scrapEditor;
    const scrapbook_id = this.refs.scrapbookId.value;
    this.props.addToScrapBook(scrap, scrapbook_id);
    this.refs.scrapbookForm.reset();
  }
}
